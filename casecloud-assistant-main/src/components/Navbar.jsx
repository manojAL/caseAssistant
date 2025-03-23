
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [notifications, setNotifications] = React.useState(3);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/assistant':
        return 'AI Assistant';
      case '/cases':
        return 'Case Management';
      case '/documents':
        return 'Document Search';
      case '/settings':
        return 'Settings';
      default:
        return 'Legal Case Management';
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">{getPageTitle()}</span>
          </div>
          
          <div className="flex items-center">
            <div className="relative mr-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            
            <div className="relative">
              <button className="flex items-center gap-2 py-2 px-3 rounded-full hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="hidden md:block text-sm font-medium">Admin User</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
