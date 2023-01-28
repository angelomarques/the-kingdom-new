import { signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
// import {} from 'next-firebase-auth'
import { createContext, FunctionComponent, ReactNode, useState } from 'react';
import { auth, db, googleProvider } from '../services/firebase';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const responseUser = response.user;
      const user: User = {
        uid: responseUser.uid,
        name: responseUser.displayName,
        authProvider: 'google',
        email: responseUser.email,
      };

      const userDocsQuery = query(
        collection(db, 'users'),
        where('uid', '==', user.uid)
      );
      const docsSnapshot = await getDocs(userDocsQuery);

      if (docsSnapshot.docs.length === 0) {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, user);
      }

      setIsAuthenticated(true);
      setUser(user);
    } catch (err) {
      console.error(err);
      // alert(err.message);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
