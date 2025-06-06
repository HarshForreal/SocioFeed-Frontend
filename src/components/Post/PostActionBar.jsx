// components/Post/PostActionBar.jsx
const PostActionBar = ({
  isLiked,
  likesCount,
  isLiking,
  onLike,
  commentsCount,
  isSaved,
  isSaving,
  onSave,
  onCommentClick,
}) => (
  <div className="flex items-center gap-4 text-gray-600">
    <button
      onClick={onLike}
      disabled={isLiking}
      className={`transition-colors duration-200 ${
        isLiked ? 'text-blue-500 font-semibold' : 'hover:text-blue-400'
      }`}
    >
      {isLiked ? '💙' : '👍'} {likesCount}
    </button>

    <button onClick={onCommentClick}>💬 {commentsCount}</button>

    <button
      onClick={onSave}
      disabled={isSaving}
      className={`transition-colors duration-200 ${
        isSaved ? 'text-green-500 font-semibold' : 'hover:text-green-400'
      }`}
    >
      {isSaved ? '✅ Saved' : '🔖 Save'}
    </button>
  </div>
);

export default PostActionBar;
