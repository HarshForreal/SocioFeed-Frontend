// components/common/AvatarGroup.jsx
const AvatarGroup = ({ count = 5 }) => (
  <div className="flex justify-center -space-x-2 mb-2">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"
      />
    ))}
  </div>
);

export default AvatarGroup;
