import { createContext } from 'react';

export interface AuthContextType {
  user: string | null;
  signIn: (email: string, password: string) => Promise<string>;
  signOut: () => void;
  isSignedIn: () => boolean;
}

let AuthContext = createContext<AuthContextType>(null!);

export default AuthContext;
