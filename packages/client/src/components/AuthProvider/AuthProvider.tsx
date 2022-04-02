import { ReactNode, useState } from 'react';
// import { fakeAuthProvider } from '../../config/auth';
import AuthContext from '../../config/context';
import { signInUser, signOutUser } from '../../config/firebase';

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInUser(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const isSignedIn = () => !!user;

  let value = { user, signIn, signOut, isSignedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
