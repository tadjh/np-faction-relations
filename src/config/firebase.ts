import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  signOut as signOutUser,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getPerformance } from 'firebase/performance';
import { Snapshot, TimestampedFaction } from '../types';
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  AUTH_EMULATOR_URL,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  RECAPTCHA_KEY,
  STORAGE_BUCKET,
  FIRESTORE_EMULATOR_HOST,
  FIRESTORE_EMULATOR_PORT,
  COLLECTION_FACTIONS,
  COLLECTION_USERS,
  COLLECTION_SNAPSHOT,
} from './environment';

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
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(RECAPTCHA_KEY!),
  isTokenAutoRefreshEnabled: true,
});
const analytics = getAnalytics(app);
export const perf = getPerformance(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
auth.useDeviceLanguage();

if (IS_DEVELOPMENT)
  connectAuthEmulator(auth, AUTH_EMULATOR_URL, { disableWarnings: true });
if (IS_DEVELOPMENT)
  connectFirestoreEmulator(
    db,
    FIRESTORE_EMULATOR_HOST,
    FIRESTORE_EMULATOR_PORT
  );

export const FACTION_COLLECTION_REFERENCE = collection(
  db,
  COLLECTION_FACTIONS
) as CollectionReference<TimestampedFaction>;

export const SNAPSHOT_COLLECTION_REFERENCE = collection(
  db,
  COLLECTION_SNAPSHOT
) as CollectionReference<Snapshot>;

export const factionDocumentReference = (id: string) =>
  doc(db, COLLECTION_FACTIONS, id);

export const userDocumentReference = (id: string) =>
  doc(db, COLLECTION_USERS, id);

export const FACTION_COLLECTION_QUERY = query<TimestampedFaction>(
  FACTION_COLLECTION_REFERENCE,
  where('visibility', '==', 'public'),
  orderBy('order')
);

export const signIn = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    if (IS_PRODUCTION) logEvent(analytics, 'login');

    const IS_NEW_USER = getAdditionalUserInfo(result)?.isNewUser;

    if (IS_NEW_USER) {
      await setDoc(userDocumentReference(result.user.uid), {
        displayName: result.user.displayName,
        email: result.user.email,
        roles: { admin: false, editor: false },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const signOut = async (callback: VoidFunction) => {
  try {
    await signOutUser(auth);
    callback();
  } catch (error) {
    throw error;
  }
};
