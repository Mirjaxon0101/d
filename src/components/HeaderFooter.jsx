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
  LogIn,
  ShieldAlert
} from 'lucide-react'
import AvatarWithFrame from './AvatarWithFrame'

export function Navbar({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenSettings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  const navItems = [
    { id: 'home', label: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' }, icon: Terminal },
    { id: 'problems', label: { uz: 'Masalalar', ru: 'Задачи', en: 'Problems' }, icon: Code2 },
    { id: 'contests', label: { uz: 'Musobaqalar', ru: 'Соревнования', en: 'Contests' }, icon: Trophy },
    { id: 'ratings', label: { uz: 'Reyting', ru: 'Рейтинг', en: 'Rankings' }, icon: BarChart2 },
    { id: 'discussions', label: { uz: 'Muhokama', ru: 'Обсуждения', en: 'Discussions' }, icon: MessageSquare },
    { id: 'admin', label: { uz: 'Admin Panel', ru: 'Админ', en: 'Admin' }, icon: ShieldAlert },
  ]

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* Logo & Main Nav */}
          <div className="flex items-center space-x-3 xl:space-x-6">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center space-x-2.5 focus:outline-none group shrink-0"
            >
              <img
                src="/logo.png"
                alt="BlueContest Logo"
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col text-left">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  BlueContest
                </span>
                <span className="text-[9px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 -mt-1 uppercase">
                  ONLINE JUDGE
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-0.5 xl:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label[language] || item.label.uz}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Search, Utilities & Auth / User Profile */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {/* Quick Search Bar */}
            <div className="relative w-28 xl:w-44">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={
                  language === 'uz' ? 'Masalalar...' : language === 'ru' ? 'Поиск...' : 'Search...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs rounded-lg border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>{languages.find(l => l.code === language)?.flag}</span>
                <span className="uppercase text-[11px] font-bold">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setLangDropdownOpen(false)
                      }}
                      className={`w-full flex items-center space-x-2 px-2.5 py-1.5 text-xs text-left transition-colors ${
                        language === lang.code
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Auth / Logged in User Section */}
            <div className="flex items-center space-x-1.5 pl-1.5 border-l border-slate-200 dark:border-slate-800">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <AvatarWithFrame
                      avatar={currentUser.avatar || '👨‍💻'}
                      title={currentUser.title || 'Newbie'}
                      size="sm"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                        {currentUser.name}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-500 font-bold -mt-0.5">
                        {currentUser.rating} rating
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700 text-xs">
                        <p className="font-bold text-slate-800 dark:text-slate-100">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-400">{currentUser.org || 'Foydalanuvchi'}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (onOpenSettings) onOpenSettings()
                          setUserMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        ⚙️ Sozlamalar (Settings)
                      </button>

                      <button
                        onClick={() => {
                          onLogout()
                          setUserMenuOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-t border-slate-100 dark:border-slate-700/60"
                      >
                        Chiqish (Logout)
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-500" />
                    <span>{language === 'uz' ? 'Kirish' : language === 'ru' ? 'Войти' : 'Sign In'}</span>
                  </button>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95 shrink-0 whitespace-nowrap"
                  >
                    {language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? 'Регистрация' : 'Register'}
                  </button>
                </>
              )}
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
              <img src="/logo.png" alt="BlueContest Logo" className="w-8 h-8 object-contain" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">BlueContest</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {language === 'uz'
                ? "Dasturlash va sport dasturlashi hamjamiyati hamda avtomatlashtirilgan baholash tizimi."
                : language === 'ru'
                ? 'Сообщество спортивного программирования и онлайн-судья.'
                : 'Competitive programming community and online judge platform.'}
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} BlueContest. All rights reserved.
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
              <a href="#" className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 text-xs font-semibold hover:bg-sky-100 transition-colors">
                Telegram Channel
              </a>
              <a href="#" className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors">
                Discussion Chat
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
