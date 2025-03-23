
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, MessageSquare, Briefcase, 
  FileText, Settings, LogOut, ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Assistant', path: '/assistant', icon: MessageSquare },
    { name: 'Case Management', path: '/cases', icon: Briefcase },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  if (!mounted) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-20 w-64 bg-white/90 backdrop-blur-md shadow-elegant-lg">
      <div className="flex flex-col h-full">
        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
          <ul className="px-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-3 py-3 text-sm font-medium rounded-lg group transition-all
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex w-full items-center px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
