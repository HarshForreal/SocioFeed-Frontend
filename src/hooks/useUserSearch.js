import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { searchUsers, followUser, unfollowUser } from '../api/user'; // ✅ Ensure this is the correct path

const useUserSearch = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followingSet, setFollowingSet] = useState(new Set());

  const fetchUsers = useCallback(async (searchTerm) => {
    if (!searchTerm) {
      setUsers([]);
      return;
    }
    setLoading(true);
    try {
      const res = await searchUsers(searchTerm);
      const fetchedUsers = res.data.users;
      setUsers(fetchedUsers);

      // build following set based on API response
      const followed = new Set(
        fetchedUsers.filter((user) => user.isFollowing).map((user) => user.id)
      );
      setFollowingSet(followed);
    } catch (err) {
      toast.error('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Same debounce logic as before
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query, fetchUsers]);

  const toggleFollow = async (userId) => {
    const isFollowing = followingSet.has(userId);
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        toast.success('Unfollowed user');
      } else {
        await followUser(userId);
        toast.success('Followed user');
      }

      setFollowingSet((prev) => {
        const updated = new Set(prev);
        if (isFollowing) updated.delete(userId);
        else updated.add(userId);
        return updated;
      });
    } catch (err) {
      toast.error('Failed to update follow status');
      console.error(err);
    }
  };

  return {
    query,
    setQuery,
    users,
    loading,
    followingSet,
    toggleFollow,
  };
};

export default useUserSearch;
