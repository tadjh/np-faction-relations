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
import { Role, Roles, User } from '../../types';
import { getDoc } from 'firebase/firestore';

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'roles'> | null>(null);
  const [roles, setRoles] = useState<Roles | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({ uid: user.uid, displayName: user.displayName });
        try {
          const doc = await getDoc(userDocumentReference(user.uid));
          const data = doc.data();
          setRoles(data?.roles);
        } catch (error) {
          throw error;
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const checkAuthorization = (roles: Roles, allowed: Role[]): boolean => {
    // if (!user) return false;
    if (!roles) return false;
    for (let role of allowed) {
      if (roles[role]) return true;
    }
    return false;
  };

  const canCreate = (roles: Roles | null): boolean => {
    if (!roles) return false;
    const allowed: Role[] = ['admin'];
    return checkAuthorization(roles, allowed);
  };

  const canRead = (roles: Roles | null): boolean => {
    if (!roles) return false;
    const allowed: Role[] = ['admin', 'editor', 'subscriber'];
    return checkAuthorization(roles, allowed);
  };
  const canEdit = (roles: Roles | null): boolean => {
    if (!roles) return false;
    const allowed: Role[] = ['admin', 'editor'];
    return checkAuthorization(roles, allowed);
  };

  const canDelete = (roles: Roles | null): boolean => {
    if (!roles) return false;
    const allowed: Role[] = ['admin'];
    return checkAuthorization(roles, allowed);
  };

  let value = {
    user,
    roles,
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
