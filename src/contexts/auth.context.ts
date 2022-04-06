import { createContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  canCreate: (user: User | null) => boolean;
  canRead: (user: User | null) => boolean;
  canEdit: (user: User | null) => boolean;
  canDelete: (user: User | null) => boolean;
}

let AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
