import fs from 'fs';
import path from 'path';

const DB_FILE = '/tmp/database.json';

const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return { users: [] };
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {}
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = readDB();

  if (req.method === 'GET') {
    return res.json(db.users || []);
  }

  if (req.method === 'POST') {
    const { userId, points, problemId } = req.body || {};
    let users = db.users || [];
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
      const user = users[index];
      const solvedSet = new Set(user.solvedProblemIds || []);

      if (!solvedSet.has(problemId)) {
        solvedSet.add(problemId);
        user.solvedProblemIds = Array.from(solvedSet);
        user.solved = (user.solved || 0) + 1;
        user.rating = (user.rating || 1200) + (points || 15);
        users[index] = user;
        writeDB({ ...db, users });
      }
      return res.json({ success: true, user: users[index] });
    }
  }

  return res.json(db.users || []);
}
