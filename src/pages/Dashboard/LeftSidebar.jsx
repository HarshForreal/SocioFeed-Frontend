import { Home, Mail, Search, Bookmark, Power } from 'lucide-react';
import SidebarItem from '../../components/Dashboard/SidebarItem';
import { Button } from '@mui/material';
import useLogout from '../../hooks/useLogout';
const LeftSidebar = ({ isOpen, onClose }) => {
  const { logout, loading } = useLogout();
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white transition-transform duration-300 border-r border-gray-200
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:flex md:flex-col md:h-screen md:w-64`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden p-4 flex justify-end">
          <button onClick={onClose} className="text-black text-xl">
            ✕
          </button>
        </div>

        <div className="hidden md:flex items-center justify-center py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="./logo.png"
              alt="Sociofeed Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-800 instrument-heading">
              Sociofeed
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-4 px-4 py-6 flex-1">
          <SidebarItem icon={<Home />} label="Scroll" />
          <SidebarItem icon={<Mail />} label="Inbox" />
          <SidebarItem icon={<Search />} label="Search" />
          <SidebarItem icon={<Bookmark />} label="Bookmark" />
        </div>

        {/* Logout - Fixed at bottom */}
        <div className="p-4 border-t border-gray-100">
          <div
            onClick={logout}
            className="flex items-center gap-3 text-red-600 cursor-pointer hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
          >
            <Power size={20} />
            <Button className="font-medium" variant="ghost" disabled={loading}>
              {loading ? 'Logging out...' : 'Log Out'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
