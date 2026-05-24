import { getDifficultyColor, getDifficultyDot } from '../utils/helpers'
import QuestionCard from './QuestionCard'
import { RotateCcw, CheckSquare } from 'lucide-react'

const QuizDisplay = ({ questions, formData, userAnswers, onAnswerSelect, onSubmit, onReset }) => {
  const answered = Object.keys(userAnswers).length
  const total = questions.length
  const progress = Math.round((answered / total) * 100)

  return (
    <div
      className="rounded-2xl p-8"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Quiz: <span style={{ color: 'var(--accent)' }}>{formData.topic}</span>
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(formData.level)}`}>
              {getDifficultyDot(formData.level)} {formData.level.charAt(0).toUpperCase() + formData.level.slice(1)}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-2)' }}>{total} questions</span>
          </div>
        </div>

        <button
          id="new-quiz-btn"
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--border-glow)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <RotateCcw className="h-4 w-4" /> New Quiz
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-2)' }}>
          <span>{answered} / {total} answered</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {questions.map((question, qIndex) => (
          <QuestionCard
            key={qIndex}
            question={question}
            questionIndex={qIndex}
            selectedAnswer={userAnswers[qIndex]}
            onAnswerSelect={onAnswerSelect}
          />
        ))}
      </div>

      {/* Submit */}
      <div className="mt-10 flex justify-center">
        <button
          id="submit-quiz-btn"
          onClick={onSubmit}
          disabled={answered !== total}
          className="flex items-center gap-2 px-10 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: answered === total ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'var(--bg-surface)',
            color: '#fff',
            border: '1px solid transparent',
            boxShadow: answered === total ? '0 4px 20px rgba(34,197,94,0.35)' : 'none',
          }}
        >
          <CheckSquare className="h-5 w-5" />
          Submit Quiz
          {answered < total && (
            <span className="ml-1 text-xs font-normal opacity-70">({total - answered} remaining)</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default QuizDisplay
