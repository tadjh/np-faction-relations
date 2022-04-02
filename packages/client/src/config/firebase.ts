import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
const emulatorDomain = process.env.REACT_APP_FIREBASE_EMULATOR_DOMAIN || '';

const firebaseApp = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

export const auth = getAuth(firebaseApp);

connectAuthEmulator(auth, emulatorDomain, { disableWarnings: true });

export const signInUser = async (username: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username,
      password
    );
    return (
      userCredential.user.displayName ||
      userCredential.user.email ||
      userCredential.user.uid
    );
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('logged in');
//     console.log(user);
//   } else {
//     console.log('logged out');
//   }
// });

// const uiConfig = {
//   signInOptions: [
//     auth.GoogleAuthProvider.PROVIDER_ID,
//     auth.EmailAuthProvider.PROVIDER_ID,
//   ],
// };

// const ui = new firebaseui.auth.AuthUI(auth);

// ui.start('#firebaseui-auth-container', uiConfig);
