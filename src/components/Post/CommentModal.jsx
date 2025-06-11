// import React, { useState } from 'react';
// import Modal from '../common/Modal/Modal';
// import TipTapEditor from '../common/Editor/TipTapEditor';
// import { Edit, Trash2 } from 'lucide-react'; // Import Lucide icons

// const CommentModal = ({ isOpen, onClose, comments = [], onSubmitComment }) => {
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const isEmpty = !content || content === '<p></p>';
//     if (isEmpty) return;

//     await onSubmitComment(content);
//     setContent('');
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Comments">
//       <div className="flex flex-col h-[500px]">
//         {' '}
//         {/* Set a fixed height for the flex container */}
//         {/* Scrollable Comments Section */}
//         <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-2 geist">
//           {comments.length > 0 ? (
//             comments.map((comment) => (
//               <div key={comment.id} className="p-2 bg-gray-100 rounded">
//                 <div className="font-semibold mb-1 flex justify-between items-center">
//                   {' '}
//                   {/* Added flex for alignment */}
//                   {comment.author.username}
//                   <div className="flex space-x-2">
//                     {' '}
//                     {/* Container for buttons */}
//                     <button
//                       className="text-gray-600 hover:text-blue-500"
//                       onClick={() => console.log('Edit comment:', comment.id)} // Placeholder for edit functionality
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button
//                       className="text-gray-600 hover:text-red-500"
//                       onClick={() => console.log('Delete comment:', comment.id)} // Placeholder for delete functionality
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//                 <div
//                   className="prose max-w-none text-sm"
//                   dangerouslySetInnerHTML={{ __html: comment.content }}
//                 />
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No comments yet.</p>
//           )}
//         </div>
//         {/* Fixed Editor Section */}
//         <form
//           onSubmit={handleSubmit}
//           className="pt-2 border-t mt-2 space-y-2 bg-white"
//         >
//           <TipTapEditor
//             content={content}
//             onChange={(html) => setContent(html)}
//             editable={true}
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//           >
//             Post
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default CommentModal;

// import React, { useState, useEffect } from 'react';
// import Modal from '../common/Modal/Modal';
// import TipTapEditor from '../common/Editor/TipTapEditor';
// import { Edit, Trash2, Check, X } from 'lucide-react';
// import { useComments } from '../../hooks/useComments'; // Adjust path as needed
// import { useSelector } from 'react-redux'; // Import useSelector for currentUserId

// const CommentModal = ({ isOpen, onClose, postId, postOwnerId }) => {
//   // Use the useComments hook
//   const {
//     comments,
//     loading: commentsLoading,
//     error: commentsError,
//     submitComment,
//     handleEditComment,
//     handleDeleteComment,
//   } = useComments(postId);

//   const currentUserId = useSelector((state) => state.user.profile?.id); // Get current user ID from Redux

//   const [newCommentContent, setNewCommentContent] = useState('');
//   const [editingCommentId, setEditingCommentId] = useState(null);
//   const [editingCommentContent, setEditingCommentContent] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // For new comment submission
//   const [isUpdating, setIsUpdating] = useState(false); // For comment edit submission
//   const [isDeleting, setIsDeleting] = useState(false); // For comment deletion

//   useEffect(() => {
//     // Reset editor content when modal opens or closes
//     if (isOpen) {
//       setNewCommentContent('');
//       setEditingCommentId(null);
//       setEditingCommentContent('');
//     }
//   }, [isOpen]);

//   const handleNewCommentSubmit = async (e) => {
//     e.preventDefault();
//     const isEmpty = !newCommentContent || newCommentContent === '<p></p>';
//     if (isEmpty) {
//       console.warn('Comment cannot be empty.'); // Log a warning
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await submitComment(newCommentContent);
//       setNewCommentContent(''); // Clear editor after successful submission
//       console.log('Comment added successfully!'); // Log success
//     } catch (error) {
//       console.error('Error submitting comment:', error); // Log error
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleStartEdit = (comment) => {
//     setEditingCommentId(comment.id);
//     setEditingCommentContent(comment.content);
//   };

//   const handleCancelEdit = () => {
//     setEditingCommentId(null);
//     setEditingCommentContent('');
//   };

//   const handleUpdateComment = async (commentId) => {
//     const isEmpty =
//       !editingCommentContent || editingCommentContent === '<p></p>';
//     if (isEmpty) {
//       console.warn('Comment cannot be empty.'); // Log a warning
//       return;
//     }
//     if (
//       editingCommentContent ===
//       comments.find((c) => c.id === commentId)?.content
//     ) {
//       console.info('No changes detected for comment update.'); // Log info
//       setEditingCommentId(null); // Exit edit mode if no change
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       await handleEditComment(commentId, editingCommentContent);
//       setEditingCommentId(null); // Exit edit mode
//       setEditingCommentContent(''); // Clear editing content
//       console.log('Comment updated successfully!'); // Log success
//     } catch (error) {
//       console.error('Error updating comment:', error); // Log error
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleDelete = async (commentId) => {
//     if (!window.confirm('Are you sure you want to delete this comment?')) {
//       return;
//     }
//     setIsDeleting(true);
//     try {
//       await handleDeleteComment(commentId);
//       console.log('Comment deleted successfully!'); // Log success
//     } catch (error) {
//       console.error('Error deleting comment:', error); // Log error
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Comments">
//       <div className="flex flex-col h-[500px]">
//         {' '}
//         {/* Fixed height for proper flex behavior */}
//         {/* Scrollable Comments Section */}
//         <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-2 geist">
//           {commentsLoading ? (
//             <p className="text-sm text-gray-500">Loading comments...</p>
//           ) : commentsError ? (
//             <p className="text-sm text-red-500">Error: {commentsError}</p>
//           ) : comments.length > 0 ? (
//             comments.map((comment) => (
//               <div key={comment.id} className="p-2 bg-gray-100 rounded">
//                 <div className="font-semibold mb-1 flex justify-between items-center">
//                   <span>{comment.author.username}</span>
//                   <div className="flex space-x-2">
//                     {/* Conditional rendering for Edit/Delete buttons */}
//                     {currentUserId && (
//                       <>
//                         {comment.author.id === currentUserId && (
//                           // Edit button
//                           <button
//                             className="text-gray-600 hover:text-blue-500 disabled:opacity-50"
//                             onClick={() => handleStartEdit(comment)}
//                             disabled={
//                               editingCommentId !== null ||
//                               isUpdating ||
//                               isDeleting
//                             } // Disable if another comment is being edited or ops are ongoing
//                           >
//                             <Edit size={16} />
//                           </button>
//                         )}
//                         {(comment.author.id === currentUserId ||
//                           postOwnerId === currentUserId) && (
//                           // Delete button
//                           <button
//                             className="text-gray-600 hover:text-red-500 disabled:opacity-50"
//                             onClick={() => handleDelete(comment.id)}
//                             disabled={
//                               isUpdating ||
//                               isDeleting ||
//                               editingCommentId !== null
//                             } // Disable during other ops
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {editingCommentId === comment.id ? (
//                   // Editor for the current comment being edited
//                   <div className="space-y-2 mt-2">
//                     <TipTapEditor
//                       content={editingCommentContent}
//                       onChange={(html) => setEditingCommentContent(html)}
//                       editable={true}
//                     />
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400 disabled:opacity-50"
//                         onClick={handleCancelEdit}
//                         disabled={isUpdating}
//                       >
//                         <X size={16} className="inline-block mr-1" /> Cancel
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
//                         onClick={() => handleUpdateComment(comment.id)}
//                         disabled={isUpdating}
//                       >
//                         <Check size={16} className="inline-block mr-1" />{' '}
//                         {isUpdating ? 'Updating...' : 'Save'}
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // Display mode for comment
//                   <div
//                     className="prose max-w-none text-sm"
//                     dangerouslySetInnerHTML={{ __html: comment.content }}
//                   />
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No comments yet.</p>
//           )}
//         </div>
//         {/* Fixed Editor Section for new comments */}
//         <form
//           onSubmit={handleNewCommentSubmit}
//           className="pt-2 border-t mt-2 space-y-2 bg-white"
//         >
//           <TipTapEditor
//             content={newCommentContent}
//             onChange={(html) => setNewCommentContent(html)}
//             editable={true}
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full disabled:opacity-50"
//             disabled={isSubmitting || editingCommentId !== null} // Disable if submitting or editing another comment
//           >
//             {isSubmitting ? 'Posting...' : 'Post'}
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default CommentModal;

// components/common/CommentModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal/Modal';
import TipTapEditor from '../common/Editor/TipTapEditor'; // Adjust path relative to CommentModal.jsx
import { Edit, Trash2, Check, X } from 'lucide-react';
import { useComments } from '../../hooks/useComments'; // Adjust path relative to CommentModal.jsx
import { useSelector } from 'react-redux'; // For current user ID

const CommentModal = ({ isOpen, onClose, postId, postOwnerId }) => {
  // Use the useComments hook to manage comments for the given postId
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    submitComment,
    handleEditComment,
    handleDeleteComment,
  } = useComments(postId);

  // Get the ID of the currently logged-in user from Redux store
  const currentUserId = useSelector((state) => state.user.profile?.id);

  // State for new comment input
  const [newCommentContent, setNewCommentContent] = useState('');
  // State for tracking which comment is being edited
  const [editingCommentId, setEditingCommentId] = useState(null);
  // State for the content of the comment currently being edited
  const [editingCommentContent, setEditingCommentContent] = useState('');

  // States for loading/submitting feedback
  const [isSubmitting, setIsSubmitting] = useState(false); // For new comment submission
  const [isUpdating, setIsUpdating] = useState(false); // For comment edit submission
  const [isDeleting, setIsDeleting] = useState(false); // For comment deletion

  // Effect to reset editor content when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setNewCommentContent('');
      setEditingCommentId(null);
      setEditingCommentContent('');
    }
  }, [isOpen]);

  // Handler for submitting a new comment
  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = !newCommentContent || newCommentContent === '<p></p>';
    if (isEmpty) {
      console.warn('Comment cannot be empty.'); // Log a warning
      return;
    }

    setIsSubmitting(true);
    try {
      await submitComment(newCommentContent);
      setNewCommentContent(''); // Clear editor after successful submission
      console.log('Comment added successfully!'); // Log success
    } catch (error) {
      console.error('Error submitting comment:', error); // Log error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler to start editing a comment
  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  // Handler to cancel editing a comment
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  // Handler to update an existing comment
  const handleUpdateComment = async (commentId) => {
    const isEmpty =
      !editingCommentContent || editingCommentContent === '<p></p>';
    if (isEmpty) {
      console.warn('Comment cannot be empty.'); // Log a warning
      return;
    }
    // Check if content has actually changed to avoid unnecessary API calls
    if (
      editingCommentContent ===
      comments.find((c) => c.id === commentId)?.content
    ) {
      console.info('No changes detected for comment update.'); // Log info
      setEditingCommentId(null); // Exit edit mode if no change
      return;
    }

    setIsUpdating(true);
    try {
      await handleEditComment(commentId, editingCommentContent);
      setEditingCommentId(null); // Exit edit mode
      setEditingCommentContent(''); // Clear editing content
      console.log('Comment updated successfully!'); // Log success
    } catch (error) {
      console.error('Error updating comment:', error); // Log error
    } finally {
      setIsUpdating(false);
    }
  };

  // Handler to delete a comment
  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    setIsDeleting(true);
    try {
      await handleDeleteComment(commentId);
      console.log('Comment deleted successfully!'); // Log success
    } catch (error) {
      console.error('Error deleting comment:', error); // Log error
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comments">
      <div className="flex flex-col h-[500px]">
        {' '}
        {/* Fixed height for proper flex behavior */}
        {/* Scrollable Comments Section */}
        <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-2 geist">
          {commentsLoading ? (
            <p className="text-sm text-gray-500">Loading comments...</p>
          ) : commentsError ? (
            <p className="text-sm text-red-500">Error: {commentsError}</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-2 bg-gray-100 rounded">
                <div className="font-semibold mb-1 flex justify-between items-center">
                  <span>{comment.author?.username || 'Unknown User'}</span>{' '}
                  {/* Use optional chaining */}
                  <div className="flex space-x-2">
                    {/* Conditional rendering for Edit/Delete buttons */}
                    {currentUserId && ( // Only show buttons if a user is logged in
                      <>
                        {/* Edit button: Only for comment author */}
                        {comment.author?.id === currentUserId && (
                          <button
                            className="text-gray-600 hover:text-blue-500 disabled:opacity-50"
                            onClick={() => handleStartEdit(comment)}
                            // Disable if another comment is being edited or any operation is ongoing
                            disabled={
                              editingCommentId !== null ||
                              isUpdating ||
                              isDeleting
                            }
                            aria-label="Edit comment"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                        {/* Delete button: For comment author OR post owner */}
                        {(comment.author?.id === currentUserId ||
                          postOwnerId === currentUserId) && (
                          <button
                            className="text-gray-600 hover:text-red-500 disabled:opacity-50"
                            onClick={() => handleDelete(comment.id)}
                            // Disable during any operation or if editing a comment
                            disabled={
                              isUpdating ||
                              isDeleting ||
                              editingCommentId !== null
                            }
                            aria-label="Delete comment"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Conditional rendering for comment display or edit editor */}
                {editingCommentId === comment.id ? (
                  // Editor for the current comment being edited
                  <div className="space-y-2 mt-2">
                    <TipTapEditor
                      content={editingCommentContent}
                      onChange={(html) => setEditingCommentContent(html)}
                      editable={true}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400 disabled:opacity-50"
                        onClick={handleCancelEdit}
                        disabled={isUpdating}
                      >
                        <X size={16} className="inline-block mr-1" /> Cancel
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                        onClick={() => handleUpdateComment(comment.id)}
                        disabled={isUpdating}
                      >
                        <Check size={16} className="inline-block mr-1" />{' '}
                        {isUpdating ? 'Updating...' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display mode for comment
                  <div
                    className="prose max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>
        {/* Fixed Editor Section for new comments */}
        <form
          onSubmit={handleNewCommentSubmit}
          className="pt-2 border-t mt-2 space-y-2 bg-white"
        >
          <TipTapEditor
            content={newCommentContent}
            onChange={(html) => setNewCommentContent(html)}
            editable={true}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full disabled:opacity-50"
            disabled={isSubmitting || editingCommentId !== null} // Disable if submitting or editing another comment
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;
