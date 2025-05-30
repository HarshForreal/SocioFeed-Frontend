import React from 'react';

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 text-black hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
    >
      {icon}
  <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
