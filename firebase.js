import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB5XdHDZBki78CWxgXq6AYENG9CJgOYoDQ",
  authDomain: "geekbuddy-1c0b1.firebaseapp.com",
  projectId: "geekbuddy-1c0b1",
  storageBucket: "geekbuddy-1c0b1.appspot.com",
  messagingSenderId: "407081205403",
  appId: "1:407081205403:web:04c381b8f39e672fcf103e",
  measurementId: "G-4DD93XGX2S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth ,db};
