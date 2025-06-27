const QuestionCard = ({ question, questionIndex, selectedAnswer, onAnswerSelect }) => (
  <div className="border-b border-gray-200 pb-6 last:border-b-0">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      {questionIndex + 1}. {question.question}
    </h3>
    <div className="space-y-2">
      {Object.entries(question.options).map(([key, value]) => (
        <label
          key={key}
          className={`flex items-center p-3 rounded-lg border cursor-pointer transition ${
            selectedAnswer === key
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name={`question-${questionIndex}`}
            value={key}
            checked={selectedAnswer === key}
            onChange={() => onAnswerSelect(questionIndex, key)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-3 text-gray-700">
            <strong>{key.toUpperCase()}.</strong> {value}
          </span>
        </label>
      ))}
    </div>
  </div>
)

export default QuestionCard
