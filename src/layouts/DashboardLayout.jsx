import { useState } from 'react';
import LeftSidebar from '../components/Dashboard/Sidebar/LeftSidebar';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <LeftSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={{
          name: 'Harsh',
          profileImage: 'https://yourcdn.com/user.jpg',
          followers: 6,
          following: 9,
        }}
      />

      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white px-4 py-2 shadow md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <img src="/logo.png" alt="Logo" className="h-8" />
        </div>

        {/* Main content */}
        <main className="flex-1 pt-16 md:pt-0 px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
