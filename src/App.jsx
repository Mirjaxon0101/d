import React, { useState } from 'react'
import { Navbar, Footer } from './components/HeaderFooter'
import { HomeView } from './components/HomeView'
import { ProblemsView } from './components/ProblemsView'
import { ContestsView } from './components/ContestsView'
import { RatingsView } from './components/RatingsView'
import { DiscussionsView } from './components/DiscussionsView'
import { AdminPanel } from './components/AdminPanel'
import { AuthModal } from './components/AuthModal'
import { UserSettingsModal } from './components/UserSettingsModal'
import { initialProblems } from './data/problemsData'

export default function App() {
  const [currentTab, setCurrentTab] = useState('home') // 'home' | 'problems' | 'contests' | 'ratings' | 'discussions' | 'admin'
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('uz')
  const [searchQuery, setSearchQuery] = useState('')

  // Current Logged-in User State
  const [currentUser, setCurrentUser] = useState(null)

  // Dynamic Leaderboard Users state
  const [users, setUsers] = useState([])

  // Dynamic Problems & Contests state
  const [problems, setProblems] = useState(initialProblems)
  const [contests, setContests] = useState([
    {
      id: 'c101',
      title: 'BlueContest Round #98 (Div 2 + Div 1)',
      type: 'Rated',
      status: 'Upcoming',
      startTime: '2025-03-20 19:30',
      duration: '02:30:00',
      participantsCount: 1420,
      description: 'Sport dasturlashi bo\'yicha navbatdagi reytingli musobaqa.',
      organizer: 'BlueContest Team',
      rules: 'ICPC qoidalari'
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
      rules: 'IOI qoidalari'
    }
  ])

  // Modal active targets
  const [activeProblemModal, setActiveProblemModal] = useState(null)
  const [activeContestModal, setActiveContestModal] = useState(null)

  // Auth & Settings modals
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [settingsModalOpen, setSettingsModalOpen] = useState(false)

  const handleOpenAuth = (mode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleOpenProblem = (prob) => {
    setActiveProblemModal(prob)
    setCurrentTab('problems')
  }

  const handleOpenContest = (contest) => {
    setActiveContestModal(contest)
    setCurrentTab('contests')
  }

  return (
    <div className={darkMode ? 'dark bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans' : 'bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans'}>

      {/* Top Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            onNavigateTab={setCurrentTab}
            onOpenProblem={handleOpenProblem}
            onOpenContest={handleOpenContest}
            users={users}
          />
        )}

        {currentTab === 'problems' && (
          <ProblemsView
            language={language}
            problemsList={problems}
            activeProblemModal={activeProblemModal}
            onCloseModal={() => setActiveProblemModal(null)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'contests' && (
          <ContestsView
            language={language}
            contestsList={contests}
            activeContestModal={activeContestModal}
            onCloseModal={() => setActiveContestModal(null)}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'ratings' && (
          <RatingsView language={language} users={users} setUsers={setUsers} />
        )}

        {currentTab === 'discussions' && (
          <DiscussionsView language={language} />
        )}

        {currentTab === 'admin' && (
          <AdminPanel
            language={language}
            problems={problems}
            setProblems={setProblems}
            contests={contests}
            setContests={setContests}
            users={users}
            setUsers={setUsers}
          />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        language={language}
        registeredUsers={users}
        onRegisterUser={(newUser) => {
          setUsers(prev => [newUser, ...prev])
          setCurrentUser(newUser)
        }}
        onLoginUser={(user) => {
          setCurrentUser(user)
        }}
      />

      {/* User Settings Modal */}
      <UserSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(updatedUser) => {
          setCurrentUser(updatedUser)
          setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))
        }}
      />

    </div>
  )
}
