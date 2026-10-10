import React from 'react'
import {
  Code2,
  Trophy,
  BarChart2,
  MessageSquare,
  FileText,
  Search,
  Moon,
  Sun,
  Globe,
  User,
  Bell,
  Menu,
  X,
  ChevronDown,
  Terminal,
  LogIn
} from 'lucide-react'

export function Navbar({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  onOpenAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false)

  const navItems = [
    { id: 'home', label: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' }, icon: Terminal },
    { id: 'problems', label: { uz: 'Masalalar', ru: 'Задачи', en: 'Problems' }, icon: Code2 },
    { id: 'contests', label: { uz: 'Musobaqalar', ru: 'Соревнования', en: 'Contests' }, icon: Trophy },
    { id: 'ratings', label: { uz: 'Reyting', ru: 'Рейтинг', en: 'Rankings' }, icon: BarChart2 },
    { id: 'discussions', label: { uz: 'Muhokama', ru: 'Обсуждения', en: 'Discussions' }, icon: MessageSquare },
  ]

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Main Nav */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center space-x-2.5 focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Terminal className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                  RoboContest
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 -mt-1 uppercase">
                  ONLINE JUDGE
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label[language] || item.label.uz}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Search, Utilities & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Search Bar */}
            <div className="relative w-48 xl:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={
                  language === 'uz' ? 'Masalalar, musobaqalar...' : language === 'ru' ? 'Поиск...' : 'Search...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm rounded-lg border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>{languages.find(l => l.code === language)?.flag}</span>
                <span className="uppercase text-xs font-bold">{language}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setLangDropdownOpen(false)
                      }}
                      className={`w-full flex items-center space-x-2.5 px-3 py-2 text-sm text-left transition-colors ${
                        language === lang.code
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <LogIn className="w-4 h-4 text-slate-500" />
                <span>{language === 'uz' ? 'Kirish' : language === 'ru' ? 'Войти' : 'Sign In'}</span>
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                {language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? 'Регистрация' : 'Register'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <div className="relative my-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'uz' ? 'Qidiruv...' : 'Search...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm rounded-lg border border-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label[language] || item.label.uz}</span>
                </button>
              )
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    language === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onOpenAuth('login')
                  setMobileMenuOpen(false)
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg"
              >
                Kirish
              </button>
              <button
                onClick={() => {
                  onOpenAuth('register')
                  setMobileMenuOpen(false)
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer({ language = 'uz' }) {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Terminal className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">RoboContest</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'uz'
                ? "O'zbekistondagi eng yirik dasturlash va sport dasturlashi hamjamiyati hamda avtomatlashtirilgan baholash tizimi."
                : language === 'ru'
                ? 'Крупнейшее сообщество спортивного программирования и онлайн-судья в Узбекистане.'
                : 'The largest competitive programming community and online judge platform in Uzbekistan.'}
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} RoboContest.uz. All rights reserved.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {language === 'uz' ? 'Platforma' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Masalalar arxivi</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Musobaqalar jadvallari</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Foydalanuvchilar reytingi</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tashkilotlar va Maktablar</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {language === 'uz' ? 'Resurslar' : 'Resources'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hujjatlar va Qo'llanma</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mavzuli masalalar to'plami</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tizim holati (System Status)</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API & Integratsiyalar</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {language === 'uz' ? 'Aloqa va Hamjamiyat' : 'Community'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Savollaringiz bormi? Telegram kanalimizga qo'shiling.
            </p>
            <div className="flex space-x-3 pt-1">
              <a href="https://t.me/robocontest" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 text-xs font-semibold hover:bg-sky-100 transition-colors">
                Telegram Channel
              </a>
              <a href="https://t.me/robocontest_chat" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors">
                Discussion Chat
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
