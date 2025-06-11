import { Menu } from 'lucide-react';
import Button from '../../common/Button/Button';

export default function TopBar({ toggleSidebar }) {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-4 py-2">
      <Button
        onClick={toggleSidebar}
        color="bg-transparent"
        className="lg:hidden"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </Button>

      <div className="flex items-center mx-auto gap-2">
        <img src="/logo.png" alt="Sociofeed Logo" className="h-8 w-auto" />
        <span className="text-xl font-bold text-gray-800">Sociofeed</span>
      </div>

      <div className="w-6 lg:hidden" />
    </div>
  );
}
