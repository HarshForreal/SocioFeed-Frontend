// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useLikePost } from '../../hooks/useLikePost';
// import { useComments } from '../../hooks/useComments';
// import { useSavePost } from '../../hooks/useSavePost';
// import { generateOptimizedImageUrl } from '../../utils/imageUtils';
// import PostActionBar from './PostActionBar';
// import CommentModal from './CommentModal';
// import ImageCarouselModal from '../common/ImageCropUpload/ImageCarouselModal ';

// const Post = ({ post }) => {
//   const {
//     id,
//     content,
//     createdAt,
//     author,
//     // images = [],
//     likes = [],
//     likesCount = likes?.length || 0,
//     savedBy = [],
//   } = post;
//   const user = useSelector((state) => state.auth.user);
//   const {
//     isLiked,
//     likesCount: liveLikesCount,
//     isLiking,
//     toggleLike,
//   } = useLikePost(id, likesCount, user.id, post.likes || []);
//   const { isSaved, isSaving, toggleSave } = useSavePost(
//     id,
//     savedBy.some((u) => u.id === user.id)
//   );
//   const [showCommentModal, setShowCommentModal] = useState(false);

//   const { comments: fetchedComments, submitComment } = useComments(id);

//   const handleSubmitComment = async (htmlContent) => {
//     await submitComment(htmlContent);
//   };
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const handleImageClick = (index) => {
//     setSelectedImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow p-4 mb-6">
//       {/* Author */}
//       <div className="flex items-center gap-3 mb-3">
//         <img
//           src={author?.avatarUrl || '/default-avatar.png'}
//           alt={author?.username || 'User'}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <p className="geist text-gray-900 font-bold">
//           {author?.username || 'Unknown'}
//         </p>
//       </div>

//       {post.images.length > 0 && (
//         <div className="grid grid-cols-2 gap-2 mb-3">
//           {post.images.map((url, idx) => (
//             <img
//               key={idx}
//               src={generateOptimizedImageUrl(url)}
//               alt={`Post Image ${idx + 1}`}
//               className="w-full h-48 object-cover rounded-md"
//               loading="lazy"
//               onClick={() => handleImageClick(idx)} // Open the carousel on click
//             />
//           ))}
//         </div>
//       )}

//       {/* Image Carousel Modal */}
//       {isModalOpen && (
//         <ImageCarouselModal
//           images={post.images}
//           selectedIndex={selectedImageIndex}
//           onClose={handleCloseModal}
//         />
//       )}

//       {/* Image Carousel Modal */}
//       {isModalOpen && (
//         <ImageCarouselModal
//           images={post.images}
//           selectedIndex={selectedImageIndex}
//           onClose={handleCloseModal}
//         />
//       )}

//       {/* Content */}
//       <p className="mb-3 text-gray-800 geist">{content}</p>

//       {/* Actions */}

//       <PostActionBar
//         isLiked={isLiked}
//         likesCount={liveLikesCount}
//         isLiking={isLiking}
//         onLike={toggleLike}
//         commentsCount={fetchedComments.length}
//         isSaved={isSaved}
//         isSaving={isSaving}
//         onSave={toggleSave}
//         onCommentClick={() => setShowCommentModal(true)}
//       />

//       {/* ✅ Pass the required props to CommentModal */}
//       <CommentModal
//         postId={id}
//         isOpen={showCommentModal}
//         onClose={() => setShowCommentModal(false)}
//         onSubmitComment={handleSubmitComment}
//         comments={fetchedComments}
//       />

//       {/* Timestamp */}
//       <p className="text-xs text-gray-400 mt-2 geist">
//         {new Date(createdAt).toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default Post;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLikePost } from '../../hooks/useLikePost';
import { useComments } from '../../hooks/useComments'; // This hook is already enhanced
import { useSavePost } from '../../hooks/useSavePost';
import { generateOptimizedImageUrl } from '../../utils/imageUtils';
import PostActionBar from './PostActionBar';
import CommentModal from './CommentModal'; // Assuming this is the correct path for your CommentModal
import ImageCarouselModal from '../common/ImageCropUpload/ImageCarouselModal '; // Adjust path if needed

const Post = ({ post }) => {
  const {
    id,
    content,
    createdAt,
    author,
    likes = [],
    likesCount = likes?.length || 0,
    savedBy = [],
  } = post;

  const user = useSelector((state) => state.auth.user);

  const {
    isLiked,
    likesCount: liveLikesCount,
    isLiking,
    toggleLike,
  } = useLikePost(id, likesCount, user.id, post.likes || []);

  const { isSaved, isSaving, toggleSave } = useSavePost(
    id,
    savedBy.some((u) => u.id === user.id)
  );

  const [showCommentModal, setShowCommentModal] = useState(false);

  const { comments: fetchedComments } = useComments(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={author?.avatarUrl || '/default-avatar.png'}
          alt={author?.username || 'User'}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="geist text-gray-900 font-bold">
          {author?.username || 'Unknown'}
        </p>
      </div>

      {post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {post.images.map((url, idx) => (
            <img
              key={idx}
              src={generateOptimizedImageUrl(url)}
              alt={`Post Image ${idx + 1}`}
              className="w-full h-48 object-cover rounded-md"
              loading="lazy"
              onClick={() => handleImageClick(idx)} // Open the carousel on click
            />
          ))}
        </div>
      )}

      {/* Image Carousel Modal (You have it twice, might be a copy-paste error) */}
      {isModalOpen && (
        <ImageCarouselModal
          images={post.images}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseModal}
        />
      )}

      {/* Image Carousel Modal (Remove this duplicate if it's an error) */}
      {isModalOpen && (
        <ImageCarouselModal
          images={post.images}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseModal}
        />
      )}

      {/* Content */}
      <p className="mb-3 text-gray-800 geist">{content}</p>

      {/* Actions */}
      <PostActionBar
        isLiked={isLiked}
        likesCount={liveLikesCount}
        isLiking={isLiking}
        onLike={toggleLike}
        commentsCount={fetchedComments.length} // Display count from useComments hook
        isSaved={isSaved}
        isSaving={isSaving}
        onSave={toggleSave}
        onCommentClick={() => setShowCommentModal(true)}
      />

      {/* ✅ CORRECTLY PASS THE postOwnerId PROP TO CommentModal */}
      <CommentModal
        postId={id}
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        postOwnerId={author?.id}
      />

      {/* Timestamp */}
      <p className="text-xs text-gray-400 mt-2 geist">
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
