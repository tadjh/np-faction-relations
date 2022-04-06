import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  signOut as signOutUser,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { TimestampedFactionProps } from '../types';
import { IS_DEVELOPMENT, IS_PRODUCTION } from './constants';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
const RECAPTCHA_KEY = process.env.REACT_APP_FIREBASE_RECAPTCHA;

if (IS_DEVELOPMENT) console.log(PROJECT_ID);

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(RECAPTCHA_KEY!),
  isTokenAutoRefreshEnabled: true,
});

auth.useDeviceLanguage();

if (IS_DEVELOPMENT)
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
if (IS_DEVELOPMENT) connectFirestoreEmulator(db, 'localhost', 8080);

// TODO Scope? https://developers.google.com/identity/protocols/googlescopes?authuser=0
const provider = new GoogleAuthProvider();

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (IS_PRODUCTION) logEvent(analytics, 'login');

    const userRef = doc(db, 'users', result.user.uid);
    // TODO doesn't show in onAuthChanged, happens after
    await setDoc(
      userRef,
      {
        lastLogin: serverTimestamp(),
        displayName: result.user.displayName,
        email: result.user.email,
      },
      { merge: true }
    );

    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential && credential.accessToken; // TODO Do something with this?
    // const { displayName, email, uid } = result.user;
    // return { displayName, email, uid };
  } catch (error) {
    throw error;
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
  }
};

export const signOut = async () => await signOutUser(auth);

// references
export const COLLECTION_FACTIONS = 'factions';
export const COLLECTION_USERS = 'users';
export const FACTION_COLLECTION_REFERENCE = collection(
  db,
  COLLECTION_FACTIONS
) as CollectionReference<TimestampedFactionProps>;
export const factionDocumentReference = (id: string) =>
  doc(db, COLLECTION_FACTIONS, id);
export const userDocumentReference = (id: string) =>
  doc(db, COLLECTION_USERS, id);
