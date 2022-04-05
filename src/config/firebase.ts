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
} from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { TimestampedFactionProps } from '../types';
import { IS_DEVELOPMENT } from './constants';

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
const recaptchaKey = process.env.REACT_APP_FIREBASE_RECAPTCHA || '';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(recaptchaKey),
  isTokenAutoRefreshEnabled: true,
});

auth.useDeviceLanguage();

if (IS_DEVELOPMENT)
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
if (IS_DEVELOPMENT) connectFirestoreEmulator(db, 'localhost', 8080);

// TODO Scope? https://developers.google.com/identity/protocols/googlescopes?authuser=0
const provider = new GoogleAuthProvider();

export const signOut = async () => await signOutUser(auth);

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token =
    //   credential && credential.accessToken ? credential.accessToken : ''; // TODO Do something with this?
    logEvent(analytics, 'login');
    const user = result.user;
    return user.displayName || user.email || user.uid;
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

export const COLLECTION_FACTIONS = 'factions';

export const FACTION_COLLECTION_REFERENCE = collection(
  db,
  COLLECTION_FACTIONS
) as CollectionReference<TimestampedFactionProps>;

export const factionDocumentReference = (id: string) =>
  doc(db, COLLECTION_FACTIONS, id);

// TODO logEvent(analytics, 'select_content');
