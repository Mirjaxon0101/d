import React, { useState } from 'react'
import { X, User, Lock, Building, Key, Check, Upload, Image as ImageIcon } from 'lucide-react'
import AvatarWithFrame from './AvatarWithFrame'

export function UserSettingsModal({ isOpen, onClose, currentUser, onUpdateUser }) {
  if (!isOpen || !currentUser) return null

  const [name, setName] = useState(currentUser.name || '')
  const [org, setOrg] = useState(currentUser.org || '')
  const [avatar, setAvatar] = useState(currentUser.avatar || '👨‍💻')
  const [customAvatarUrl, setCustomAvatarUrl] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const presetAvatars = ['👨‍💻', '👩‍💻', '⚡', '🚀', '💻', '🎯', '🎓', '🔍', '🔥', '📦', '🤖', '👾']

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    let updatedPassword = currentUser.password

    if (oldPassword || newPassword || confirmPassword) {
      if (currentUser.password && oldPassword !== currentUser.password) {
        setErrorMsg("Eski parol noto'g'ri kiritildi!")
        return
      }
      if (newPassword.length < 4) {
        setErrorMsg("Yangi parol kamida 4 ta belgidan iborat bo'lishi kerak!")
        return
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg("Yangi parollar bir-biriga mos kelmadi!")
        return
      }
      updatedPassword = newPassword
    }

    const updatedPayload = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      org: org.trim() || currentUser.org,
      avatar: customAvatarUrl.trim() || avatar,
      password: updatedPassword
    }

    // Try sync with backend API
    try {
      const endpoint = window.location.origin.includes('localhost') ? `http://localhost:5000/api/users/${currentUser.id}` : '/api/users'
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      })
      if (res.ok) {
        const data = await res.json()
        if (data.user && onUpdateUser) {
          onUpdateUser(data.user)
        }
      }
    } catch (err) {
      if (onUpdateUser) onUpdateUser(updatedPayload)
    }

    setSuccessMsg("Sozlamalar muvaffaqiyatli saqlandi!")
    setTimeout(() => {
      setSuccessMsg('')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Foydalanuvchi Sozlamalari
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Profilingiz ma'lumotlarini o'zgartiring, avatar yuklang yoki parolni yangilang.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-xs text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">

          {/* Avatar Selector / Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase">Avatar (Profil Rasmi)</label>
            <div className="flex items-center space-x-4">
              <AvatarWithFrame
                avatar={avatar}
                title={currentUser.title || 'Newbie'}
                size="lg"
              />

              <div className="flex-1 space-y-2">
                <label className="cursor-pointer inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Rasm yuklash (File)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
                <p className="text-[10px] text-slate-400">Yoki tayyor avatarlardan birini tanlang:</p>
              </div>
            </div>

            {/* Preset Emojis */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presetAvatars.map((e, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(e)}
                  className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center border transition-all ${
                    avatar === e
                      ? 'bg-blue-600/20 border-blue-500 scale-110'
                      : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:border-slate-300'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* User Name & Org */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Foydalanuvchi nomi (Username)</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">O'quv maskani / Tashkilot</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="masalan: TATU, SamDU yoki Maktab #1"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Parolni O'zgartirish</span>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Eski Parol</label>
              <input
                type="password"
                placeholder="Eski parolingiz"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Yangi Parol</label>
                <input
                  type="password"
                  placeholder="Yangi parol"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Yangi Parol Takrori</label>
                <input
                  type="password"
                  placeholder="Qayta kiriting"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Sozlamalarni Saqlash</span>
          </button>

        </form>

      </div>
    </div>
  )
}
