// SidebarItem.jsx
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClass =
    'flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors';
  const activeClass = isActive
    ? 'bg-gray-100 font-medium text-blue-600'
    : 'hover:bg-gray-100 text-gray-700';

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarItem;
