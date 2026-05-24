import { calculateScore } from '../utils/helpers'
import ResultCard from './ResultCard'
import { Trophy, RotateCcw } from 'lucide-react'

const QuizResults = ({ questions, userAnswers, onReset }) => {
  const score = calculateScore(questions, userAnswers)
  const pct = Math.round((score.correct / score.total) * 100)

  const scoreGradient =
    pct >= 80 ? 'from-emerald-400 to-green-500' :
    pct >= 50 ? 'from-amber-400 to-orange-500' :
                'from-red-400 to-rose-500'

  const scoreGlow =
    pct >= 80 ? 'rgba(34,197,94,0.3)' :
    pct >= 50 ? 'rgba(245,158,11,0.3)' :
                'rgba(239,68,68,0.3)'

  const message =
    pct >= 80 ? '🎉 Excellent work!' :
    pct >= 50 ? '👍 Good effort!' :
                '📚 Keep practicing!'

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Score hero */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Trophy className="h-6 w-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-white">Quiz Results</h2>
        </div>

        {/* Score ring */}
        <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
          <svg className="absolute inset-0" viewBox="0 0 128 128" fill="none">
            <circle cx="64" cy="64" r="54" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="64" cy="64" r="54"
              stroke="url(#scoreGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - pct / 100)}`}
              transform="rotate(-90 64 64)"
              style={{ filter: `drop-shadow(0 0 8px ${scoreGlow})` }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171'} />
                <stop offset="100%" stopColor={pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'} />
              </linearGradient>
            </defs>
          </svg>
          <span className={`text-3xl font-extrabold bg-gradient-to-b ${scoreGradient} bg-clip-text text-transparent`}>
            {pct}%
          </span>
        </div>

        <p className="text-lg font-semibold text-white">{message}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
          {score.correct} correct out of {score.total} questions
        </p>
      </div>

      {/* Result cards */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <ResultCard
            key={index}
            question={question}
            questionIndex={index}
            userAnswer={userAnswers[index]}
          />
        ))}
      </div>

      {/* New quiz button */}
      <div className="mt-10 flex justify-center">
        <button
          id="new-quiz-result-btn"
          onClick={onReset}
          className="flex items-center gap-2 px-10 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(99,102,241,0.45)',
          }}
        >
          <RotateCcw className="h-4 w-4" />
          Generate New Quiz
        </button>
      </div>
    </div>
  )
}

export default QuizResults
