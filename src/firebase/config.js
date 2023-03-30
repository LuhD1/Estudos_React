import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrkAtvoCRPx9Yt4bqkdjPKqsJWmRosdSk",
  authDomain: "web-bibliotech.firebaseapp.com",
  projectId: "web-bibliotech",
  storageBucket: "web-bibliotech.appspot.com",
  messagingSenderId: "394713894485",
  appId: "1:394713894485:web:90cd9f8c0297e5e3224edc",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);