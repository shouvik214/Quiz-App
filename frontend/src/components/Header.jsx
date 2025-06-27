import { Brain } from 'lucide-react'

const Header = () => (
  <div className="text-center mb-8">
    <div className="flex items-center justify-center mb-4">
      <Brain className="h-10 w-10 text-indigo-600 mr-3" />
      <h1 className="text-4xl font-bold text-gray-800">AI Question Generator</h1>
    </div>
    <p className="text-gray-600 text-lg">
      Generate custom quiz questions on any topic with AI
    </p>
  </div>
)

export default Header
