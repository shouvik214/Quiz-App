import { Brain, LogOut, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { tokenUtils } from '../services/authservice'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    tokenUtils.clear()
    navigate('/login')
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-md" />
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight tracking-tight">QuizAI</h1>
            <p className="text-xs text-indigo-400 font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> AI-powered quizzes
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          id="logout-btn"
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Page title */}
      <div className="mt-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
          AI Question Generator
        </h2>
        <p className="mt-3 text-slate-400 text-lg max-w-lg mx-auto">
          Generate custom quiz questions on any topic with the power of AI
        </p>
      </div>
    </div>
  )
}

export default Header
