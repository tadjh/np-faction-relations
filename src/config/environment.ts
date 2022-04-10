export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';

export const DOMAIN_NAME = window.location.hostname;
export const PORT = window.location.port;

export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
export const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
export const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
export const MESSAGING_SENDER_ID =
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
export const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
export const RECAPTCHA_KEY = process.env.REACT_APP_FIREBASE_RECAPTCHA;

export const AUTH_EMULATOR_URL = 'http://localhost:9099';
export const FIRESTORE_EMULATOR_HOST = 'localhost';
export const FIRESTORE_EMULATOR_PORT = 8080;

export const COLLECTION_FACTIONS = 'factions';
export const COLLECTION_HISTORY = 'history';
export const COLLECTION_USERS = 'users';
