import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const generateQuestionsAPI = async (formData) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    // Set authorization header
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const response = await axios.post(`${BASE_URL}/api/v1/questions`, formData, config);
    return response.data; // contains { questions: [...] }
  } catch (error) {
    // Axios-specific error handling
    const message = error.response?.data?.error || 'Failed to generate questions';
    throw new Error(message);
  }
};