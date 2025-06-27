import axios from 'axios'

export const generateQuestionsAPI = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/questions', formData)
    return response.data // contains { questions: [...] }
  } catch (error) {
    // Axios-specific error handling
    const message = error.response?.data?.error || 'Failed to generate questions'
    throw new Error(message)
  }
}
