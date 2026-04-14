import { Loader } from "lucide-react";

const Button = ({ 
  text, 
  onClick, 
  loading, 
  type = "button",
  fullWidth = false,
  variant = "primary" // primary, secondary, outline
}) => {
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    outline: "bg-transparent hover:bg-white/10 text-purple-400 border border-purple-500 hover:text-purple-300"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center justify-center gap-2 px-5 py-2.5 
        rounded-lg font-semibold transition-all duration-200
        transform hover:scale-[1.02] active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {loading && <Loader size={18} className="animate-spin" />}
      {text}
    </button>
  );
};

export default Button; // Make sure this line exists