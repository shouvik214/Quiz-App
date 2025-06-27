import { CheckCircle, XCircle } from 'lucide-react'

const ResultCard = ({ question, questionIndex, userAnswer }) => {
  const correctAnswer = question.answer
  const isCorrect = userAnswer === correctAnswer

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">
          {questionIndex + 1}. {question.question}
        </h3>
        {isCorrect ? (
          <CheckCircle className="h-6 w-6 text-green-500 ml-4 flex-shrink-0" />
        ) : (
          <XCircle className="h-6 w-6 text-red-500 ml-4 flex-shrink-0" />
        )}
      </div>

      <div className="space-y-2">
        {Object.entries(question.options).map(([optionKey, optionValue]) => {
          let optionClass = 'border-gray-200 text-gray-700'

          if (optionKey === correctAnswer) {
            optionClass = 'border-green-500 bg-green-50 text-green-800'
          } else if (optionKey === userAnswer && !isCorrect) {
            optionClass = 'border-red-500 bg-red-50 text-red-800'
          }

          return (
            <div key={optionKey} className={`p-3 rounded-lg border ${optionClass}`}>
              <strong>{optionKey.toUpperCase()}.</strong> {optionValue}
              {optionKey === correctAnswer && (
                <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
              )}
              {optionKey === userAnswer && !isCorrect && (
                <span className="ml-2 text-red-600 font-semibold">✗ Your answer</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResultCard
