import React, { useEffect, useState } from 'react';
import { fetchSavedPosts } from '../../api/posts';
import Post from '../../components/Post/Post';

const BookmarkPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedPosts = async () => {
      try {
        const { data } = await fetchSavedPosts();
        console.log('Saved Posts', data.posts);
        setSavedPosts(data.posts || []);
      } catch (err) {
        console.error('Failed to fetch saved posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSavedPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!savedPosts.length)
    return <div className="text-2xl geist ">No saved posts yet.</div>;

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <h1 className="instrument text-2xl">Favorites.</h1>
      {savedPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BookmarkPage;
