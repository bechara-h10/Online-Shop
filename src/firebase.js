// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9lGqH0X9Y-a4TRURMfWtZi69ES5uuvvE",
  authDomain: "online-shop-2ad3f.firebaseapp.com",
  projectId: "online-shop-2ad3f",
  storageBucket: "online-shop-2ad3f.appspot.com",
  messagingSenderId: "648691282921",
  appId: "1:648691282921:web:d71d8e1aaa2f749c599178",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
