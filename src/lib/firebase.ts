// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJqCKkPLYwLJVRA7wQY5BWmUwbGI5Hy8c", // זה מפתח API דמיוני - יש להחליף אותו במפתח האמיתי שלך
  authDomain: "shahar-golan-blog.firebaseapp.com",
  projectId: "shahar-golan-blog",
  storageBucket: "shahar-golan-blog.appspot.com",
  messagingSenderId: "123456789012", // יש להחליף במספר האמיתי שלך
  appId: "1:123456789012:web:abcdef1234567890abcdef" // יש להחליף במזהה האמיתי שלך
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
