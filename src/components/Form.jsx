import React, { useState } from 'react';
import supabase from '../config/index';
import { showSuccess, showError } from '../components/SweetAlert';
import { DollarSign, Calendar, Tag, FileText, PlusCircle } from 'lucide-react';

const Form = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: "Food", label: "🍔 Food & Dining", icon: "🍔" },
    { value: "Travel", label: "✈️ Travel", icon: "✈️" },
    { value: "Shopping", label: "🛍️ Shopping", icon: "🛍️" },
    { value: "Bills", label: "💡 Bills & Utilities", icon: "💡" },
    { value: "Entertainment", label: "🎬 Entertainment", icon: "🎬" },
    { value: "Health", label: "🏥 Health & Fitness", icon: "🏥" },
    { value: "Education", label: "📚 Education", icon: "📚" },
    { value: "Other", label: "📌 Other", icon: "📌" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Please login to add expenses");
      }

      const { error } = await supabase
        .from('expenses')
        .insert([{
          uid: user.id,
          title: formData.title,
          amount: parseFloat(formData.amount),
          category: formData.category,
          date: formData.date,
        }]);

      if (error) throw error;

      showSuccess('Expense added successfully!');

      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: ''
      });

      // Trigger refresh in parent component
      if (onExpenseAdded) {
        onExpenseAdded();
      }

    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add New Expense
        </h2>
        <p className="text-purple-100 text-sm mt-1">Fill in the details to track your expense</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Grocery shopping, Movie ticket, etc."
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            required
          />
        </div>

        {/* Amount Field with Rs */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-purple-600" />
            Amount (Rs)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rs</span>
            <input
              type="number"
              name="amount"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              step="0.01"
              required
            />
          </div>
        </div>

        {/* Category Field - Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-600" />
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all bg-white cursor-pointer"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding Expense...</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              <span>Add Expense</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;