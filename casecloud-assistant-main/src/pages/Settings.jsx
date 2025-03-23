
import React, { useState } from 'react';
import { 
  User, Bell, Lock, Shield, Monitor, HelpCircle,
  ChevronRight, Save, Globe
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: 'Admin User',
    email: 'admin@gujarat.gov.in',
    department: 'Legal Department',
    position: 'Legal Officer',
    phone: '+91 9876543210',
    language: 'English'
  });

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    console.log('Profile updated:', profileForm);
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

          <div className="lg:col-span-3">
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
                          {profileForm.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V20C6 20.5304 6.21071 21.0391 6.58579 21.4142C6.96086 21.7893 7.46957 22 8 22H16C16.5304 22 17.0391 21.7893 17.4142 21.4142C17.7893 21.0391 18 20.5304 18 20V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2ZM12 18C11.4696 18 10.9609 17.7893 10.5858 17.4142C10.2107 17.0391 10 16.5304 10 16C10 15.4696 10.2107 14.9609 10.5858 14.5858C10.9609 14.2107 11.4696 14 12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14.9609 14 15.4696 14 16C14 16.5304 13.7893 17.0391 13.4142 17.4142C13.0391 17.7893 12.5304 18 12 18Z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{profileForm.name}</h3>
                        <p className="text-sm text-gray-500">{profileForm.department}</p>
                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                          Change profile picture
                        </button>
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
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          onChange={handleProfileChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          <option>Legal Department</option>
                          <option>Labor Department</option>
                          <option>Employment Department</option>
                          <option>Skill Development</option>
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
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                          className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Gujarati</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 mt-6">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-elegant">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                  <p className="text-sm text-gray-500">Manage your notification preferences</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive email updates for important events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-500">Receive text messages for critical updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">Case Updates</h3>
                        <p className="text-sm text-gray-500">Notifications for new case assignments and status changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="font-medium text-gray-900">Document Uploads</h3>
                        <p className="text-sm text-gray-500">Notifications when new documents are uploaded</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">System Announcements</h3>
                        <p className="text-sm text-gray-500">Important system updates and announcements</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 mt-6">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-elegant">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-500">Manage your account security</p>
                </div>
                <div className="p-6">
                  <form>
                    <div className="mb-6">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            id="current-password"
                            name="current-password"
                            type="password"
                            className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            id="new-password"
                            name="new-password"
                            type="password"
                            className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            className="block w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700">
                        Update Password
                      </button>
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
                          <input type="checkbox" className="sr-only peer" defaultChecked />
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
                          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100">
                            This Device
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 px-4 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Mobile App (iPhone)</h4>
                            <p className="text-sm text-gray-500">Last active: Today, 09:15 AM</p>
                          </div>
                          <button className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
                            Sign Out
                          </button>
                        </div>
                      </div>
                      
                      <button className="mt-4 px-4 py-2 text-red-600 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-50">
                        Sign Out From All Devices
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'security' && (
              <div className="bg-white rounded-xl shadow-elegant p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    This feature is currently under development and will be available soon. 
                    We're working hard to bring you the best experience.
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
