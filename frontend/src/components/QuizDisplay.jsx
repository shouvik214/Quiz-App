import QuestionCard from './QuestionCard'
import { getDifficultyColor } from '../utils/helpers'

const QuizDisplay = ({
  questions,
  formData,
  userAnswers,
  onAnswerSelect,
  onSubmit,
  onReset
}) => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Quiz: {formData.topic}</h2>
        <div className="flex items-center mt-2 space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(formData.level)}`}>
            {formData.level.charAt(0).toUpperCase() + formData.level.slice(1)}
          </span>
          <span className="text-gray-600">{questions.length} questions</span>
        </div>
      </div>
      <button
        onClick={onReset}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
      >
        New Quiz
      </button>
    </div>

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

    <div className="mt-8 flex justify-center">
      <button
        onClick={onSubmit}
        disabled={Object.keys(userAnswers).length !== questions.length}
        className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Quiz
      </button>
    </div>
  </div>
)

export default QuizDisplay
