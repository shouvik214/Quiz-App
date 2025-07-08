import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_DEV_URL

export const generateQuestionsAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/questions`, formData)
    return response.data // contains { questions: [...] }
  } catch (error) {
    // Axios-specific error handling
    const message = error.response?.data?.error || 'Failed to generate questions'
    throw new Error(message)
  }
}

export const loginUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, formData);
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, formData);
  return res.data;
};
