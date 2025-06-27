import { calculateScore } from '../utils/helpers'
import ResultCard from './ResultCard'

const QuizResults = ({ questions, userAnswers, onReset }) => {
  const score = calculateScore(questions, userAnswers)

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            {Math.round((score.correct / score.total) * 100)}%
          </span>
        </div>
        <p className="text-xl text-gray-600">
          You got {score.correct} out of {score.total} questions correct!
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <ResultCard
            key={index}
            question={question}
            questionIndex={index}
            userAnswer={userAnswers[index]}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onReset}
          className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Generate New Quiz
        </button>
      </div>
    </div>
  )
}

export default QuizResults
