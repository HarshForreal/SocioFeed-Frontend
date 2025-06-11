import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, label, to, onClick }) => {
  const baseClass =
    'flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200';

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {icon}
        <span className="font-medium text-gray-800">{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {icon}
      <span className="font-medium text-gray-800">{label}</span>
    </button>
  );
};

export default SidebarItem;
