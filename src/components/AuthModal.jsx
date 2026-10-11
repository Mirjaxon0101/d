import React, { useState } from 'react'
import { X, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react'

export function AuthModal({ isOpen, onClose, initialMode = 'login', language = 'uz', onRegisterUser }) {
  const [mode, setMode] = useState(initialMode) // 'login' | 'register'
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'register' && onRegisterUser) {
      const newUser = {
        id: `u_${Date.now()}`,
        name: username || 'Yangi_Dasturchi',
        rating: 1500,
        title: 'Newbie',
        titleColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
        solved: 0,
        org: 'Mustaqil o\'rganuvchi',
        avatar: '💻'
      }
      onRegisterUser(newUser)
    }
    setSuccessMsg(
      mode === 'login'
        ? "Muvaffaqiyatli tizimga kirdingiz!"
        : "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi! Siz reyting jadvallariga qo'shildingiz."
    )
    setTimeout(() => {
      setSuccessMsg('')
      setUsername('')
      setEmail('')
      setPassword('')
      onClose()
    }, 1500)
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
