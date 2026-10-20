import React, { useState, useEffect } from 'react'
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Flame,
  Award,
  ChevronRight,
  UserPlus,
  Zap,
  Info
} from 'lucide-react'

export function ContestsView({ language = 'uz', activeContestModal, onCloseModal, currentUser, onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('upcoming') // 'upcoming' | 'running' | 'past'
  const [selectedContest, setSelectedContest] = useState(activeContestModal || null)
  const [isRegistered, setIsRegistered] = useState(false)

  React.useEffect(() => {
    if (activeContestModal) {
      setSelectedContest(activeContestModal)
    }
  }, [activeContestModal])

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 42, minutes: 18, seconds: 45 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const contestsList = [
    {
      id: 'c101',
      title: 'BlueContest Round #98 (Div 2 + Div 1)',
      type: 'Rated',
      status: 'Upcoming',
      startTime: '2025-03-20 19:30',
      duration: '02:30:00',
      participantsCount: 1420,
      description: 'Sport dasturlashi bo\'yicha navbatdagi reytingli musobaqa. Barcha ishtirokchilar reytingini o\'zgartirish huquqiga ega.',
      organizer: 'BlueContest Team',
      rules: 'ICPC qoidalari: har bir xato urinish uchun 20 daqiqa jarima vaqti qo\'shiladi.'
    },
    {
      id: 'c102',
      title: 'Respublika Saralash Musobaqasi IOI 2025 - 2-Bosqich',
      type: 'Official',
      status: 'Upcoming',
      startTime: '2025-03-28 10:00',
      duration: '05:00:00',
      participantsCount: 380,
      description: 'Xalqaro Informatika Olimpiadasiga saralash bosqichining rasmiy musobaqasi.',
      organizer: 'Raqamli Texnologiyalar Vazirligi',
      rules: 'IOI qoidalari: subtask ballari bilan baholanadi.'
    },
    {
      id: 'c100',
      title: 'Spring Coding Challenge 2025',
      type: 'Open',
      status: 'Running',
      startTime: 'Bugun 14:00',
      duration: '03:00:00',
      participantsCount: 2150,
      description: 'Bahoriy haftalik ochiq musobaqa. Qiziqarli 6 ta algoritmik masala.',
      organizer: 'TUIT CP Club',
      rules: 'AtCoder / Codeforces uslubida baholash.'
    },
    {
      id: 'c99',
      title: 'BlueContest Round #97 (Div 3)',
      type: 'Rated',
      status: 'Past',
      startTime: '01 Mart, 2025',
      duration: '02:00:00',
      participantsCount: 1890,
      winner: 'Asadbek_Olimov',
      description: 'Boshlang\'ich va o\'rta darajadagi dasturchilar uchun reytingli musobaqa.',
      organizer: 'BlueContest Team',
      rules: 'ICPC qoidalari.'
    },
    {
      id: 'c98',
      title: 'Toshkent Dasturlash Kubogi 2025',
      type: 'Official',
      status: 'Past',
      startTime: '22 Fevral, 2025',
      duration: '04:00:00',
      participantsCount: 950,
      winner: 'AlgoNinja_99',
      description: 'Toshkent shahri bo\'yicha talabalar va o\'quvchilar o\'rtasidagi kubok.',
      organizer: 'Toshkent Shahar Hokimligi',
      rules: 'ICPC qoidalari.'
    }
  ]

  const filteredContests = contestsList.filter(c => {
    if (activeTab === 'upcoming') return c.status === 'Upcoming'
    if (activeTab === 'running') return c.status === 'Running'
    if (activeTab === 'past') return c.status === 'Past'
    return true
  })

  return (
    <div className="space-y-8 py-4">

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Trophy className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Musobaqalar va Turnirlar</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Bilimingizni sinang, Reyting va Sovrinlar yutib oling!
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Har haftalik reytingli va rasmiy olimpiada saralash musobaqalarida ishtirok eting.
          </p>
        </div>

        {/* Live Countdown Timer Widget */}
        <div className="relative z-10 bg-slate-800/80 backdrop-blur border border-slate-700/80 p-4 rounded-2xl flex flex-col items-center justify-center shrink-0 min-w-[220px]">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Keyingi Roundgacha:</span>
          <div className="flex items-center space-x-2 font-mono text-2xl font-black text-amber-400">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">BlueContest Round #98</span>
        </div>
      </div>

      {/* Tabs Selection */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Kutilayotgan Musobaqalar</span>
        </button>

        <button
          onClick={() => setActiveTab('running')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'running'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Hozir Boshlangan</span>
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            activeTab === 'past'
              ? 'bg-slate-800 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Yakunlangan</span>
        </button>
      </div>

      {/* Contests Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContests.map((contest) => (
          <div
            key={contest.id}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  contest.type === 'Rated'
                    ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                    : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                }`}>
                  {contest.type}
                </span>

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Davomiyligi: {contest.duration}
                </span>
              </div>

              <h3
                onClick={() => setSelectedContest(contest)}
                className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {contest.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {contest.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  <strong>{contest.participantsCount}</strong> qatnashchi
                </span>
                <span>•</span>
                <span>{contest.startTime}</span>
              </div>

              <button
                onClick={() => setSelectedContest(contest)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
              >
                Tafsilotlar →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contest Details Modal */}
      {selectedContest && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">

            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {selectedContest.type}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedContest.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedContest(null)
                  if (onCloseModal) onCloseModal()
                }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <p className="leading-relaxed">{selectedContest.description}</p>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Boshlanish vaqti:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedContest.startTime}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Davomiyligi:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedContest.duration}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Tashkilotchi:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedContest.organizer}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Ishtirokchilar:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedContest.participantsCount} kishi</strong>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-slate-400">Musobaqa Qoidalari:</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedContest.rules}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {isRegistered ? "Siz muvaffaqiyatli ro'yxatdan o'tdingiz!" : "Ro'yxatdan o'tish bepul."}
              </span>

              <button
                onClick={() => {
                  if (!currentUser) {
                    alert("Musobaqalarga qatnashish uchun avval tizimga kiring!")
                    if (onOpenAuth) onOpenAuth('login')
                    return
                  }
                  setIsRegistered(!isRegistered)
                }}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md ${
                  isRegistered
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isRegistered ? "✓ Ro'yxatdan O'tilgan" : "Ro'yxatdan O'tish"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
