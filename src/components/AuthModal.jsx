import React, { useState } from 'react'
import { X, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react'

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

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    const targetUsername = (mode === 'register' ? username : email).trim()
    const targetPassword = password.trim()

    // Try central backend API
    try {
      const res = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode,
          username: targetUsername,
          email: email.trim(),
          password: targetPassword,
          org: 'Mustaqil o\'rganuvchi',
          avatar: '💻'
        })
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Tizimda xatolik yuz berdi!")
        return
      }

      if (data.user) {
        if (mode === 'register' && onRegisterUser) {
          onRegisterUser(data.user)
        } else if (mode === 'login' && onLoginUser) {
          onLoginUser(data.user)
        }

        setSuccessMsg(mode === 'register' ? "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!" : "Muvaffaqiyatli tizimga kirdingiz!")
        setTimeout(() => {
          setSuccessMsg('')
          setUsername('')
          setEmail('')
          setPassword('')
          onClose()
        }, 1200)
        return
      }
    } catch (e) {
      console.log('Central backend offline, attempting local login fallback')
    }

    // Local fallback logic
    if (mode === 'login') {
      const loginIdentifier = targetUsername.toLowerCase()

      // Admin Account check
      if ((loginIdentifier === 'admin' || loginIdentifier === 'admin@bluecontest.uz') && targetPassword === 'qwertyuiop') {
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
          onClose()
        }, 1200)
        return
      }

      const matchedUser = registeredUsers.find(
        u => (u.name.toLowerCase() === loginIdentifier || (u.email && u.email.toLowerCase() === loginIdentifier)) &&
             (u.password ? u.password === targetPassword : true)
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
        }, 1200)
      } else {
        setErrorMsg("Foydalanuvchi nomi yoki parol xato!")
      }
    } else {
      const newUser = {
        id: `u_${Date.now()}`,
        name: username.trim(),
        email: email.trim(),
        password: password.trim(),
        rating: 1200,
        title: 'Newbie',
        titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
        solved: 0,
        org: 'Mustaqil o\'rganuvchi',
        avatar: '💻'
      }

      if (onRegisterUser) onRegisterUser(newUser)
      setSuccessMsg("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!")
      setTimeout(() => {
        setSuccessMsg('')
        setUsername('')
        setEmail('')
        setPassword('')
        onClose()
      }, 1200)
    }
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
            {mode === 'login' ? 'RoboContest Tizimiga Kirish' : "Ro'yxatdan O'tish"}
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
    </div>
  )
}
