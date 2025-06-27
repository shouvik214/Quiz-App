import axios from 'axios'

const BASE_URL = '/api/v1/questions';

export const generateQuestionsAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, formData)
    return response.data // contains { questions: [...] }
  } catch (error) {
    // Axios-specific error handling
    const message = error.response?.data?.error || 'Failed to generate questions'
    throw new Error(message)
  }
}
