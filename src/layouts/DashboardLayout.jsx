import { useState } from 'react';
import LeftSidebar from '../components/Dashboard/Sidebar/LeftSidebar';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (  
    <div className="relative min-h-screen">
      {/* Sidebar fixed on left, full height, scrollable if needed */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg overflow-y-auto
          ${sidebarOpen ? 'block' : 'hidden'} md:block`}
      >
        <LeftSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content: add left margin equal to sidebar width */}
      <div
        className="ml-0 md:ml-64 flex flex-col h-screen overflow-y-auto"
        style={{ paddingTop: '64px' }} // Adjust if you have a fixed header of height 64px
      >
        {/* Mobile Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white px-4 py-2 shadow md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <img src="/logo.png" alt="Logo" className="h-8" />
        </div>

        {/* Main content area */}
        <main className="flex-1 px-4 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
