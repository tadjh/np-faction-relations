import { ReactNode, useState } from 'react';
import AuthContext from '../../contexts/auth.context';
import {
  auth,
  signIn,
  signOut,
  userDocumentReference,
} from '../../config/firebase';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Role, User } from '../../types';
import { useCallback } from 'react';
import { DocumentSnapshot, getDoc } from 'firebase/firestore';

function AuthProvider({ children }: { children: ReactNode }) {
  let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const doc = (await getDoc(
            userDocumentReference(user.uid)
          )) as DocumentSnapshot<User>;

          const data = doc.data();

          setUser({
            uid: user.uid,
            displayName: user.displayName,
            roles: data?.roles,
          });
        } catch (error) {}
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const isSignedIn = !!user;

  const checkAuthorization = useCallback(
    (user: User, allowed: Role[]): boolean => {
      // if (!user) return false;
      if (!user.roles) return false;
      for (let role of allowed) {
        if (user.roles[role]) return true;
      }
      return false;
    },
    []
  );

  const canCreate = useCallback(
    (user: User | null): boolean => {
      if (!user) return false;
      const allowed: Role[] = ['admin'];
      return checkAuthorization(user, allowed);
    },
    [checkAuthorization]
  );

  const canRead = useCallback(
    (user: User | null): boolean => {
      if (!user) return false;
      const allowed: Role[] = ['admin', 'editor', 'subscriber'];
      return checkAuthorization(user, allowed);
    },
    [checkAuthorization]
  );

  const canEdit = useCallback(
    (user: User | null): boolean => {
      if (!user) return false;
      const allowed: Role[] = ['admin', 'editor'];
      return checkAuthorization(user, allowed);
    },
    [checkAuthorization]
  );

  const canDelete = useCallback(
    (user: User | null): boolean => {
      if (!user) return false;
      const allowed: Role[] = ['admin'];
      return checkAuthorization(user, allowed);
    },
    [checkAuthorization]
  );

  let value = {
    user,
    isSignedIn,
    signIn,
    signOut,
    canCreate,
    canRead,
    canEdit,
    canDelete,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
