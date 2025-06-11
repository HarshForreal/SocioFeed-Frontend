import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifySession } from '../store/thunks/authThunks';
import { fetchUserProfile } from '../store/thunks/userThunks';

const useAuthSession = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);

  useEffect(() => {
    if (authUser?.username) {
      dispatch(fetchUserProfile(authUser.username));
    }
  }, [authUser?.username, dispatch]);
};

export default useAuthSession;
