// components/Sidebar/UserCard.jsx
const UserCard = ({ name, followers, following, profileUrl }) => (
  <div className="flex items-center gap-3 px-4 pb-4 mt-auto">
    <img
      src={profileUrl}
      alt="Profile"
      className="h-10 w-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900">{name}</span>
      <span className="text-xs text-gray-600">
        <strong>{followers}</strong> followers · <strong>{following}</strong>{' '}
        following →
      </span>
    </div>
  </div>
);
