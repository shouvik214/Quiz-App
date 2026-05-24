import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenUtils, validation, authAPI } from '../services/authservice.js';
import { Brain, Eye, EyeOff, Sparkles, LogIn, UserPlus } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/';

  useEffect(() => {
    const token = tokenUtils.get();
    if (token) {
      if (tokenUtils.isValid(token)) navigate(redirectPath, { replace: true });
      else tokenUtils.clear();
    }
  }, [navigate, redirectPath]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validationErrors = validation.form(formData, isLogin);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      setLoading(false);
      return;
    }

    try {
      const { response, data } = isLogin
        ? await authAPI.login(formData.email, formData.password)
        : await authAPI.register(formData.username, formData.email, formData.password);

      if (response.ok && data.success) {
        tokenUtils.store(data.data.token, data.data.user);
        navigate(redirectPath, { replace: true });
      } else {
        setError(authAPI.parseError(data));
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-[-20%] left-[30%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-20%] right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 0 0 1px rgba(99,102,241,0.05), 0 25px 60px rgba(0,0,0,0.6)'
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-lg" />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">QuizAI</h1>
            <p className="text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--text-2)' }}>
              <Sparkles className="h-3 w-3 text-indigo-400" />
              AI-powered quiz generator
            </p>
          </div>

          {/* Toggle tabs */}
          <div
            className="flex rounded-xl p-1 mb-8"
            style={{ background: 'var(--bg-surface)' }}
          >
            <button
              id="login-tab"
              type="button"
              onClick={() => !isLogin && toggleMode()}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              style={isLogin
                ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 2px 12px rgba(99,102,241,0.4)' }
                : { color: 'var(--text-2)' }
              }
            >
              <LogIn className="h-4 w-4" /> Sign In
            </button>
            <button
              id="register-tab"
              type="button"
              onClick={() => isLogin && toggleMode()}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              style={!isLogin
                ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 2px 12px rgba(99,102,241,0.4)' }
                : { color: 'var(--text-2)' }
              }
            >
              <UserPlus className="h-4 w-4" /> Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm flex items-start gap-2"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
              >
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Username (register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-2)' }}>
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="your_username"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-1)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-2)' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-1)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-2)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-1)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: 'var(--text-3)' }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-bold mt-2 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(99,102,241,0.45)',
              }}
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                <>{isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                {isLogin ? 'Sign In' : 'Create Account'}</>
              )}
            </button>
          </form>

          {/* Footer toggle */}
          <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-3)' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleMode}
              className="font-semibold transition-colors"
              style={{ color: 'var(--accent)' }}
              onMouseEnter={e => e.target.style.color = '#818cf8'}
              onMouseLeave={e => e.target.style.color = 'var(--accent)'}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;