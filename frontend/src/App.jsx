import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionGenerator from './components/QuestionGenerator';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

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




