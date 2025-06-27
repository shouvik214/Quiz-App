export const getDifficultyColor = (level) => {
  switch (level) {
    case 'easy': return 'text-green-600 bg-green-100'
    case 'medium': return 'text-yellow-600 bg-yellow-100'
    case 'hard': return 'text-red-600 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export const calculateScore = (questions, userAnswers) => {
  let correct = 0
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) correct++
  })
  return { correct, total: questions.length }
}
