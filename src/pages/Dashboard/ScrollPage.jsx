// import React, { useEffect, useRef, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Post from '../../components/Post/Post';
// import { fetchFeedPosts, clearFeedPosts } from '../../store/slices/feedSlice';

// const ScrollPage = () => {
//   const dispatch = useDispatch();
//   const { posts, loading, error, page, hasMore } = useSelector(
//     (state) => state.feed
//   );
//   const observer = useRef();

//   const lastPostRef = useCallback(
//     (node) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           dispatch(fetchFeedPosts({ page, limit: 10 }));
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore, dispatch, page]
//   );

//   useEffect(() => {
//     dispatch(clearFeedPosts());
//     dispatch(fetchFeedPosts({ page: 1, limit: 10 }));
//   }, [dispatch]);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h2 className="mb-4 instrument text-2xl"></h2>

//       {posts.length === 0 && !loading && <p>No posts to display.</p>}

//       {posts.map((post, idx) => {
//         if (idx === posts.length - 1) {
//           return <Post ref={lastPostRef} key={post.id} post={post} />;
//         } else {
//           return <Post key={post.id} post={post} />;
//         }
//       })}

//       {loading && <p>Loading more posts...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!hasMore && <p>You&apos;re all caught up!</p>}
//     </div>
//   );
// };

// export default ScrollPage;

import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { fetchFeedPosts, clearFeedPosts } from '../../store/slices/feedSlice';
import { useInView } from 'react-intersection-observer'; // Import from react-intersection-observer

const ScrollPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, page, hasMore } = useSelector(
    (state) => state.feed
  );

  // Intersection Observer hook for infinite scrolling
  const { ref, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView && !loading && hasMore) {
        dispatch(fetchFeedPosts({ page, limit: 5 })); // Fetch next 5 posts when user scrolls to bottom
      }
    },
  });

  useEffect(() => {
    dispatch(clearFeedPosts());
    dispatch(fetchFeedPosts({ page: 1, limit: 5 })); // Fetch first 5 posts initially
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {posts.length === 0 && !loading && <p>No posts to display.</p>}

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {/* Loading more indicator */}
      {loading && <p>Loading more posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!hasMore && <p>You&apos;re all caught up!</p>}

      {/* Trigger element for the intersection observer */}
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default ScrollPage;
