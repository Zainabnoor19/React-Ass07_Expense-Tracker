import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../config/index';
import { showSuccess, showError, showLoading, closeLoading } from '../components/SweetAlert';
import { Wallet, TrendingUp, Shield, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    showLoading('Creating account...');

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase
        .from('expense_users')
        .insert([{
          uid: authData.user.id,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
        }]);

      if (dbError) throw dbError;

      closeLoading();
      await showSuccess('Signup successful!');
      navigate('/login');

    } catch (error) {
      closeLoading();
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-950 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl mb-4">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ExpenseTracker
            </h1>
            <p className="text-gray-300 mt-2">Track your finances smartly</p>
          </div>

          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Username
              </label>
              <input 
                type="text" 
                name="username" 
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required 
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required 
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                required 
              />
            </div>

            {/* Password Field with Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all pr-12"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?
              <Link 
                to="/login" 
                className="text-purple-400 hover:text-purple-300 ml-1 font-medium transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-gray-400 mt-6">
            By signing up, you agree to our{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;