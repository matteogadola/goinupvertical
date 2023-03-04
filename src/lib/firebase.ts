// import 'server-only';
import { initializeApp } from 'firebase/app';
import { Firestore } from '@google-cloud/firestore';

//const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);

//const app = initializeApp(firebaseConfig);

export const db = new Firestore({
  projectId: process.env.GOOGLE_PROJECTID,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
});
