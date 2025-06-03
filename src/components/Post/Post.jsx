import React from 'react';

const Post = ({ username, avatarUrl, imageUrl, caption, createdAt }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={avatarUrl}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{username}</p>
          <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt="Post"
        className="w-full rounded-md object-cover mb-3"
      />

      {/* Caption */}
      <p className="text-sm text-gray-800">{caption}</p>
    </div>
  );
};

export default Post;
