import React, { useState } from 'react'
import { Navbar, Footer } from './components/HeaderFooter'
import { HomeView } from './components/HomeView'
import { ProblemsView } from './components/ProblemsView'
import { ContestsView } from './components/ContestsView'
import { RatingsView } from './components/RatingsView'
import { DiscussionsView } from './components/DiscussionsView'
import { AuthModal } from './components/AuthModal'

export default function App() {
  const [currentTab, setCurrentTab] = useState('home') // 'home' | 'problems' | 'contests' | 'ratings' | 'discussions'
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('uz')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal active targets
  const [activeProblemModal, setActiveProblemModal] = useState(null)
  const [activeContestModal, setActiveContestModal] = useState(null)

  // Auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

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
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            onNavigateTab={setCurrentTab}
            onOpenProblem={handleOpenProblem}
            onOpenContest={handleOpenContest}
          />
        )}

        {currentTab === 'problems' && (
          <ProblemsView
            language={language}
            activeProblemModal={activeProblemModal}
            onCloseModal={() => setActiveProblemModal(null)}
          />
        )}

        {currentTab === 'contests' && (
          <ContestsView
            language={language}
            activeContestModal={activeContestModal}
            onCloseModal={() => setActiveContestModal(null)}
          />
        )}

        {currentTab === 'ratings' && (
          <RatingsView language={language} />
        )}

        {currentTab === 'discussions' && (
          <DiscussionsView language={language} />
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
      />

    </div>
  )
}
