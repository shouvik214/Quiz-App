const QuestionCard = ({ question, questionIndex, selectedAnswer, onAnswerSelect }) => (
  <div
    className="pb-6 last:pb-0"
    style={{ borderBottom: '1px solid var(--border)' }}
  >
    <h3 className="text-base font-semibold mb-4 leading-relaxed" style={{ color: 'var(--text-1)' }}>
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold mr-3 flex-shrink-0"
        style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent)' }}
      >
        {questionIndex + 1}
      </span>
      {question.question}
    </h3>

    <div className="space-y-2.5 ml-10">
      {Object.entries(question.options).map(([key, value]) => {
        const isSelected = selectedAnswer === key
        return (
          <label
            key={key}
            className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200"
            style={{
              background: isSelected ? 'rgba(99,102,241,0.12)' : 'var(--bg-surface)',
              border: isSelected ? '1px solid rgba(99,102,241,0.6)' : '1px solid var(--border)',
              boxShadow: isSelected ? '0 0 0 1px rgba(99,102,241,0.2)' : 'none',
            }}
            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}
            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            {/* Custom radio */}
            <div
              className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200"
              style={{
                borderColor: isSelected ? 'var(--accent)' : 'var(--text-3)',
              }}
            >
              {isSelected && (
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
              )}
            </div>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={key}
              checked={isSelected}
              onChange={() => onAnswerSelect(questionIndex, key)}
              className="sr-only"
            />

            <span className="text-sm" style={{ color: isSelected ? 'var(--text-1)' : 'var(--text-2)' }}>
              <strong style={{ color: isSelected ? 'var(--accent)' : 'var(--text-3)' }}>
                {key.toUpperCase()}.
              </strong>{' '}
              {value}
            </span>
          </label>
        )
      })}
    </div>
  </div>
)

export default QuestionCard
