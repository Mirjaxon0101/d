const GLOBAL_DB_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a158f3f0d42bf1';

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
  return [];
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

const calculateTitle = (solvedCount) => {
  if (solvedCount >= 200) return { title: 'Hacker Programmer', titleColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
  if (solvedCount >= 140) return { title: 'Grandmaster', titleColor: 'text-red-500 bg-red-500/10 border-red-500/20' };
  if (solvedCount >= 80) return { title: 'High Master', titleColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' };
  if (solvedCount >= 40) return { title: 'Master', titleColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20' };
  if (solvedCount >= 10) return { title: 'Specialist', titleColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' };
  if (solvedCount >= 1) return { title: 'Pupil', titleColor: 'text-slate-400 bg-slate-400/10 border-slate-400/20' };
  return { title: 'Newbie', titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20' };
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let users = await fetchRemoteUsers();

  if (req.method === 'GET') {
    return res.json(users);
  }

  if (req.method === 'POST') {
    const { userId, points, problemId } = req.body || {};
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
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
        await updateRemoteUsers(users);
      }
      return res.json({ success: true, user: users[index] });
    }
  }

  if (req.method === 'PUT') {
    const updatedUser = req.body || {};
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      await updateRemoteUsers(users);
      return res.json({ success: true, user: users[index] });
    }
  }

  return res.json(users);
}
