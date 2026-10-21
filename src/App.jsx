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
import { db } from './lib/firebaseClient'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'

export function getUserTitleInfo(solvedCount) {
  if (solvedCount >= 200) {
    return { title: 'Hacker Programmer', titleColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' }
  } else if (solvedCount >= 140) {
    return { title: 'Grandmaster', titleColor: 'text-red-500 bg-red-500/10 border-red-500/20' }
  } else if (solvedCount >= 80) {
    return { title: 'High Master', titleColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' }
  } else if (solvedCount >= 40) {
    return { title: 'Master', titleColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20' }
  } else if (solvedCount >= 10) {
    return { title: 'Specialist', titleColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' }
  } else if (solvedCount >= 1) {
    return { title: 'Pupil', titleColor: 'text-slate-400 bg-slate-400/10 border-slate-400/20' }
  }
  return { title: 'Newbie', titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20' }
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('home') // 'home' | 'problems' | 'contests' | 'ratings' | 'discussions' | 'admin'
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('uz')
  const [searchQuery, setSearchQuery] = useState('')

  // Default Seed Users
  const DEFAULT_INITIAL_USERS = [
    {
      id: 'u_admin',
      name: 'Admin',
      org: 'BlueContest HQ',
      rating: 2850,
      solved: 215,
      title: 'Hacker Programmer',
      titleColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      avatar: '🤖',
      password: 'qwertyuiop'
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
      password: 'password123'
    },
    {
      id: 'u_2',
      name: 'Sardor_Dev',
      org: 'SamDU Inno',
      rating: 2110,
      solved: 112,
      title: 'Master',
      titleColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      avatar: '🚀',
      password: 'password123'
    },
    {
      id: 'u_3',
      name: 'Nodira_Code',
      org: 'TUIT Tashkent',
      rating: 1840,
      solved: 65,
      title: 'Specialist',
      titleColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      avatar: '👩‍💻',
      password: 'password123'
    }
  ]

  // Central DB + Local Storage Users state
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('bluecontest_users')
      return savedUsers ? JSON.parse(savedUsers) : DEFAULT_INITIAL_USERS
    } catch {
      return DEFAULT_INITIAL_USERS
    }
  })

  // Persistent Current Logged-in User State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('bluecontest_current_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  // Fetch central database users on load (Firebase Firestore first, then local API fallback)
  const fetchUsers = async () => {
    try {
      // 1. Try Firebase Firestore
      const usersCol = collection(db, 'users')
      const userSnapshot = await getDocs(usersCol)
      const fbUsers = userSnapshot.docs.map(d => d.data())
      if (fbUsers && fbUsers.length > 0) {
        setUsers(fbUsers)
        localStorage.setItem('bluecontest_users', JSON.stringify(fbUsers))
        if (currentUser) {
          const synced = fbUsers.find(u => u.id === currentUser.id || u.name.toLowerCase() === currentUser.name.toLowerCase())
          if (synced) setCurrentUser(synced)
        }
        return
      }
    } catch (err) {
      console.log('Firebase fetch fallback to local API')
    }

    try {
      const apiUrl = window.location.origin.includes('localhost') ? 'http://localhost:5000/api/users' : '/api/users'
      const res = await fetch(apiUrl)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data)
          localStorage.setItem('bluecontest_users', JSON.stringify(data))

          if (currentUser) {
            const synced = data.find(u => u.id === currentUser.id || u.name.toLowerCase() === currentUser.name.toLowerCase())
            if (synced) {
              setCurrentUser(synced)
            }
          }
        }
      }
    } catch (e) {
      console.log('Central backend offline, using local storage fallback')
      if (users.length === 0) {
        setUsers(DEFAULT_INITIAL_USERS)
      }
    }
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  // Save users & currentUser to localStorage on change
  React.useEffect(() => {
    try {
      localStorage.setItem('bluecontest_users', JSON.stringify(users))
    } catch (e) {
      console.error("Failed to save users", e)
    }
  }, [users])

  React.useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bluecontest_current_user', JSON.stringify(currentUser))
      } else {
        localStorage.removeItem('bluecontest_current_user')
      }
    } catch (e) {
      console.error("Failed to save current user", e)
    }
  }, [currentUser])

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
            onProblemSolved={async (points, problemId) => {
              if (!currentUser) return

              // Backend API call
              try {
                const endpoint = window.location.origin.includes('localhost') ? `http://localhost:5000/api/users/${currentUser.id}/solve` : '/api/users'
                const res = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ points: points || 15, problemId, userId: currentUser.id })
                })
                if (res.ok) {
                  const data = await res.json()
                  if (data.user) {
                    setCurrentUser(data.user)
                    setUsers(prev => prev.map(u => u.id === data.user.id ? data.user : u))
                    return
                  }
                }
              } catch (e) {
                console.log('Backend sync offline, using local state update')
              }

              // Local fallback
              const newSolved = (currentUser.solved || 0) + 1
              const newRating = (currentUser.rating || 1200) + (points || 15)
              const titleInfo = getUserTitleInfo(newSolved)

              const updatedUser = {
                ...currentUser,
                solved: newSolved,
                rating: newRating,
                title: titleInfo.title,
                titleColor: titleInfo.titleColor
              }

              setCurrentUser(updatedUser)
              setUsers(prev => {
                const exists = prev.some(u => u.id === updatedUser.id)
                if (exists) {
                  return prev.map(u => u.id === updatedUser.id ? updatedUser : u)
                } else {
                  return [updatedUser, ...prev]
                }
              })
            }}
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
