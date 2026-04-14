import { Menu, LogOut, User, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../config/index";
import { showSuccess, showError } from "./SweetAlert";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('expense_users')
          .select('username')
          .eq('uid', user.id)
          .single();
        
        if (userData) {
          setUserName(userData.username);
        }
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await showSuccess("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-purple-950 border-b border-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section - Left Side */}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ExpenseTracker
              </h1>
              <p className="text-xs text-purple-300 hidden sm:block">Track your finances</p>
            </div>
          </Link>

          {/* Desktop Menu - Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* User Info */}
            {userName && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-purple-700">
                <User className="w-4 h-4 text-purple-300" />
                <span className="text-sm font-medium text-white">
                  Welcome, {userName}
                </span>
              </div>
            )}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-purple-300 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-800">
            <div className="flex flex-col gap-3">
              {/* User Info Mobile */}
              {userName && (
                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg border border-purple-700">
                  <User className="w-4 h-4 text-purple-300" />
                  <span className="text-sm font-medium text-white">
                    Welcome, {userName}
                  </span>
                </div>
              )}
              
              {/* Logout Button Mobile */}
              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;