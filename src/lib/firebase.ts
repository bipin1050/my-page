// Firebase is loaded on demand (only when someone sends or reads a message),
// so it never weighs down the initial page load.
const firebaseConfig = {
  apiKey: "AIzaSyC7yGVBCGfgBqzIue6uPcNpMNSFBrm-6Mk",
  authDomain: "mypage-17851.firebaseapp.com",
  projectId: "mypage-17851",
  storageBucket: "mypage-17851.appspot.com",
  messagingSenderId: "1047163970659",
  appId: "1:1047163970659:web:5a4340e51c75434209c456",
};

export async function getMessagesCollection() {
  const [{ initializeApp, getApps }, firestore] = await Promise.all([import("firebase/app"), import("firebase/firestore")]);
  const app = getApps()[0] ?? initializeApp(firebaseConfig);
  const db = firestore.getFirestore(app);
  return { firestore, collection: firestore.collection(db, "message") };
}

export type Message = { name: string; email: string; message: string };
