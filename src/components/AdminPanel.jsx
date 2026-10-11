import React, { useState } from 'react'
import {
  ShieldAlert,
  Lock,
  User,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Trophy,
  Code2,
  Users,
  Key,
  BarChart,
  LogOut,
  Save
} from 'lucide-react'

export function AdminPanel({
  language = 'uz',
  problems,
  setProblems,
  contests,
  setContests
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState('problems') // 'problems' | 'contests' | 'stats'

  // New Problem Form state
  const [newProbTitle, setNewProbTitle] = useState('')
  const [newProbDiff, setNewProbDiff] = useState('Oson')
  const [newProbTags, setNewProbTags] = useState('Math, Boshlangʻich')
  const [newProbDesc, setNewProbDesc] = useState('')
  const [newProbInput, setNewProbInput] = useState('')
  const [newProbOutput, setNewProbOutput] = useState('')
  const [probSuccess, setProbSuccess] = useState('')

  // New Contest Form state
  const [newContestTitle, setNewContestTitle] = useState('')
  const [newContestType, setNewContestType] = useState('Rated')
  const [newContestStart, setNewContestStart] = useState('Bugun 20:00')
  const [newContestDesc, setNewContestDesc] = useState('')
  const [contestSuccess, setContestSuccess] = useState('')

  const handleAdminLogin = (e) => {
    e.preventDefault()
    if (username === 'Admin' && password === 'qwertyuiop') {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError("Noto'g'ri foydalanuvchi nomi yoki parol!")
    }
  }

  const handleAddProblem = (e) => {
    e.preventDefault()
    if (!newProbTitle.trim()) return

    const diffColors = {
      'Oson': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      'Oʻrta': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      'Qiyin': 'text-red-500 bg-red-500/10 border-red-500/20',
      "O'ta Qiyin": 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }

    const createdProb = {
      id: problems.length + 1,
      title: newProbTitle,
      difficulty: newProbDiff,
      difficultyColor: diffColors[newProbDiff] || diffColors['Oson'],
      points: newProbDiff === 'Oson' ? 5 : newProbDiff === 'Oʻrta' ? 15 : newProbDiff === 'Qiyin' ? 30 : 50,
      solvedCount: 0,
      acceptance: '100%',
      tags: newProbTags.split(',').map(t => t.trim()),
      timeLimit: '1000 ms',
      memoryLimit: '64 MB',
      author: 'Admin',
      description: newProbDesc || `${newProbTitle} masalasi sharti`,
      sampleInput: newProbInput || '5 10',
      sampleOutput: newProbOutput || '15',
      templateCode: { cpp: '', python: '', javascript: '' }
    }

    setProblems([createdProb, ...problems])
    setProbSuccess("Yangi masala muvaffaqiyatli qo'shildi!")
    setNewProbTitle('')
    setNewProbDesc('')
    setNewProbInput('')
    setNewProbOutput('')
    setTimeout(() => setProbSuccess(''), 3000)
  }

  const handleDeleteProblem = (id) => {
    if (window.confirm(`Siz rostdan ham #${id} masalani o'chirmoqchimisiz?`)) {
      setProblems(problems.filter(p => p.id !== id))
    }
  }

  const handleAddContest = (e) => {
    e.preventDefault()
    if (!newContestTitle.trim()) return

    const createdContest = {
      id: `c${Date.now()}`,
      title: newContestTitle,
      type: newContestType,
      status: 'Upcoming',
      startTime: newContestStart,
      duration: '02:30:00',
      participantsCount: 0,
      description: newContestDesc || 'Yangi musobaqa',
      organizer: 'BlueContest Admin',
      rules: 'ICPC qoidalari'
    }

    setContests([createdContest, ...contests])
    setContestSuccess("Yangi musobaqa e'lon qilindi!")
    setNewContestTitle('')
    setNewContestDesc('')
    setTimeout(() => setContestSuccess(''), 3000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-10">
        <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Key className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Admin Panelga Kirish</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Platformani boshqarish uchun admin rekvizitlarini kiriting.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Admin Username</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Kirish (Login)</span>
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-6">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl text-white border border-indigo-500/30 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Boshqaruv Paneli (Admin)</h1>
            <p className="text-xs text-slate-300">
              Platformaga masalalar va musobaqalar qo'shish hamda kontentni boshqarish.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 font-bold text-xs flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Chiqish</span>
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setAdminTab('problems')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            adminTab === 'problems'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Masalalar Boshqaruvi ({problems.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('contests')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            adminTab === 'contests'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Musobaqalar Boshqaruvi ({contests.length})</span>
        </button>
      </div>

      {/* Admin Tab Content */}
      {adminTab === 'problems' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Create Problem Form (5 Cols) */}
          <form onSubmit={handleAddProblem} className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <span>Yangi Masala Qo'shish</span>
            </h3>

            {probSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 font-bold text-xs">
                {probSuccess}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Masala Nomi</label>
              <input
                type="text"
                required
                placeholder="Masalan: Eng Katta Kichik Yig'indi"
                value={newProbTitle}
                onChange={(e) => setNewProbTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Qiyinchilik</label>
                <select
                  value={newProbDiff}
                  onChange={(e) => setNewProbDiff(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                >
                  <option value="Oson">Oson</option>
                  <option value="Oʻrta">Oʻrta</option>
                  <option value="Qiyin">Qiyin</option>
                  <option value="O'ta Qiyin">O'ta Qiyin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Teglar (Vergul bilan)</label>
                <input
                  type="text"
                  value={newProbTags}
                  onChange={(e) => setNewProbTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Masala Sharti (Description)</label>
              <textarea
                rows={4}
                placeholder="Masala batafsil sharti va kiruvchi/chiquvchi ma'lumotlar..."
                value={newProbDesc}
                onChange={(e) => setNewProbDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs border border-transparent focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Namuna Kiruvchi (Input)</label>
                <textarea
                  rows={2}
                  placeholder="5 10"
                  value={newProbInput}
                  onChange={(e) => setNewProbInput(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-mono border border-transparent focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Namuna Chiquvchi (Output)</label>
                <textarea
                  rows={2}
                  placeholder="15"
                  value={newProbOutput}
                  onChange={(e) => setNewProbOutput(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-mono border border-transparent focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Masalani Saqlash</span>
            </button>
          </form>

          {/* Existing Problems List (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-h-[750px] flex flex-col">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Mavjud Masalalar Ro'yxati
            </h3>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60 pr-1">
              {problems.slice(0, 30).map((prob) => (
                <div key={prob.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-400">#{prob.id}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{prob.title}</span>
                    </div>
                    <span className={`inline-block px-2 py-0.2 rounded text-[10px] font-bold ${prob.difficultyColor}`}>
                      {prob.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteProblem(prob.id)}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Contests Admin Tab */}
      {adminTab === 'contests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handleAddContest} className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Yangi Musobaqa E'lon Qilish</span>
            </h3>

            {contestSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 font-bold text-xs">
                {contestSuccess}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Musobaqa Nomi</label>
              <input
                type="text"
                required
                placeholder="BlueContest Round #99"
                value={newContestTitle}
                onChange={(e) => setNewContestTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Turi</label>
                <select
                  value={newContestType}
                  onChange={(e) => setNewContestType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                >
                  <option value="Rated">Rated (Reytingli)</option>
                  <option value="Official">Official (Rasmiy)</option>
                  <option value="Open">Open (Ochiq)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Boshlanish Vaqti</label>
                <input
                  type="text"
                  value={newContestStart}
                  onChange={(e) => setNewContestStart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tavsif</label>
              <textarea
                rows={3}
                placeholder="Musobaqa haqida batafsil ma'lumot..."
                value={newContestDesc}
                onChange={(e) => setNewContestDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs border border-transparent focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>E'lon Qilish</span>
            </button>
          </form>

          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Mavjud Musobaqalar</h3>
            <div className="space-y-3">
              {contests.map((c) => (
                <div key={c.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{c.title}</span>
                    <span className="block text-slate-400 mt-0.5">{c.startTime} • {c.type}</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold text-[10px]">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
