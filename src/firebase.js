import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-3I6f96GjBdFyly55YhUp6eOiVQxSXWI",
  authDomain: "summa-dc073.firebaseapp.com",
  projectId: "summa-dc073",
  storageBucket: "summa-dc073.firebasestorage.app",
  messagingSenderId: "457578448326",
  appId: "1:457578448326:web:ef193e3b1a63b3b5af1ec7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;