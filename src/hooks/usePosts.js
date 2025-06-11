import { useState, useEffect } from 'react';
import { fetchUserPosts } from '../store/thunks/postThunks';

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
        console.log('Fetching posts for user ID:', userId);
        const response = await fetchUserPosts({ userId });

        console.log('Fetched posts:', response.data.post);
        if (response.data) {
          setPosts(response.data);
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
