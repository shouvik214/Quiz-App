import { useState } from 'react'
import Header from './Header'
import QuestionForm from './QuestionForm'
import QuizDisplay from './QuizDisplay'
import QuizResults from './QuizResults'
import ErrorMessage from './ErrorMessage'
import { generateQuestionsAPI } from '../services/api'

const QuestionGenerator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    count: 5,
    level: 'medium',
  })
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userAnswers, setUserAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'count' ? parseInt(value) : value,
    }))
  }

  const generateQuestions = async () => {
    if (!formData.topic.trim()) {
      setError('Topic is required')
      return
    }

    setLoading(true)
    setError('')
    setQuestions([])
    setUserAnswers({})
    setShowResults(false)

    try {
      const data = await generateQuestionsAPI(formData)
      setQuestions(data.questions)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption,
    }))
  }

  const submitQuiz = () => setShowResults(true)

  const resetQuiz = () => {
    setQuestions([])
    setUserAnswers({})
    setShowResults(false)
    setError('')
    setFormData({
      topic: '',
      count: 5,
      level: 'medium',
    })
  }

  return (
    <>
      <Header />
      {questions.length === 0 && (
        <>
          <QuestionForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={generateQuestions}
            loading={loading}
          />
          {error && <ErrorMessage message={error} />}
        </>
      )}

      {questions.length > 0 && !showResults && (
        <QuizDisplay
          questions={questions}
          formData={formData}
          userAnswers={userAnswers}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={submitQuiz}
          onReset={resetQuiz}
        />
      )}

      {showResults && (
        <QuizResults
          questions={questions}
          userAnswers={userAnswers}
          onReset={resetQuiz}
        />
      )}
    </>
  )
}

export default QuestionGenerator
