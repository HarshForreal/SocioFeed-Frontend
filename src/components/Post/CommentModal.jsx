import React, { useState } from 'react';
import Modal from '../common/Modal/Modal';
import TipTapEditor from '../common/Editor/TipTapEditor';

const CommentModal = ({ isOpen, onClose, comments = [], onSubmitComment }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = !content || content === '<p></p>';
    if (isEmpty) return;

    await onSubmitComment(content);
    setContent('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comments">
      <div className="flex flex-col max-h-[500px] ">
        {/* Scrollable Comments Section */}
        <div className="flex-1 overflow-y-auto space-y-4 px-1 pb-2 geist">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-2 bg-gray-100 rounded">
                <div className="font-semibold mb-1">
                  {comment.author.username}
                </div>
                <div
                  className="prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Fixed Editor Section */}
        <form
          onSubmit={handleSubmit}
          className="pt-2 border-t mt-2 space-y-2 bg-white"
        >
          <TipTapEditor
            content={content}
            onChange={(html) => setContent(html)}
            editable={true}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Post
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CommentModal;
