export const getDifficultyColor = (level) => {
  switch (level) {
    case 'easy':   return 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20'
    case 'medium': return 'text-amber-400   bg-amber-400/10   border border-amber-400/20'
    case 'hard':   return 'text-red-400     bg-red-400/10     border border-red-400/20'
    default:       return 'text-slate-400   bg-slate-400/10   border border-slate-400/20'
  }
}

export const getDifficultyDot = (level) => {
  switch (level) {
    case 'easy':   return '🟢'
    case 'medium': return '🟡'
    case 'hard':   return '🔴'
    default:       return '⚪'
  }
}

export const calculateScore = (questions, userAnswers) => {
  let correct = 0
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) correct++
  })
  return { correct, total: questions.length }
}
