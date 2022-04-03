import { ReactNode, useState } from 'react';
import AuthContext from '../../contexts/auth.context';
import { auth, signIn, signOut } from '../../config/firebase';
import { sanitize } from 'dompurify';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.uid;
        setUser(sanitize(name));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => console.log('status:', user ? 'logged in' : 'logged out'));

  const isSignedIn = !!user;

  let value = { user, isSignedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
