const SidebarHeader = () => (
  <div className="hidden md:flex items-center ml-7 justify-left py-4 border-b border-gray-100">
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Sociofeed Logo" className="h-10 w-auto" />
      <span className="text-xl font-bold text-gray-800 instrument-heading">
        Sociofeed
      </span>
    </div>
  </div>
);

export default SidebarHeader;
