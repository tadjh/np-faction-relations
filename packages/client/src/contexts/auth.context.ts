import { createContext } from 'react';

export interface AuthContextType {
  user: string | null;
  isSignedIn: boolean;
  signIn: () => Promise<string>;
  signOut: () => void;
}

let AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
