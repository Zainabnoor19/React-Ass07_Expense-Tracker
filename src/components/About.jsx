import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Shield, BarChart3, Target, Clock, Award, Users, Sparkles, PlusCircle, List } from 'lucide-react';
import supabase from '../config/index';
import Form from './Form';
import Expenses from './Expenses';

const About = () => {
  const [showForm, setShowForm] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);
  const [refreshExpenses, setRefreshExpenses] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenseCount, setExpenseCount] = useState(0);

  const features = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Budget Goals",
      description: "Set monthly budgets and receive alerts when接近 your spending limits."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Real-time Tracking",
      description: "Track your expenses in real-time and never miss a transaction."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Banking",
      description: "Bank-level security to keep your financial data safe."
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Rewards Program",
      description: "Earn rewards for maintaining good financial habits."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Multi-User Support",
      description: "Add family members and manage shared expenses."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Transactions" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.8", label: "Rating" }
  ];

  // Fetch total amount on component mount and when refreshExpenses changes
  useEffect(() => {
    fetchTotalAmount();
  }, [refreshExpenses]);

  const fetchTotalAmount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('expenses')
        .select('amount')
        .eq('uid', user.id);

      if (error) throw error;
      
      const total = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      setTotalAmount(total);
      setExpenseCount(data.length);
    } catch (error) {
      console.error("Error fetching total:", error);
    }
  };

  const handleExpenseAdded = () => {
    setRefreshExpenses(prev => prev + 1);
    fetchTotalAmount(); // Refresh total amount immediately
    setShowForm(false);
    setShowExpenses(true);
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span className="text-xs text-purple-700 font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Smart Way to Track Your Expenses
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Join thousands of users who trust ExpenseTracker for managing their finances efficiently.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white rounded-lg border-2 border-purple-200 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-5 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <div className="text-purple-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) setShowExpenses(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            {showForm ? "Hide Expense Form" : "Add New Expense"}
          </button>
          
          <button
            onClick={() => setShowExpenses(!showExpenses)}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
          >
            <List className="w-5 h-5" />
            {showExpenses ? "Hide Expenses" : "Show My Expenses"}
          </button>
        </div>

        {/* Total Amount Section - Below Buttons with Rs */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-5 mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Total Expenses</h3>
              <p className="text-purple-100 text-sm">
                {expenseCount} transaction{expenseCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-white">
                Rs {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Conditional Form Display */}
        {showForm && (
          <div className="mt-4 animate-fadeIn">
            <Form onExpenseAdded={handleExpenseAdded} />
          </div>
        )}

        {/* Conditional Expenses Display */}
        {showExpenses && (
          <div className="mt-8 animate-fadeIn">
            <Expenses refreshTrigger={refreshExpenses} onTotalUpdate={fetchTotalAmount} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;