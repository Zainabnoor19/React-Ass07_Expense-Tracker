import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/index';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Supabase session clear karega
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // Session clear hone ke baad Login page par redirect
        console.log("Logged out successfully");
        navigate('/login');
      } catch (error) {
        console.error("Error logging out:", error.message);
        navigate('/login'); // Error ki surat mein bhi wapas bhej dena behtar hai
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-slate-600 font-medium">Logging you out safely...</p>
      </div>
    </div>
  );
};

export default Logout;