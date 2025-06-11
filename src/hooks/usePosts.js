// src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import { fetchUserPosts } from '../store/thunks/postThunks'; // Assuming this action exists

const usePosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching posts for user ID:', userId); // Add logging here
        const response = await fetchUserPosts({ userId });

        console.log('Fetched posts:', response.data.post); // Add logging here
        if (response.data) {
          setPosts(response.data); // Assuming response.data contains the posts
        } else {
          throw new Error('No posts data found');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return { posts, loading, error };
};

export default usePosts;
