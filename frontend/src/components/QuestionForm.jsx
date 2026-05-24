import { BookOpen, Loader2, Zap } from 'lucide-react'

const inputStyle = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  color: 'var(--text-1)',
}

const QuestionForm = ({ formData, onInputChange, onSubmit, loading }) => (
  <div
    className="rounded-2xl p-8 mb-8"
    style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
    }}
  >
    <div className="space-y-6">
      {/* Topic input */}
      <div>
        <label htmlFor="topic" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-2)' }}>
          Topic
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={onInputChange}
          placeholder="e.g., JavaScript, World History, Biology…"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--border-glow)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      {/* Count + Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="count" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-2)' }}>
            Number of Questions
          </label>
          <select
            id="count"
            name="count"
            value={formData.count}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 cursor-pointer"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--border-glow)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          >
            {[3, 5, 8, 10, 15, 20].map(num => (
              <option key={num} value={num} style={{ background: 'var(--bg-card)' }}>
                {num} questions
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="level" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-2)' }}>
            Difficulty Level
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={onInputChange}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 cursor-pointer"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--border-glow)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          >
            <option value="easy" style={{ background: 'var(--bg-card)' }}>🟢 Easy</option>
            <option value="medium" style={{ background: 'var(--bg-card)' }}>🟡 Medium</option>
            <option value="hard" style={{ background: 'var(--bg-card)' }}>🔴 Hard</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        id="generate-btn"
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          boxShadow: loading ? 'none' : '0 4px 24px rgba(99,102,241,0.45)',
        }}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating Questions…
          </>
        ) : (
          <>
            <Zap className="h-5 w-5" />
            Generate Questions
          </>
        )}
      </button>
    </div>
  </div>
)

export default QuestionForm
