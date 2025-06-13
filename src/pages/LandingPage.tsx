import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const LandingPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const dashboardUrl = process.env.NODE_ENV === 'production' 
        ? 'https://flowgen-dash.vercel.app/dashboard'
        : 'http://localhost:5173/dashboard';
      window.location.href = dashboardUrl;
    }
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!isLogin && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        });
      }

      // Redirect will happen automatically via useEffect
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred';
      setErrors({ submit: message });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-black to-gray-800 border-2 border-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-400/20">
                <Sparkles className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Welcome to FlowGen
            </h1>
            <p className="mt-2 text-gray-300">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Auth Card */}
          <div className="backdrop-blur-sm bg-black/80 border border-cyan-400/30 rounded-2xl shadow-xl shadow-cyan-400/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields (Signup only) */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              {/* Username (Signup only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-3 py-2 bg-gray-900 border text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors ${
                        errors.username ? 'border-red-400' : 'border-gray-700'
                      }`}
                      placeholder="johndoe"
                    />
                  </div>
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-3 py-2 bg-gray-900 border text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors ${
                      errors.email ? 'border-red-400' : 'border-gray-700'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-2 bg-gray-900 border text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors ${
                      errors.password ? 'border-red-400' : 'border-gray-700'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-cyan-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-cyan-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-900/50 border border-red-400/50 rounded-lg p-3">
                  <p className="text-sm text-red-400">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-black to-gray-800 border-2 border-cyan-400 text-cyan-400 py-2 px-4 rounded-lg font-medium hover:bg-cyan-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="small" className="mr-2" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={switchMode}
                  className="ml-1 font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-black border border-cyan-400/50 rounded-lg flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-xs text-gray-400">Secure</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-black border border-cyan-400/50 rounded-lg flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-xs text-gray-400">Fast</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-black border border-cyan-400/50 rounded-lg flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-xs text-gray-400">Beautiful</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;