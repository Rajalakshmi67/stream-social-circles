
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Bookmark, Search, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'My Groups', path: '/groups' },
    { icon: Bookmark, label: 'Watchlist', path: '/watchlist' },
    { icon: Search, label: 'Discover', path: '/browse' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div
      className={`fixed md:relative h-screen bg-ott-card border-r border-white/10 transition-all duration-300 ease-in-out z-40 ${
        isOpen ? 'w-64 translate-x-0' : 'w-0 md:w-20 -translate-x-full md:translate-x-0'
      } overflow-hidden`}
    >
      <div className="h-full flex flex-col p-4">
        <div className="mt-8 flex flex-col space-y-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-4 text-ott-text-secondary hover:text-white transition p-2 rounded-md hover:bg-white/5"
            >
              <item.icon className="h-5 w-5" />
              <span className={`${isOpen ? 'block' : 'hidden'} md:block transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
