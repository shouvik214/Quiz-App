// AuthService.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_PROD_URL;

// Token utilities
export const tokenUtils = {
  // Check if token is valid
  isValid: (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  // Get stored token
  get: () => localStorage.getItem('authToken'),

  // Store token and user data
  store: (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Clear auth data
  clear: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

// Validation functions
export const validation = {
  // Validate username
  username: (username) => {
    const errors = [];
    
    if (!username || username.length < 3) {
      errors.push("Username must be at least 3 characters");
    }
    if (username && username.length > 20) {
      errors.push("Username cannot exceed 20 characters");
    }
    if (username && !/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push("Username can only contain letters, numbers, and underscores");
    }
    
    return errors;
  },

  // Validate email
  email: (email) => {
    const errors = [];
    
    if (!email) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Please enter a valid email address");
    }
    
    return errors;
  },

  // Validate password
  password: (password, isRegister = false) => {
    const errors = [];
    
    if (!password) {
      errors.push("Password is required");
    } else if (isRegister && password.length < 6) {
      errors.push("Password must be at least 6 characters");
    } else if (isRegister && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.push("Password must contain uppercase, lowercase, and number");
    }
    
    return errors;
  },

  // Validate entire form
  form: (formData, isLogin) => {
    const errors = [];
    
    // Username validation (only for registration)
    if (!isLogin) {
      errors.push(...validation.username(formData.username));
    }
    
    // Email validation
    errors.push(...validation.email(formData.email));
    
    // Password validation
    errors.push(...validation.password(formData.password, !isLogin));
    
    return errors;
  }
};

// API service
export const authAPI = {
  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password
      }),
    });

    const data = await response.json();
    return { response, data };
  },

  // Register user
  register: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.trim(),
        email: email.trim(),
        password: password
      }),
    });

    const data = await response.json();
    return { response, data };
  },

  // Parse error messages from API response
  parseError: (data) => {
    if (data.errors && Array.isArray(data.errors)) {
      return data.errors.map(err => err.message || err).join(', ');
    } else if (data.message) {
      return data.message;
    } else if (data.error) {
      return data.error;
    }
    return 'Something went wrong';
  }
};