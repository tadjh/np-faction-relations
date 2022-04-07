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
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            roles: doc.data()?.roles,
          });
        } catch (error) {
          throw error;
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkAuthorization = (user: User, allowed: Role[]): boolean => {
    // if (!user) return false;
    if (!user.roles) return false;
    for (let role of allowed) {
      if (user.roles[role]) return true;
    }
    return false;
  };

  const canCreate = (user: User | null): boolean => {
    if (!user) return false;
    const allowed: Role[] = ['admin'];
    return checkAuthorization(user, allowed);
  };

  const canRead = (user: User | null): boolean => {
    if (!user) return false;
    const allowed: Role[] = ['admin', 'editor', 'subscriber'];
    return checkAuthorization(user, allowed);
  };
  const canEdit = (user: User | null): boolean => {
    if (!user) return false;
    const allowed: Role[] = ['admin', 'editor'];
    return checkAuthorization(user, allowed);
  };

  const canDelete = (user: User | null): boolean => {
    if (!user) return false;
    const allowed: Role[] = ['admin'];
    return checkAuthorization(user, allowed);
  };

  let value = {
    user,
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
