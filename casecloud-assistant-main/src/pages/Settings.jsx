import React, { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';
import axios from 'axios';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    department: '',
    position: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfileForm({
        department: user.department || '',
        position: user.position || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const response = await axios.put('/api/auth/profile', {
        userId: user._id,
        ...profileForm
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      setSuccess(true);
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500">Manage your account and application preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl shadow-elegant overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
            </div>
            <nav className="p-3">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3" />
                  <span>Profile</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-elegant">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
                  <p className="text-sm text-gray-500">Update your professional information</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={profileForm.department}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Department</option>
                          <option value="Legal Department">Legal Department</option>
                          <option value="Labor Department">Labor Department</option>
                          <option value="Employment Department">Employment Department</option>
                          <option value="Skill Development">Skill Development</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input
                          id="position"
                          name="position"
                          type="text"
                          value={profileForm.position}
                          onChange={handleChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your position"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={profileForm.phoneNumber}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
                        disabled={loading}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                      {success && (
                        <div className="mt-2 text-sm text-green-600">
                          Profile updated successfully!
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;