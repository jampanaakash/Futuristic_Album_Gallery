// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Firebase configuration copied from your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyDdlycZooWjNthrwMUmr-ceGmjacF9dSag",
  authDomain: "futuristic-album-gallery.firebaseapp.com",
  projectId: "futuristic-album-gallery",
  storageBucket: "futuristic-album-gallery.firebasestorage.app",
  messagingSenderId: "998656016044",
  appId: "1:998656016044:web:0cf8f658ff9ecc4e15e909",
  measurementId: "G-LCZWZSY928"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Setup Firebase Auth & Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Allowed email addresses for login
const allowedEmails = [
  "pmadhusreereddy_it201242@mgit.ac.in",
  "bnikitha_it201207@mgit.ac.in",
  "bjayasree_it201209@mgit.ac.in",
  "bsumanth_it201208@mgit.ac.in",
  "ypranavanreddy_it201260@mgit.ac.in",
  "akashkumarreddy955@gmail.com"
];

// ✅ Export everything needed
export { auth, googleProvider, allowedEmails };
