const ProfileHeader = ({ user, onFollowersClick, onFollowingClick }) => {
  if (!user) return <div className="text-center p-4">Loading profile...</div>;

  return (
    <div className="text-center">
      <img
        src={user.avatarUrl || user.profileUrl}
        alt={user.username}
        className="mx-auto h-24 w-24 rounded-full object-cover border"
      />
      <h1 className="text-2xl font-semibold mt-2 flex items-center justify-center gap-2">
        {user.username}
      </h1>

      <div className="flex justify-center gap-6 mt-2 text-gray-700">
        <div
          className="cursor-pointer"
          onClick={onFollowersClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onFollowersClick()}
        >
          <span className="font-bold">{user.followerCount ?? 0}</span> Followers
        </div>
        <div
          className="cursor-pointer"
          onClick={onFollowingClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onFollowingClick()}
        >
          <span className="font-bold">{user.followingCount ?? 0}</span>{' '}
          Following
        </div>
      </div>

      <p className="text-gray-600 mt-2">{user.bio}</p>
    </div>
  );
};

export default ProfileHeader;
