import React, { useState } from 'react'
import {
  MessageSquare,
  Plus,
  ThumbsUp,
  MessageCircle,
  Tag,
  User,
  Clock,
  Send,
  Sparkles,
  TrendingUp,
  Search,
  X
} from 'lucide-react'
import AvatarWithFrame from './AvatarWithFrame'

export function DiscussionsView({ language = 'uz' }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Segment Tree (Segmentlar daraxti) masalalarida lazy propagation usuli',
      author: 'Asadbek_Olimov',
      badge: 'Grandmaster',
      badgeColor: 'text-red-500 bg-red-500/10 border-red-500/20',
      time: '2 soat oldin',
      likes: 42,
      commentsCount: 15,
      tag: 'Tutorials',
      content: `Salom do'stlar! Ko'pchilik Segment Tree mavzusida oraliqni yangilash (range updates) bilan bog'liq qiyinchiliklarga duch keladi. Bugun Lazy Propagation konsepsiyasini sodda misollar bilan tushuntirib beraman...`
    },
    {
      id: 2,
      title: 'C++23 va PyPy3 o\'rtasidagi vaqt samaradorligi taqqoslovi (Benchmark)',
      author: 'DevTeam',
      badge: 'Admin',
      badgeColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      time: '1 kun oldin',
      likes: 89,
      commentsCount: 34,
      tag: 'Announcement',
      content: `RoboContest tizimida o'rnatilgan yangi PyPy3 va GCC C++23 komplyatorlari o'rtasidagi xotira va vaqt ishlatish ko'rsatkichlari tahlili.`
    },
    {
      id: 3,
      title: 'Deykstra va Floyd-Warshall algoritmlarining farqi nimada?',
      author: 'Sardor_Dev',
      badge: 'Specialist',
      badgeColor: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      time: '3 kun oldin',
      likes: 18,
      commentsCount: 9,
      tag: 'Questions',
      content: `Graf masalalarida eng qisqa yo'lni topish uchun qachon Deykstra va qachon Floyd-Warshall ishlatgan ma'qul? Salbiy vaznli qirralar bo'lsa-chi?`
    }
  ])

  const [filterTag, setFilterTag] = useState('Barchasi')
  const [newPostModal, setNewPostModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Tutorials')
  const [newContent, setNewContent] = useState('')

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const createdPost = {
      id: Date.now(),
      title: newTitle,
      author: 'Me (Mehmon)',
      badge: 'Pupil',
      badgeColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
      time: 'Hozirgina',
      likes: 1,
      commentsCount: 0,
      tag: newCategory,
      content: newContent
    }

    setPosts([createdPost, ...posts])
    setNewPostModal(false)
    setNewTitle('')
    setNewContent('')
  }

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  const tagsList = ['Barchasi', 'Tutorials', 'Questions', 'Announcement', 'General']

  const filteredPosts = posts.filter(p => filterTag === 'Barchasi' || p.tag === filterTag)

  return (
    <div className="space-y-6 py-4">

      {/* Discussion Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-blue-600 dark:text-blue-400 stroke-[2.5]" />
            <span>Muhokamalar va Maqolalar</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tajriba ulashing, savollar bering va algoritmik usullarni boshqa dasturchilar bilan muhokama qiling.
          </p>
        </div>

        <button
          onClick={() => setNewPostModal(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Yangi Maqola / Savol</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {tagsList.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AvatarWithFrame
                  avatar={post.avatar || '👨‍💻'}
                  title={post.badge || 'Newbie'}
                  size="sm"
                />
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {post.author}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${post.badgeColor}`}>
                  {post.badge}
                </span>
                <span className="text-xs text-slate-400">• {post.time}</span>
              </div>

              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {post.tag}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors cursor-pointer">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {post.content}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center space-x-6 text-xs text-slate-500">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-1.5 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} Layk</span>
              </button>

              <div className="flex items-center space-x-1.5 font-bold">
                <MessageCircle className="w-4 h-4" />
                <span>{post.commentsCount} Izohlar</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Creation Modal */}
      {newPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreatePost} className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Yangi Maqola yoki Savol Chop Etish</h3>
              <button type="button" onClick={() => setNewPostModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mavzu Nomi (Sarlavha)</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Graf masalalarida BFS vs DFS..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategoriya</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold border border-transparent focus:border-blue-500 focus:outline-none"
                >
                  <option value="Tutorials">Tutorials / Qo'llanma</option>
                  <option value="Questions">Questions / Savol</option>
                  <option value="General">General / Umumiy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Matn Mazmuni</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Fikringizni yoki savolingizni batafsil yozing..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm border border-transparent focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setNewPostModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-600/20"
              >
                Chop etish
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}
