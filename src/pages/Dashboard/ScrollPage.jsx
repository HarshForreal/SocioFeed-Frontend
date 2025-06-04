import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { fetchFeedPosts, clearFeedPosts } from '../../store/slices/feedSlice';

const ScrollPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, page, hasMore } = useSelector(
    (state) => state.feed
  );
  console.log('Post from Scroll Page', posts);
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchFeedPosts({ page, limit: 10 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch, page]
  );

  useEffect(() => {
    dispatch(clearFeedPosts());
    dispatch(fetchFeedPosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Your Feed</h2>

      {posts.length === 0 && !loading && <p>No posts to display.</p>}

      {posts.map((post, idx) => {
        if (idx === posts.length - 1) {
          return <Post ref={lastPostRef} key={post.id} post={post} />;
        } else {
          return <Post key={post.id} post={post} />;
        }
      })}

      {loading && <p>Loading more posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!hasMore && <p>You&apos;re all caught up!</p>}
    </div>
  );
};

export default ScrollPage;
