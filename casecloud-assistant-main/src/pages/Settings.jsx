import React, { useState, useEffect } from 'react';
import { 
  User, Save, Bell, Lock, Shield, 
  Monitor, HelpCircle, ChevronRight, Globe 
} from 'lucide-react';
import axios from 'axios';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    phoneNumber: '',
    language: 'English'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    caseUpdates: true,
    documentUploads: false,
    announcements: true
  });
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: true
  });
  const [loading, setLoading] = useState({
    profile: false,
    notifications: false,
    security: false
  });
  const [success, setSuccess] = useState({
    profile: false,
    notifications: false,
    security: false
  });
  const [error, setError] = useState({
    profile: '',
    notifications: '',
    security: ''
  });

  // Load user data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
          // First set from local storage for immediate display
          setProfileForm({
            name: user.fullName ||  user.name || '',
            email: user.email || '',
            department: user.department || '',
            position: user.position || '',
            phoneNumber: user.phoneNumber || '',
            language: 'English'
          });

          // Then fetch fresh data from server
          const response = await axios.get(`http://localhost:5000/api/auth/profile/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.user) {
            const serverData = response.data.user;
            setProfileForm({
              name: serverData.fullName || user.fullName || '',
              email: serverData.email || user.email || '',
              department: serverData.department || user.department || '',
              position: serverData.position || user.position || '',
              phoneNumber: serverData.phoneNumber || user.phoneNumber || '',
              language: 'English'
            });
            
            // Update local storage with fresh data
            localStorage.setItem('user', JSON.stringify({
              ...user,
              ...serverData
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load profile data:", err);
        // Continue with local storage data if API fails
      }
    };

    loadProfileData();
  }, []);

  // Profile handlers
  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, profile: true });
    setSuccess({ ...success, profile: false });
    setError({ ...error, profile: '' });
    
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const response = await axios.put('http://localhost:5000/api/auth/profile', {
        userId: user._id,
        department: profileForm.department,
        position: profileForm.position,
        phoneNumber: profileForm.phoneNumber
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update local storage with new data
      const updatedUser = {
        ...user,
        department: response.data.user.department || user.department,
        position: response.data.user.position || user.position,
        phoneNumber: response.data.user.phoneNumber || user.phoneNumber
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update form state with the returned data
      setProfileForm(prev => ({
        ...prev,
        department: response.data.user.department || prev.department,
        position: response.data.user.position || prev.position,
        phoneNumber: response.data.user.phoneNumber || prev.phoneNumber
      }));
      
      setSuccess({ ...success, profile: true });
      setTimeout(() => setSuccess({ ...success, profile: false }), 3000);
    } catch (err) {
      setError({ 
        ...error, 
        profile: err.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  // Notification handlers
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, notifications: true });
    setSuccess({ ...success, notifications: false });
    setError({ ...error, notifications: '' });
    
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      await axios.put('/api/auth/notifications', {
        userId: user._id,
        ...notificationSettings
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess({ ...success, notifications: true });
      setTimeout(() => setSuccess({ ...success, notifications: false }), 3000);
    } catch (err) {
      setError({ 
        ...error, 
        notifications: err.response?.data?.message || 'Failed to update notification settings' 
      });
    } finally {
      setLoading({ ...loading, notifications: false });
    }
  };

  // Security handlers
  const handleSecurityChange = (e) => {
    setSecurityForm({
      ...securityForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, security: true });
    setSuccess({ ...success, security: false });
    setError({ ...error, security: '' });
    
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      await axios.put('/api/auth/security', {
        userId: user._id,
        currentPassword: securityForm.currentPassword,
        newPassword: securityForm.newPassword,
        twoFactorAuth: securityForm.twoFactorAuth
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess({ ...success, security: true });
      setTimeout(() => setSuccess({ ...success, security: false }), 3000);
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorAuth: securityForm.twoFactorAuth
      });
    } catch (err) {
      setError({ 
        ...error, 
        security: err.response?.data?.message || 'Failed to update security settings' 
      });
    } finally {
      setLoading({ ...loading, security: false });
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
          {/* Settings Navigation */}
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
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                  activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3" />
                  <span>Notifications</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                  activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Lock className="w-5 h-5 mr-3" />
                  <span>Security</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                  activeTab === 'privacy' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-3" />
                  <span>Privacy</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                  activeTab === 'appearance' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <Monitor className="w-5 h-5 mr-3" />
                  <span>Appearance</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => setActiveTab('help')}
                className={`flex items-center justify-between w-full p-3 rounded-lg text-left ${
                  activeTab === 'help' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-3" />
                  <span>Help & Support</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-elegant">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
                  <p className="text-sm text-gray-500">Manage your personal information</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="mb-8 flex items-center">
                      <div className="relative mr-6">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                        {profileForm.name ? 
                profileForm.name.split(' ').map(n => n[0]).join('') : 
                'US' /* Default initials if name not available */}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{profileForm.name || 'Your Name'}</h3>
                        <p className="text-sm text-gray-500">{profileForm.department || 'No department specified'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={profileForm.name||''}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                          readOnly
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                          Department
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={profileForm.department}
                          onChange={handleProfileChange}
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
                          onChange={handleProfileChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={profileForm.position || "Your position"}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={profileForm.phoneNumber}
                          onChange={handleProfileChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={profileForm.phoneNumber || "+91 9876543210"}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Language
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            id="language"
                            name="language"
                            value={profileForm.language}
                            onChange={handleProfileChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Gujarati">Gujarati</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
                        disabled={loading.profile}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        <span>{loading.profile ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                      {success.profile && (
                        <div className="mt-2 text-sm text-green-600">
                          Profile updated successfully!
                        </div>
                      )}
                      {error.profile && (
                        <div className="mt-2 text-sm text-red-600">
                          {error.profile}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-elegant">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                  <p className="text-sm text-gray-500">Manage your notification preferences</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email updates for important events</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.email}
                            onChange={() => handleNotificationChange('email')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Receive text messages for critical updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.sms}
                            onChange={() => handleNotificationChange('sms')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-900">Case Updates</h3>
                          <p className="text-sm text-gray-500">Notifications for new case assignments and status changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.caseUpdates}
                            onChange={() => handleNotificationChange('caseUpdates')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-900">Document Uploads</h3>
                          <p className="text-sm text-gray-500">Notifications when new documents are uploaded</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.documentUploads}
                            onChange={() => handleNotificationChange('documentUploads')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">System Announcements</h3>
                          <p className="text-sm text-gray-500">Important system updates and announcements</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.announcements}
                            onChange={() => handleNotificationChange('announcements')}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
                        disabled={loading.notifications}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        <span>{loading.notifications ? 'Saving...' : 'Save Preferences'}</span>
                      </button>
                      {success.notifications && (
                        <div className="mt-2 text-sm text-green-600">
                          Notification preferences updated!
                        </div>
                      )}
                      {error.notifications && (
                        <div className="mt-2 text-sm text-red-600">
                          {error.notifications}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-elegant">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-500">Manage your account security</p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSecuritySubmit}>
                    <div className="mb-6">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={securityForm.currentPassword}
                            onChange={handleSecurityChange}
                            className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={securityForm.newPassword}
                            onChange={handleSecurityChange}
                            className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={securityForm.confirmPassword}
                            onChange={handleSecurityChange}
                            className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
                        disabled={loading.security}
                      >
                        {loading.security ? 'Updating...' : 'Update Password'}
                      </button>
                      {success.security && (
                        <div className="mt-2 text-sm text-green-600">
                          Security settings updated successfully!
                        </div>
                      )}
                      {error.security && (
                        <div className="mt-2 text-sm text-red-600">
                          {error.security}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6 border-t border-gray-100 pt-6">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      
                      <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500">Secure your account with 2FA</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={securityForm.twoFactorAuth}
                            onChange={() => setSecurityForm({
                              ...securityForm,
                              twoFactorAuth: !securityForm.twoFactorAuth
                            })}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-6 border-t border-gray-100 pt-6">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Session Management</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Manage your active sessions and sign out from devices.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Current Session (Chrome)</h4>
                            <p className="text-sm text-gray-500">Started: Today, 10:30 AM</p>
                            <p className="text-xs text-green-500">Active Now</p>
                          </div>
                          <button 
                            type="button"
                            className="px-3 py-1 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100"
                          >
                            This Device
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 px-4 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Mobile App (iPhone)</h4>
                            <p className="text-sm text-gray-500">Last active: Today, 09:15 AM</p>
                          </div>
                          <button 
                            type="button"
                            className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        type="button"
                        className="mt-4 px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-50"
                      >
                        Sign Out From All Devices
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Other Tabs */}
            {activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'security' && (
              <div className="bg-white rounded-xl shadow-elegant p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    {activeTab === 'privacy' && <Shield className="w-8 h-8" />}
                    {activeTab === 'appearance' && <Monitor className="w-8 h-8" />}
                    {activeTab === 'help' && <HelpCircle className="w-8 h-8" />}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'privacy' && 'Privacy Settings'}
                    {activeTab === 'appearance' && 'Appearance Settings'}
                    {activeTab === 'help' && 'Help & Support'}
                  </h3>
                  <p className="text-gray-500 text-center max-w-md">
                    This feature is currently under development and will be available soon.
                  </p>
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