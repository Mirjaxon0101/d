import React from 'react'
import {
  Trophy,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Star,
  Sparkles,
  Flame,
  ChevronRight,
  Code,
  CheckCircle
} from 'lucide-react'

export function HomeView({
  language = 'uz',
  onNavigateTab,
  onOpenProblem,
  onOpenContest
}) {
  const stats = [
    { label: { uz: 'Jami masalalar', ru: 'Всего задач', en: 'Total Problems' }, value: '1,248+', icon: Code, color: 'text-blue-500 bg-blue-500/10' },
    { label: { uz: 'Yechilgan yechimlar', ru: 'Решенных решений', en: 'Accepted Submissions' }, value: '840,920+', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: { uz: 'Faol dasturchilar', ru: 'Активных кодеров', en: 'Active Coders' }, value: '42,500+', icon: Users, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: { uz: 'Oʻtkazilgan musobaqalar', ru: 'Проведено соревнований', en: 'Contests Hosted' }, value: '185', icon: Trophy, color: 'text-amber-500 bg-amber-500/10' }
  ]

  const upcomingContest = {
    id: 'c101',
    title: 'BlueContest Round #98 (Div 2 + Div 1)',
    startTime: '2025-03-20 19:30',
    duration: '2 soat 30 daqiqa',
    participants: 1240,
    status: 'Upcoming',
    banner: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
  }

  const featuredProblems = [
    { id: 1, title: 'A + B', difficulty: 'Oson', difficultyColor: 'text-emerald-500 bg-emerald-500/10', solved: '94.2%', tags: ['Boshlangʻich', 'Math'] },
    { id: 2, title: 'Ikkilik qidiruv', difficulty: 'Oʻrta', difficultyColor: 'text-amber-500 bg-amber-500/10', solved: '62.8%', tags: ['Binary Search', 'Algorithms'] },
    { id: 3, title: 'Deykstra algoritmi va eng qisqa yoʻl', difficulty: 'Qiyin', difficultyColor: 'text-red-500 bg-red-500/10', solved: '31.5%', tags: ['Graphs', 'Shortest Path'] },
    { id: 4, title: 'Nodir ketma-ketliklar', difficulty: 'Oʻrta', difficultyColor: 'text-amber-500 bg-amber-500/10', solved: '54.0%', tags: ['Dynamic Programming'] },
  ]

  const topCoders = [
    { rank: 1, name: 'Asadbek_Olimov', rating: 2840, badge: 'Grandmaster', badgeColor: 'text-red-500 bg-red-500/10', avatar: '👨‍💻' },
    { rank: 2, name: 'AlgoNinja_99', rating: 2690, badge: 'Master', badgeColor: 'text-purple-500 bg-purple-500/10', avatar: '⚡' },
    { rank: 3, name: 'Javohir_Dev', rating: 2510, badge: 'Master', badgeColor: 'text-purple-500 bg-purple-500/10', avatar: '🚀' },
    { rank: 4, name: 'CyberCoder_UZ', rating: 2380, badge: 'Candidate Master', badgeColor: 'text-blue-500 bg-blue-500/10', avatar: '💻' },
    { rank: 5, name: 'Shahzod_CP', rating: 2240, badge: 'Candidate Master', badgeColor: 'text-blue-500 bg-blue-500/10', avatar: '🎯' },
  ]

  const newsItems = [
    {
      date: '10 Mart, 2025',
      title: 'Xalqaro Informatika Olimpiadasiga (IOI 2025) Saralash Bosqichi e\'lon qilindi!',
      summary: 'BlueContest platformasida respublika bo\'yicha o\'quvchilar uchun saralash musobaqalari fevral va mart oylarida o\'tkaziladi.',
      author: 'BlueContest Admin',
      tag: 'Olimpiada'
    },
    {
      date: '02 Mart, 2025',
      title: 'Tizimda yangi Python 3.12 va C++23 kompilyatorlari qo\'shildi',
      summary: 'Endi siz o\'z yechimlaringizni eng so\'nggi C++23 hamda PyPy3 standartlarida topshirishingiz va tezroq bajarilish tezligidan bahramand bo\'lishingiz mumkin.',
      author: 'DevTeam',
      tag: 'Yangilanish'
    }
  ]

  return (
    <div className="space-y-10 py-6">

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl p-8 sm:p-12 border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BlueContest Online Judge 2.0</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            Mantiqiy fikrlashni rivojlantiring va{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Dasturlash Chempioniga
            </span>{' '}
            aylaning!
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {language === 'uz'
              ? "Minglab dasturlash masalalarini yeching, xalqaro va milliy musobaqalarda qatnashib, reytingingizni oshiring!"
              : "Решайте тысячи задач по программированию, участвуйте в турнирах и повышайте свой рейтинг!"}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigateTab('problems')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <Code className="w-4 h-4" />
              <span>Masalalarga o'tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('contests')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Musobaqalar jadvali</span>
            </button>
          </div>
        </div>
      </section>

      {/* Platform Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className={`p-3 rounded-xl ${item.color}`}>
                <Icon className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.value}</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  {item.label[language] || item.label.uz}
                </p>
              </div>
            </div>
          )
        })}
      </section>

      {/* Main Content Split (News & Featured vs Sidebar Leaderboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Upcoming Contest Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-indigo-500/30 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Yaqinlashayotgan Musobaqa
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {upcomingContest.startTime}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 hover:text-blue-400 transition-colors cursor-pointer" onClick={() => onOpenContest(upcomingContest)}>
              {upcomingContest.title}
            </h3>

            <p className="text-sm text-slate-300 mb-6">
              Davomiyligi: <strong className="text-white">{upcomingContest.duration}</strong> • Registratsiyadan o'tganlar: <strong className="text-white">{upcomingContest.participants} ishtirokchi</strong>
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Ro'yxatdan o'tish ochiq</span>
              </div>
              <button
                onClick={() => onNavigateTab('contests')}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Qatnashish va Tafsilotlar
              </button>
            </div>
          </div>

          {/* Featured / Popular Problems */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Mashhur Masalalar</h3>
              </div>
              <button
                onClick={() => onNavigateTab('problems')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Barchasini ko'rish</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {featuredProblems.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => onOpenProblem(prob)}
                  className="py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 px-2 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-slate-400">#{prob.id}</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {prob.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {prob.tags.map((tag, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${prob.difficultyColor}`}>
                      {prob.difficulty}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline">
                      {prob.solved}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News & Announcements */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Yangiliklar va E'lonlar</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsItems.map((news, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {news.tag}
                      </span>
                      <span className="text-xs text-slate-400">{news.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug hover:text-blue-600 transition-colors cursor-pointer">
                      {news.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span>Muallif: <strong className="text-slate-600 dark:text-slate-300">{news.author}</strong></span>
                    <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline">O'qish →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Sidebar Leaderboard & Quick Tools) */}
        <div className="space-y-6">

          {/* Top Coders Leaderboard Preview */}
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Peshqadam Dasturchilar</h3>
              </div>
              <button
                onClick={() => onNavigateTab('ratings')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Barchasi
              </button>
            </div>

            <div className="space-y-3">
              {topCoders.map((coder) => (
                <div key={coder.rank} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 text-center font-bold ${
                      coder.rank === 1 ? 'text-amber-500' : coder.rank === 2 ? 'text-slate-400' : coder.rank === 3 ? 'text-amber-700' : 'text-slate-400'
                    }`}>
                      #{coder.rank}
                    </span>
                    <span className="text-lg">{coder.avatar}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 transition-colors cursor-pointer">
                        {coder.name}
                      </span>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wide w-max px-1.5 py-0.2 rounded ${coder.badgeColor}`}>
                        {coder.badge}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                    {coder.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Platform Guidelines */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/60 dark:to-slate-800/90 rounded-2xl p-5 border border-blue-100 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              BlueContest platformasi tartibi
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Masalalar C++, Python, Java va JavaScript tillarida tekshiriladi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Har bir masalada belgilangan vaqt va xotira chegarasiga rioya qiling.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Plagiat (ko'chirmachilik) aniqlangan hollarda reytingingiz bekor qilinadi.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  )
}
