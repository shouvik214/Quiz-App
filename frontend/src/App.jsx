// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionGenerator from './components/QuestionGenerator';
import Auth from './pages/Auth';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      {/* You can also keep both routes for backward compatibility */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <QuestionGenerator />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;