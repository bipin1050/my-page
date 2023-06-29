import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7yGVBCGfgBqzIue6uPcNpMNSFBrm-6Mk",
  authDomain: "mypage-17851.firebaseapp.com",
  projectId: "mypage-17851",
  storageBucket: "mypage-17851.appspot.com",
  messagingSenderId: "1047163970659",
  appId: "1:1047163970659:web:5a4340e51c75434209c456",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
