import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProfile,
  selectToken,
} from '@features/authentication/store/user/slice';

export const AuthenticationProvider = ({children}) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const getUserInfo = useCallback(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const checkAuth = useCallback(() => {
    if (token) {
      getUserInfo();
    }
  }, [getUserInfo, token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return children;
};
