import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Password SHA-256 hashing helper
const hashPassword = (pwd) => {
  if (!pwd) return '';
  // If password is already a 64-character SHA-256 hex string, return as-is
  if (/^[a-f0-9]{64}$/i.test(pwd)) return pwd;
  return crypto.createHash('sha256').update(pwd).digest('hex');
};

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initial default users if database file doesn't exist
const DEFAULT_USERS = [
  {
    id: 'u_admin',
    name: 'Admin',
    org: 'BlueContest HQ',
    rating: 2850,
    solved: 215,
    title: 'Hacker Programmer',
    titleColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    avatar: '🤖',
    password: 'Mashal888mpoi123',
    isBlocked: false,
    solvedProblemIds: []
  },
  {
    id: 'u_1',
    name: 'Asadbek_Olimov',
    org: 'TATU Samarkand',
    rating: 2420,
    solved: 168,
    title: 'Grandmaster',
    titleColor: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    avatar: '👨‍💻',
    password: 'password123',
    isBlocked: false,
    solvedProblemIds: []
  },
  {
    id: 'u_2',
    name: 'Sardor_Dev',
    org: 'SamDU Inno',
    rating: 2110,
    solved: 112,
    title: 'Master',
    titleColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    avatar: '🚀',
    password: 'password123',
    isBlocked: false,
    solvedProblemIds: []
  },
  {
    id: 'u_3',
    name: 'Nodira_Code',
    org: 'TUIT Tashkent',
    rating: 1840,
    solved: 65,
    title: 'Specialist',
    titleColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    avatar: '👩‍💻',
    password: 'password123',
    isBlocked: false,
    solvedProblemIds: []
  }
];

// Helper to read database
const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ users: DEFAULT_USERS }, null, 2));
      return { users: DEFAULT_USERS };
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return { users: DEFAULT_USERS };
  }
};

// Helper to write database
const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database file:', err);
  }
};

// Title update helper
const calculateTitle = (solvedCount) => {
  if (solvedCount >= 200) return { title: 'Hacker Programmer', titleColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
  if (solvedCount >= 140) return { title: 'Grandmaster', titleColor: 'text-red-500 bg-red-500/10 border-red-500/20' };
  if (solvedCount >= 80) return { title: 'High Master', titleColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' };
  if (solvedCount >= 40) return { title: 'Master', titleColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20' };
  if (solvedCount >= 10) return { title: 'Specialist', titleColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' };
  if (solvedCount >= 1) return { title: 'Pupil', titleColor: 'text-slate-400 bg-slate-400/10 border-slate-400/20' };
  return { title: 'Newbie', titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20' };
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date() });
});

// Get all registered users (for Rankings and global sync)
app.get('/api/users', (req, res) => {
  const db = readDB();
  res.json(db.users || []);
});

// Register or Login User
app.post('/api/auth', (req, res) => {
  const { action, username, name, email, password, org, avatar } = req.body;
  const db = readDB();
  let users = db.users || [];

  const targetName = (username || name || '').trim();

  if (action === 'register') {
    if (!targetName || !password) {
      return res.status(400).json({ error: 'Username va parol kiritilishi shart!' });
    }

    const existing = users.find(u => u.name.toLowerCase() === targetName.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'Ushbu username allaqachon ro\'yxatdan o\'tgan!' });
    }

    const newUser = {
      id: 'u_' + Date.now(),
      name: targetName,
      org: org || 'Mustaqil O\'rganuvchi',
      rating: 1200,
      solved: 0,
      title: 'Newbie',
      titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
      avatar: avatar || '👨‍💻',
      passwordHash: hashPassword(password),
      isBlocked: false,
      solvedProblemIds: []
    };

    users.push(newUser);
    writeDB({ ...db, users });
    return res.json({ success: true, user: newUser });
  }

  if (action === 'login') {
    const targetHash = hashPassword(password);
    const user = users.find(
      u => u.name.toLowerCase() === targetName.toLowerCase() &&
           (u.passwordHash ? u.passwordHash === targetHash : u.password === password)
    );
    if (!user) {
      return res.status(401).json({ error: 'Username yoki parol noto\'g\'ri!' });
    }
    if (user.isBlocked) {
      return res.status(403).json({ error: 'Akkountingiz admin tomonidan bloklangan!' });
    }
    return res.json({ success: true, user });
  }

  res.status(400).json({ error: 'Noto\'g\'ri harakat!' });
});

// Update user settings / profile
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const db = readDB();
  let users = db.users || [];

  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: 'Foydalanuvchi topilmadi!' });
  }

  users[index] = {
    ...users[index],
    ...req.body
  };

  writeDB({ ...db, users });
  res.json({ success: true, user: users[index] });
});

// Add solved problem score
app.post('/api/users/:id/solve', (req, res) => {
  const userId = req.params.id;
  const { points, problemId } = req.body;
  const db = readDB();
  let users = db.users || [];

  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ error: 'Foydalanuvchi topilmadi!' });
  }

  const user = users[index];
  const solvedSet = new Set(user.solvedProblemIds || []);

  if (!solvedSet.has(problemId)) {
    solvedSet.add(problemId);
    user.solvedProblemIds = Array.from(solvedSet);
    user.solved = (user.solved || 0) + 1;
    user.rating = (user.rating || 1200) + (points || 15);

    const titleInfo = calculateTitle(user.solved);
    user.title = titleInfo.title;
    user.titleColor = titleInfo.titleColor;

    users[index] = user;
    writeDB({ ...db, users });
  }

  res.json({ success: true, user });
});

app.listen(PORT, () => {
  console.log(`BlueContest Central DB API server running on port ${PORT}`);
});
