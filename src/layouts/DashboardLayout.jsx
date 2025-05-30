import { useState } from 'react';
import LeftSidebar from '../pages/Dashboard/LeftSidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <LeftSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content wrapper - NO margin on desktop since sidebar is relative */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation (mobile only) */}
        <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between bg-white px-4 py-2 shadow md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <img src="./logo.png" alt="Logo" className="h-8" />
        </div>

        {/* Main content */}
        <main className="flex-1 pt-16 md:pt-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
