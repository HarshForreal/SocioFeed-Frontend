import { useState } from 'react';
import { savePost, unsavePost } from '../api/posts';

export const useSavePost = (postId, initiallySaved = false) => {
  const [isSaved, setIsSaved] = useState(initiallySaved);
  const [isSaving, setIsSaving] = useState(false);

  const toggleSave = async () => {
    if (!postId) return;
    try {
      setIsSaving(true);
      if (isSaved) {
        await unsavePost(postId);
      } else {
        await savePost(postId);
      }
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving post:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return { isSaved, isSaving, toggleSave };
};
