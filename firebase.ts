import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity check as per guidelines
async function testConnection() {
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDocFromServer(testDoc);
    console.log("Firebase connected successfully");
  } catch (error) {
    if (error instanceof Error && (error.message.includes('offline') || error.message.includes('permission'))) {
      console.warn("Firebase connection check: " + error.message);
    }
  }
}

testConnection();
