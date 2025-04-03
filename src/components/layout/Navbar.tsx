
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, Bell, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-ott-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="content-container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center">
            <span className="text-ott-red font-bold text-2xl">StreamCircle</span>
          </Link>
          
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-ott-text-secondary hover:text-white transition">Home</Link>
            <Link to="/browse" className="text-ott-text-secondary hover:text-white transition">Browse</Link>
            <Link to="/groups" className="text-ott-text-secondary hover:text-white transition">My Groups</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-ott-text-secondary hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-ott-text-secondary hover:text-white">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-ott-card border-white/10">
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link to="/auth/login" className="w-full">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
