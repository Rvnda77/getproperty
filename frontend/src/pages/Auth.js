import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../store/slices/authSlice';
import '../styles/Auth.css';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    userType: 'tenant', // owner or tenant
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          })
        ).unwrap();
      } else {
        await dispatch(
          registerUser({
            email: formData.email,
            password: formData.password,
            displayName: formData.displayName,
            userType: formData.userType,
          })
        ).unwrap();
      }
      navigate('/');
    } catch (err) {
      setError(err || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData({
      email: '',
      password: '',
      displayName: '',
      userType: 'tenant',
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h1>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="displayName">Full Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="userType">I am a...</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="tenant">Tenant/Buyer</option>
                  <option value="owner">Property Owner</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button
              type="button"
              onClick={toggleMode}
              className="toggle-button"
              disabled={loading}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

