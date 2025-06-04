const generateOptimizedImageUrl = (imageUrl) => {
  const url = typeof imageUrl === 'string' ? imageUrl : imageUrl?.url;

  if (!url) {
    return '';
  }

  return url.replace('/upload/', '/upload/q_auto,f_auto,w_800,h_600,c_limit/');
};

const Post = ({ post }) => {
  const {
    content,
    createdAt,
    author,
    images,
    likesCount,
    commentsCount,
    likes,
    comments,
    savedBy,
  } = post;

  const displayLikes = likesCount ?? likes?.length ?? 0;
  const displayComments = commentsCount ?? comments?.length ?? 0;

  const formattedImages = images && images.length > 0 ? images : [];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={author?.avatarUrl || '/default-avatar.png'}
          alt={author?.username || 'User'}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">
            {author?.username || 'Unknown'}
          </p>
        </div>
      </div>

      {/* Render images */}
      {formattedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {formattedImages.map((url, index) => {
            // Generate optimized image URL
            const optimizedUrl = generateOptimizedImageUrl(url);
            return (
              <img
                key={index}
                src={optimizedUrl} // Use the optimized URL
                alt={`Post Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-md"
                loading="lazy"
              />
            );
          })}
        </div>
      )}

      <p className="mb-3 text-gray-800">{content}</p>

      <div className="flex items-center gap-4 text-gray-600">
        <button>👍 {displayLikes}</button>
        <button>💬 {displayComments}</button>
        <button>🔖 {savedBy?.length || 0}</button>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
