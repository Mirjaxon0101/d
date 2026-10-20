import crypto from 'crypto';

const GLOBAL_DB_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a158f3f0d42bf1';

const hashPassword = (pwd) => {
  if (!pwd) return '';
  if (/^[a-f0-9]{64}$/i.test(pwd)) return pwd;
  return crypto.createHash('sha256').update(pwd).digest('hex');
};

const DEFAULT_USERS = [
  {
    id: 'u_admin',
    name: 'Admin',
    org: 'BlueContest HQ',
    rating: 2850,
    solved: 215,
    title: 'Hacker Programmer',
    titleColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    avatar: '🤖',
    passwordHash: hashPassword('qwertyuiop'),
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
    titleColor: 'text-red-500 bg-red-500/10 border-red-500/20',
    avatar: '👨‍💻',
    passwordHash: hashPassword('password123'),
    isBlocked: false,
    solvedProblemIds: []
  }
];

const fetchRemoteUsers = async () => {
  try {
    const res = await fetch(GLOBAL_DB_URL);
    if (res.ok) {
      const data = await res.json();
      if (data && data.data && Array.isArray(data.data.users)) {
        return data.data.users;
      }
    }
  } catch (e) {}
  return DEFAULT_USERS;
};

const updateRemoteUsers = async (users) => {
  try {
    await fetch(GLOBAL_DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'bluecontest_database',
        data: { users }
      })
    });
  } catch (e) {}
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, username, name, password, email, org, avatar } = req.body || {};
  let users = await fetchRemoteUsers();

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
    await updateRemoteUsers(users);
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

  return res.status(400).json({ error: 'Noto\'g\'ri harakat!' });
}
