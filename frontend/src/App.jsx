import React from 'react'
import QuestionGenerator from './components/QuestionGenerator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <QuestionGenerator />
      </div>
    </div>
  )
}

export default App

