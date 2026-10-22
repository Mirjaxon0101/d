import React, { useState } from 'react'
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { auth, db, googleProvider } from '../lib/firebaseClient'
import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  language = 'uz',
  registeredUsers = [],
  onRegisterUser,
  onLoginUser
}) {
  const [mode, setMode] = useState(initialMode) // 'login' | 'register'
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // OTP Verification state
  const [otpStep, setOtpStep] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [inputOtp, setInputOtp] = useState('')
  const [pendingUserData, setPendingUserData] = useState(null)

  // Google Modal state
  const [googleModalOpen, setGoogleModalOpen] = useState(false)
  const [googleEmail, setGoogleEmail] = useState('')
  const [googlePassword, setGooglePassword] = useState('')

  if (!isOpen) return null

  const validateEmailFormat = (inputEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(inputEmail)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const targetUsername = (mode === 'register' ? username : email).trim()
    const targetPassword = password.trim()
    const targetEmail = email.trim().toLowerCase()

    if (mode === 'login') {
      // Login directly without OTP requirement
      const loginIdentifier = targetUsername.toLowerCase()

      // 1. Try querying Supabase Database
      try {
        const { data: suData, error: suError } = await supabase
          .from('users')
          .select('*')
          .or(`email.eq.${loginIdentifier},name.eq.${loginIdentifier}`)
          .single()

        if (suData && suData.password === targetPassword) {
          if (suData.is_blocked) {
            setErrorMsg("Sizning akkauntingiz admin tomonidan bloklangan!")
            return
          }
          if (onLoginUser) onLoginUser(suData)
          setSuccessMsg("Supabase orqali muvaffaqiyatli tizimga kirdingiz!")
          setTimeout(() => {
            setSuccessMsg('')
            setEmail('')
            setPassword('')
            onClose()
          }, 1000)
          return
        }
      } catch (suErr) {
        console.log('Supabase query fallback to local API')
      }

      // 2. Central backend API check
      try {
        const endpoint = window.location.origin.includes('localhost') ? 'http://localhost:5000/api/auth' : '/api/auth'
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'login',
            username: targetUsername,
            password: targetPassword
          })
        })
        const data = await res.json()

        if (res.ok && data.user) {
          if (onLoginUser) onLoginUser(data.user)
          setSuccessMsg("Muvaffaqiyatli tizimga kirdingiz!")
          setTimeout(() => {
            setSuccessMsg('')
            setEmail('')
            setPassword('')
            onClose()
          }, 1000)
          return
        }
      } catch (err) {
        console.log('Central backend offline, using local check')
      }

      // Local fallback logic
      if ((loginIdentifier === 'admin' || loginIdentifier === 'admin@bluecontest.uz') && targetPassword === 'Mashal888mpoi123') {
        const adminUser = {
          id: 'admin_1',
          name: 'Admin',
          rating: 3000,
          title: 'Hacker Programmer',
          titleColor: 'text-red-500 bg-red-500/10 border-red-500/20',
          solved: 999,
          org: 'BlueContest Founder',
          avatar: '🤖'
        }
        if (onLoginUser) onLoginUser(adminUser)
        setSuccessMsg("Admin sifatida tizimga kirdingiz!")
        setTimeout(() => {
          setSuccessMsg('')
          setEmail('')
          setPassword('')
          onClose()
        }, 1000)
        return
      }

      const matchedUser = registeredUsers.find(
        u => (u.name.toLowerCase() === loginIdentifier || (u.email && u.email.toLowerCase() === loginIdentifier)) &&
             (u.password ? u.password === targetPassword : targetPassword.length > 0)
      )

      if (matchedUser) {
        if (matchedUser.isBlocked) {
          setErrorMsg("Sizning akkauntingiz admin tomonidan bloklangan!")
          return
        }
        if (onLoginUser) onLoginUser(matchedUser)
        setSuccessMsg("Muvaffaqiyatli tizimga kirdingiz!")
        setTimeout(() => {
          setSuccessMsg('')
          setEmail('')
          setPassword('')
          onClose()
        }, 1000)
      } else {
        setErrorMsg("Foydalanuvchi nomi yoki parol xato!")
      }
      return
    }

    // REGISTRATION FLOW:
    // Require valid email format
    if (!validateEmailFormat(targetEmail)) {
      setErrorMsg("Haqiqiy email manzilini kiriting! (masalan: user@gmail.com)")
      return
    }

    // Duplicate email check
    const existingUser = registeredUsers.find(u => u.email && u.email.toLowerCase() === targetEmail)
    if (existingUser) {
      setErrorMsg("Bu email allaqachon ro'yxatdan o'tgan!")
      return
    }

    // Trigger 6-digit OTP verification code flow for registration
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(code)
    setPendingUserData({
      mode,
      targetUsername,
      targetEmail,
      targetPassword
    })
    setOtpStep(true)
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (inputOtp.trim() !== generatedOtp) {
      setErrorMsg("Tasdiqlash kodi noto'g'ri kiritildi! Qayta urinib ko'ring.")
      return
    }

    const { mode: pMode, targetUsername, targetEmail, targetPassword } = pendingUserData

    // Try central backend API
    try {
      const endpoint = window.location.origin.includes('localhost') ? 'http://localhost:5000/api/auth' : '/api/auth'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: pMode,
          username: targetUsername,
          email: targetEmail,
          password: targetPassword,
          org: 'Mustaqil o\'rganuvchi',
          avatar: '💻'
        })
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Tizimda xatolik yuz berdi!")
        setOtpStep(false)
        return
      }

      if (data.user) {
        if (pMode === 'register' && onRegisterUser) {
          onRegisterUser(data.user)
        } else if (pMode === 'login' && onLoginUser) {
          onLoginUser(data.user)
        }

        setSuccessMsg(pMode === 'register' ? "Email tasdiqlandi! Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!" : "Email tasdiqlandi! Muvaffaqiyatli tizimga kirdingiz!")
        setTimeout(() => {
          setSuccessMsg('')
          setUsername('')
          setEmail('')
          setPassword('')
          setOtpStep(false)
          setInputOtp('')
          onClose()
        }, 1200)
        return
      }
    } catch (e) {
      console.log('Central backend offline, attempting local login fallback')
    }

    // Local fallback logic
    if (pMode === 'login') {
      const loginIdentifier = targetUsername.toLowerCase()

      // Admin Account check
      if ((loginIdentifier === 'admin' || loginIdentifier === 'admin@bluecontest.uz') && targetPassword === 'Mashal888mpoi123') {
        const adminUser = {
          id: 'admin_1',
          name: 'Admin',
          rating: 3000,
          title: 'Hacker Programmer',
          titleColor: 'text-red-500 bg-red-500/10 border-red-500/20',
          solved: 999,
          org: 'BlueContest Founder',
          avatar: '🤖'
        }
        if (onLoginUser) onLoginUser(adminUser)
        setSuccessMsg("Admin sifatidaga tizimga kirdingiz!")
        setTimeout(() => {
          setSuccessMsg('')
          setEmail('')
          setPassword('')
          setOtpStep(false)
          setInputOtp('')
          onClose()
        }, 1200)
        return
      }

      const matchedUser = registeredUsers.find(
        u => (u.name.toLowerCase() === loginIdentifier || (u.email && u.email.toLowerCase() === loginIdentifier)) &&
             (u.password ? u.password === targetPassword : targetPassword.length > 0)
      )

      if (matchedUser) {
        if (matchedUser.isBlocked) {
          setErrorMsg("Sizning akkauntingiz admin tomonidan bloklangan!")
          setOtpStep(false)
          return
        }
        if (onLoginUser) onLoginUser(matchedUser)
        setSuccessMsg("Muvaffaqiyatli tizimga kirdingiz!")
        setTimeout(() => {
          setSuccessMsg('')
          setEmail('')
          setPassword('')
          setOtpStep(false)
          setInputOtp('')
          onClose()
        }, 1200)
      } else {
        setErrorMsg("Foydalanuvchi nomi yoki parol xato!")
        setOtpStep(false)
      }
    } else {
      const newUser = {
        id: `u_${Date.now()}`,
        name: username.trim(),
        email: targetEmail,
        password: targetPassword,
        rating: 1200,
        title: 'Newbie',
        titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
        solved: 0,
        org: 'Mustaqil o\'rganuvchi',
        avatar: '💻'
      }

      // Insert into Supabase table
      try {
        await supabase.from('users').insert([newUser])
      } catch (suErr) {
        console.log('Supabase registration insert error/offline')
      }

      if (onRegisterUser) onRegisterUser(newUser)
      setSuccessMsg("Email tasdiqlandi! Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!")
      setTimeout(() => {
        setSuccessMsg('')
        setUsername('')
        setEmail('')
        setPassword('')
        setOtpStep(false)
        setInputOtp('')
        onClose()
      }, 1200)
    }
  }

  const handleFirebaseGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const gEmailClean = (user.email || '').toLowerCase()
      const gUsername = user.displayName || gEmailClean.split('@')[0]

      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      let gUserData
      if (userSnap.exists()) {
        gUserData = userSnap.data()
      } else {
        gUserData = {
          id: user.uid,
          name: gUsername,
          email: gEmailClean,
          password: 'firebase_google_auth',
          rating: 1200,
          title: 'Newbie',
          titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
          solved: 0,
          org: 'Google User',
          avatar: user.photoURL || '🌐'
        }
        await setDoc(userRef, gUserData)
      }

      if (onRegisterUser && !userSnap.exists()) {
        onRegisterUser(gUserData)
      }
      if (onLoginUser) onLoginUser(gUserData)

      setSuccessMsg(`Firebase Google orqali muvaffaqiyatli kirdingiz! Ism: ${gUserData.name}`)
      setTimeout(() => {
        setSuccessMsg('')
        onClose()
      }, 1200)
    } catch (err) {
      console.log('Firebase Popup Error or fallback mode:', err)
      setErrorMsg("Firebase Auth Popup ishga tushmadi. Iltimos Google simulyatsiya rejimida e-pochtangizni kiriting.")
    }
  }

  const handleGoogleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const gEmailClean = googleEmail.trim().toLowerCase()
    if (!gEmailClean || !validateEmailFormat(gEmailClean)) {
      setErrorMsg("Google email formati noto'g'ri!")
      return
    }

    const existingGUser = registeredUsers.find(u => u.email && u.email.toLowerCase() === gEmailClean)

    // Automatically generate username and password settings from Google identity
    const gUsername = gEmailClean.split('@')[0]
    const autoPassword = googlePassword.trim() || `GPass_${Math.floor(1000 + Math.random() * 9000)}`

    const gUser = existingGUser
      ? {
          ...existingGUser,
          password: googlePassword.trim() || existingGUser.password
        }
      : {
          id: `u_g_${Date.now()}`,
          name: gUsername,
          email: gEmailClean,
          password: autoPassword,
          rating: 1200,
          title: 'Newbie',
          titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
          solved: 0,
          org: 'Google User',
          avatar: '🌐'
        }

    if (!existingGUser && onRegisterUser) {
      onRegisterUser(gUser)
    }

    if (onLoginUser) onLoginUser(gUser)
    setSuccessMsg(`Google orqali muvaffaqiyatli o'tdingiz! Ism: ${gUser.name}, Parol o'rnatildi.`)
    setTimeout(() => {
      setSuccessMsg('')
      setGoogleEmail('')
      setGooglePassword('')
      setGoogleModalOpen(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? 'BlueContest Tizimiga Kirish' : "Ro'yxatdan O'tish"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login'
              ? 'Masalalarni yechish va musobaqalarda qatnashish uchun akkountingizga kiring.'
              : 'O\'zingizning shaxsiy profilingizni yarating va reytingizni oshirib boring.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-xs text-center">
            {errorMsg}
          </div>
        )}

        {successMsg ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-center text-sm">
            {successMsg}
          </div>
        ) : otpStep ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 font-semibold space-y-1">
              <p>📩 Emailingizga ({pendingUserData?.targetEmail}) 6-xonali tasdiqlash kodi yuborildi.</p>
              <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">Simulyatsiya kodi: {generatedOtp}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">6-xonali Tasdiqlash Kodi</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-base font-mono font-bold text-center text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none tracking-widest"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Kodni Tasdiqlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setOtpStep(false)}
              className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ← Ortga qaytish
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Foydalanuvchi nomi (Username)</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Masalan: coder_uz"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                {mode === 'login' ? 'Username yoki Email' : 'Email Manzili'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Parol</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>{mode === 'login' ? 'Kirish' : "Ro'yxatdan O'tish"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Google Login Divider & Button */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold">Yoki</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setGoogleModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center space-x-2.5 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google orqali kirish</span>
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800">
          {mode === 'login' ? (
            <p>
              Akkountingiz yo'qmi?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Ro'yxatdan o'ting
              </button>
            </p>
          ) : (
            <p>
              Akkountingiz bormi?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Tizimga kiring
              </button>
            </p>
          )}
        </div>

      </div>

      {/* Google Auth Modal Simulation */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 relative">
            <button
              onClick={() => setGoogleModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <svg className="w-10 h-10 mx-auto" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Google Akkaunt Bilan Kirish</h3>
              <p className="text-xs text-slate-400">Google e-pochtangiz va parolingizni kiriting.</p>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Google Email</label>
                <input
                  type="email"
                  required
                  placeholder="user@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Google Paroli</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={googlePassword}
                  onChange={(e) => setGooglePassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Google Bilan Kirish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
