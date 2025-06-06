import { Menu } from 'lucide-react';

export default function TopBar({ toggleSidebar }) {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between px-4 py-2">
      <button onClick={toggleSidebar} className="lg:hidden">
        <Menu size={24} />
      </button>

      <div className="flex items-center mx-auto gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        <span className="text-xl font-bold text-gray-800">Sociofeed</span>
      </div>

      {/* Empty div to balance flex space */}
      <div className="w-6 lg:hidden" />
    </div>
  );
}
