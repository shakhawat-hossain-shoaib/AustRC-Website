import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCJ_2GHarIYlhYonz1aB33j_nKJ7vi2pM8",
  authDomain: "aust-robotics-club-app-1cfd8.firebaseapp.com",
  projectId: "aust-robotics-club-app-1cfd8",
  storageBucket: "aust-robotics-club-app-1cfd8.firebasestorage.app",
  messagingSenderId: "372646948771",
  appId: "1:372646948771:web:bfb6d873318c9ee27eb416",
  measurementId: "G-YWX0HWSG81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;