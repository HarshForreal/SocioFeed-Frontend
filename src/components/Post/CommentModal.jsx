import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal/Modal';
import TipTapEditor from '../common/Editor/TipTapEditor';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { useComments } from '../../hooks/useComments';
import { useSelector } from 'react-redux';

const CommentModal = ({ isOpen, onClose, postId, postOwnerId }) => {
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    submitComment,
    handleEditComment,
    handleDeleteComment,
  } = useComments(postId);

  const currentUserId = useSelector((state) => state.user.profile?.id);

  const [newCommentContent, setNewCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNewCommentContent('');
      setEditingCommentId(null);
      setEditingCommentContent('');
    }
  }, [isOpen]);

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = !newCommentContent || newCommentContent === '<p></p>';
    if (isEmpty) {
      console.warn('Comment cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitComment(newCommentContent);
      setNewCommentContent('');
      console.log('Comment added successfully!');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const handleUpdateComment = async (commentId) => {
    const isEmpty =
      !editingCommentContent || editingCommentContent === '<p></p>';
    if (isEmpty) {
      console.warn('Comment cannot be empty.');
      return;
    }
    if (
      editingCommentContent ===
      comments.find((c) => c.id === commentId)?.content
    ) {
      console.info('No changes detected for comment update.');
      setEditingCommentId(null);
      return;
    }

    setIsUpdating(true);
    try {
      await handleEditComment(commentId, editingCommentContent);
      setEditingCommentId(null);
      setEditingCommentContent('');
      console.log('Comment updated successfully!');
    } catch (error) {
      console.error('Error updating comment:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }
    setIsDeleting(true);
    try {
      await handleDeleteComment(commentId);
      console.log('Comment deleted successfully!'); 
    } catch (error) {
      console.error('Error deleting comment:', error); 
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comments">
      <div className="flex flex-col h-[500px]">
        {' '}
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
                  <div className="flex space-x-2">
                    {currentUserId && ( 
                      <>
                        {comment.author?.id === currentUserId && (
                          <button
                            className="text-gray-600 hover:text-blue-500 disabled:opacity-50"
                            onClick={() => handleStartEdit(comment)}
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
                        {(comment.author?.id === currentUserId ||
                          postOwnerId === currentUserId) && (
                          <button
                            className="text-gray-600 hover:text-red-500 disabled:opacity-50"
                            onClick={() => handleDelete(comment.id)}
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

                {editingCommentId === comment.id ? (
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
            disabled={isSubmitting || editingCommentId !== null} 
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;
