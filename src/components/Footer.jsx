import { Wallet, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-950 border-t border-purple-800 text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ExpenseTracker
          </span>
        </div>
        
        {/* Copyright */}
        <p className="text-gray-300 text-sm">
          © {currentYear} ExpenseTracker. All Rights Reserved.
        </p>
        
        {/* Made with love */}
        <p className="text-gray-400 text-xs mt-2 flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for better finance management
        </p>
      </div>
    </footer>
  );
};

export default Footer;