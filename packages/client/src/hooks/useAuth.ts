import { useContext } from 'react';
import AuthContext from '../config/context';

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
