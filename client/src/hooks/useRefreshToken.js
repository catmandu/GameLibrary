import { useLayoutEffect, useContext } from 'react';
import UserContext from '../context/main/user/userContext';

const useRefreshToken = () => {
  const { user, GetUser } = useContext(UserContext);

  useLayoutEffect(() => {
    if (user === null) {
      GetUser();
    }
  }, []);
};

export default useRefreshToken;
