import {useUserStore} from '../../store/userStore';
import { auth } from '../../../firebase';
import {useCallback} from 'react';

const useLogout = () => {
  const {setUser, setUsername} = useUserStore();

  const logout = useCallback(async () => {
    await auth().signOut();

    setUser(null);
    setUsername(null);
  }, [setUser, setUsername]);

  return {logout};
};

export default useLogout;
