import { XCircle } from 'lucide-react'

const ErrorMessage = ({ message }) => (
  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center">
      <XCircle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
  </div>
)

export default ErrorMessage
