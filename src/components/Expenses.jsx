import React, { useState, useEffect } from 'react';
import supabase from '../config/index';
import { showSuccess, showError } from '../components/SweetAlert';
import { Trash2, Edit2, Calendar, RefreshCw, Loader } from 'lucide-react';

const Expenses = ({ refreshTrigger, onTotalUpdate }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const categories = [
    { value: "Food", label: "🍔 Food", icon: "🍔" },
    { value: "Travel", label: "✈️ Travel", icon: "✈️" },
    { value: "Shopping", label: "🛍️ Shopping", icon: "🛍️" },
    { value: "Bills", label: "💡 Bills", icon: "💡" },
    { value: "Entertainment", label: "🎬 Entertainment", icon: "🎬" },
    { value: "Health", label: "🏥 Health", icon: "🏥" },
    { value: "Education", label: "📚 Education", icon: "📚" },
    { value: "Other", label: "📌 Other", icon: "📌" }
  ];

  useEffect(() => {
    fetchExpenses();
  }, [refreshTrigger]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Please login to view expenses");
      }

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('uid', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setExpenses(data || []);
      
      if (onTotalUpdate) {
        onTotalUpdate();
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        const { error } = await supabase
          .from('expenses')
          .delete()
          .eq('id', id);

        if (error) throw error;

        showSuccess('Expense deleted successfully!');
        fetchExpenses();
        
        if (onTotalUpdate) {
          onTotalUpdate();
        }
      } catch (error) {
        showError(error.message);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({
      title: '',
      amount: '',
      category: '',
      date: ''
    });
  };

  const handleUpdate = async (id) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .update({
          title: editFormData.title,
          amount: parseFloat(editFormData.amount),
          category: editFormData.category,
          date: editFormData.date
        })
        .eq('id', id);

      if (error) throw error;

      showSuccess('Expense updated successfully!');
      setEditingId(null);
      fetchExpenses();
      
      if (onTotalUpdate) {
        onTotalUpdate();
      }
    } catch (error) {
      showError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : '📌';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-4">
      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={fetchExpenses}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Expenses Table */}
      {expenses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-purple-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expenses Yet</h3>
          <p className="text-gray-500">Click "Add New Expense" to get started!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border-2 border-purple-100 overflow-hidden">
          {/* Table Header - Amount heading moved slightly right */}
          <div className="bg-purple-50 border-b-2 border-purple-200">
            <div className="grid grid-cols-12 gap-4 px-4 py-3">
              <div className="col-span-5 font-semibold text-gray-700 text-left">Title & Category</div>
              <div className="col-span-3 font-semibold text-gray-700 text-left">Date</div>
              <div className="col-span-2 font-semibold text-gray-700 text-center pr-4">Amount</div>
              <div className="col-span-2 font-semibold text-gray-700 text-right">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {expenses.map((expense) => (
              <div key={expense.id}>
                {editingId === expense.id ? (
                  // Edit Mode
                  <div className="grid grid-cols-12 gap-4 px-4 py-4">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={editFormData.title}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none mb-2"
                        placeholder="Title"
                      />
                      <select
                        value={editFormData.category}
                        onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-3">
                      <input
                        type="date"
                        value={editFormData.date}
                        onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={editFormData.amount}
                        onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                        placeholder="Amount"
                        step="0.01"
                      />
                    </div>
                    <div className="col-span-2 flex gap-2 justify-end">
                      <button
                        onClick={() => handleUpdate(expense.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode - Amount list items remain left aligned
                  <div className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors">
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getCategoryIcon(expense.category)}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {expense.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {expense.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(expense.date)}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-lg font-bold text-purple-600">
                        Rs {parseFloat(expense.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;