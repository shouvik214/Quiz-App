import { CheckCircle, XCircle } from 'lucide-react'

const ResultCard = ({ question, questionIndex, userAnswer }) => {
  const correctAnswer = question.answer
  const isCorrect = userAnswer === correctAnswer

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid ${isCorrect ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
      }}
    >
      {/* Question header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <h3 className="text-sm font-semibold leading-relaxed flex-1" style={{ color: 'var(--text-1)' }}>
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold mr-2 flex-shrink-0"
            style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent)' }}
          >
            {questionIndex + 1}
          </span>
          {question.question}
        </h3>
        {isCorrect
          ? <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          : <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
        }
      </div>

      {/* Options */}
      <div className="space-y-2 ml-8">
        {Object.entries(question.options).map(([optionKey, optionValue]) => {
          const isCorrectOption = optionKey === correctAnswer
          const isWrongSelection = optionKey === userAnswer && !isCorrect

          let optionStyle = {
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-3)',
          }
          if (isCorrectOption) {
            optionStyle = {
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.4)',
              color: '#86efac',
            }
          } else if (isWrongSelection) {
            optionStyle = {
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#fca5a5',
            }
          }

          return (
            <div key={optionKey} className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm" style={optionStyle}>
              <span>
                <strong>{optionKey.toUpperCase()}.</strong> {optionValue}
              </span>
              {isCorrectOption && <span className="text-xs font-semibold ml-2 text-emerald-400">✓ Correct</span>}
              {isWrongSelection && <span className="text-xs font-semibold ml-2 text-red-400">✗ Your answer</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResultCard
