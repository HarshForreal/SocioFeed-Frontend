const SidebarProfile = ({ name, profileImage, followers, following }) => (
  <div className="flex items-center gap-3 pb-2 mt-auto">
    <img
      src={profileImage}
      alt={name}
      className="h-10 w-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900">{name}</span>

      {/* FIXED: Flex row for proper layout and spacing */}
      <div className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
        <span>
          <strong>{followers}</strong> Followers
        </span>
        <span className="mx-1">·</span>
        <span>
          <strong>{following}</strong> Following →
        </span>
      </div>
    </div>
  </div>
);

export default SidebarProfile;
