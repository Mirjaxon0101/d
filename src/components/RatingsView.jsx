import React, { useState } from 'react'
import {
  BarChart2,
  Trophy,
  Search,
  Award,
  Medal,
  User,
  Building,
  CheckCircle2,
  X,
  ExternalLink,
  Flame,
  Globe,
  Code
} from 'lucide-react'

export function RatingsView({ language = 'uz', users = [], setUsers }) {
  const [searchCoder, setSearchCoder] = useState('')
  const [selectedUserModal, setSelectedUserModal] = useState(null)

  // Sort non-blocked active users dynamically by rating descending
  const activeUsers = users.filter(u => !u.isBlocked)
  const sortedUsers = [...activeUsers].sort((a, b) => b.rating - a.rating).map((u, index) => ({
    ...u,
    rank: index + 1
  }))

  const filteredCoders = sortedUsers.filter(c =>
    c.name.toLowerCase().includes(searchCoder.toLowerCase()) ||
    c.org.toLowerCase().includes(searchCoder.toLowerCase())
  )

  return (
    <div className="space-y-6 py-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <BarChart2 className="w-7 h-7 text-blue-600 dark:text-blue-400 stroke-[2.5]" />
            <span>Dasturchilar Reytingi (Rankings)</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Musobaqalardagi muvaffaqiyatli yechimlar va olingan ballar asosida shakllantirilgan umumiy reyting.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Dasturchi nomi yoki O'quv dargohi..."
            value={searchCoder}
            onChange={(e) => setSearchCoder(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-sm rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedUsers.slice(0, 3).map((coder) => (
          <div
            key={coder.rank}
            onClick={() => setSelectedUserModal(coder)}
            className={`p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center space-y-3 cursor-pointer transition-all hover:scale-105 ${
              coder.rank === 1
                ? 'bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-800 border-amber-300 dark:border-amber-700/50'
                : coder.rank === 2
                ? 'bg-gradient-to-b from-slate-100 to-white dark:from-slate-800/80 dark:to-slate-800 border-slate-300 dark:border-slate-700'
                : 'bg-gradient-to-b from-orange-50 to-white dark:from-orange-950/20 dark:to-slate-800 border-orange-300 dark:border-amber-900/50'
            }`}
          >
            <div className="relative">
              <span className="text-4xl">{coder.avatar}</span>
              <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white ${
                coder.rank === 1 ? 'bg-amber-500' : coder.rank === 2 ? 'bg-slate-400' : 'bg-amber-700'
              }`}>
                #{coder.rank}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base hover:text-blue-600 transition-colors">
                {coder.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{coder.org}</p>
            </div>

            <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase border ${coder.titleColor}`}>
              {coder.title}
            </span>

            <div className="pt-2 flex items-center space-x-4 text-xs font-mono">
              <span>Rating: <strong className="text-slate-900 dark:text-white">{coder.rating}</strong></span>
              <span>Yechgan: <strong className="text-emerald-600">{coder.solved}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4 text-center w-16">O'rin</th>
                <th className="py-3.5 px-6">Dasturchi (Username)</th>
                <th className="py-3.5 px-4">Unvon (Title)</th>
                <th className="py-3.5 px-6">Tashkilot / O'quv maskani</th>
                <th className="py-3.5 px-4">Yechilgan</th>
                <th className="py-3.5 px-6 text-right">Reyting Balli</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredCoders.length > 0 ? (
                filteredCoders.map((coder) => (
                  <tr
                    key={coder.id || coder.rank}
                    onClick={() => setSelectedUserModal(coder)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-500">
                      #{coder.rank}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{coder.avatar || '💻'}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {coder.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold border ${coder.titleColor || 'text-blue-500 bg-blue-500/10 border-blue-500/20'}`}>
                        {coder.title || 'Coder'}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-xs font-medium">
                      {coder.org || "Mustaqil O'rganuvchi"}
                    </td>

                    <td className="py-4 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      {coder.solved || 0}
                    </td>

                    <td className="py-4 px-6 text-right font-mono font-extrabold text-slate-900 dark:text-white text-base">
                      {coder.rating}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    {searchCoder ? (
                      <div className="space-y-2">
                        <p className="font-bold">"{searchCoder}" bo'yicha hech qanday dasturchi topilmadi.</p>
                        <button
                          onClick={() => setSearchCoder('')}
                          className="text-xs text-blue-500 hover:underline font-semibold"
                        >
                          Qidiruvni tozalash
                        </button>
                      </div>
                    ) : (
                      <p>Hozircha reyting jadvalida foydalanuvchilar mavjud emas. Birinchi bo'lib ro'yxatdan o'ting!</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Overview Modal */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">

            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{selectedUserModal.avatar}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedUserModal.name}
                  </h2>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase border ${selectedUserModal.titleColor}`}>
                    {selectedUserModal.title}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedUserModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block">Joriy Reyting:</span>
                <span className="text-xl font-mono font-bold text-slate-900 dark:text-white">{selectedUserModal.rating}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Yechgan Masalalari:</span>
                <span className="text-xl font-mono font-bold text-emerald-500">{selectedUserModal.solved} ta</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                <span>O'quv maskani: <strong>{selectedUserModal.org}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Mamlakat: <strong>O'zbekiston 🇺🇿</strong></span>
              </div>
            </div>

            {/* Submission Activity Simulation Graph */}
            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktivlik Xaritasi (Contribution Heatmap)</span>
              <div className="grid grid-cols-12 gap-1 p-3 bg-slate-100 dark:bg-slate-950 rounded-xl">
                {Array.from({ length: 36 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-4 rounded ${
                      idx % 5 === 0 ? 'bg-emerald-500' : idx % 3 === 0 ? 'bg-emerald-700' : idx % 2 === 0 ? 'bg-emerald-900/60' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
