import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { fetchFeedPosts } from '../../store/thunks/feedThunks';
import { clearFeedPosts } from '../../store/slices/feedSlice';
import { useInView } from 'react-intersection-observer';

const ScrollPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, page, hasMore } = useSelector(
    (state) => state.feed
  );

  const { ref, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && !loading && hasMore) {
        dispatch(fetchFeedPosts({ page, limit: 5 }));
      }
    },
  });

  useEffect(() => {
    dispatch(clearFeedPosts());
    dispatch(fetchFeedPosts({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {posts.length === 0 && !loading && <p>No posts to display.</p>}
      <h1 className="text-2xl mb-4 instrument">Scroll Through.</h1>

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {loading && <p>Loading more posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!hasMore && <p>You&apos;re all caught up!</p>}

      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default ScrollPage;
