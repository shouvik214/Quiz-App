import { XCircle } from 'lucide-react'

const ErrorMessage = ({ message }) => (
  <div
    className="mt-4 px-4 py-3 rounded-xl flex items-start gap-3 text-sm"
    style={{
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.25)',
      color: '#fca5a5',
    }}
  >
    <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-400" />
    <p>{message}</p>
  </div>
)

export default ErrorMessage
