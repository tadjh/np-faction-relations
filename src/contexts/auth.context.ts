import { createContext } from 'react';
import { Roles, User } from '../types';

export interface AuthContextType {
  user: Omit<User, 'roles'> | null;
  roles: Roles | null;
  signIn: () => Promise<void>;
  signOut: (callback: VoidFunction) => void;
  canCreate: (roles: Roles | null) => boolean;
  canRead: (roles: Roles | null) => boolean;
  canEdit: (roles: Roles | null) => boolean;
  canDelete: (roles: Roles | null) => boolean;
}

let AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
