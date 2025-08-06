import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdlycZooWjNthrwMUmr-ceGmjacF9dSag",
  authDomain: "futuristic-album-gallery.firebaseapp.com",
  projectId: "futuristic-album-gallery",
  storageBucket: "futuristic-album-gallery.firebasestorage.app", // ✅ FIXED HERE
  messagingSenderId: "998656016044",
  appId: "1:998656ff9ecc4e15e909",
  measurementId: "G-LCZWZSY928"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

const allowedEmails = [
  "pmadhusreereddy_it201242@mgit.ac.in",
  "bnikitha_it201207@mgit.ac.in",
  "bjayasree_it201209@mgit.ac.in",
  "bsumanth_it201208@mgit.ac.in",
  "ypranavanreddy_it201260@mgit.ac.in",
  "akashkumarreddy955@gmail.com"
];

export { auth, googleProvider, allowedEmails, db, storage };
