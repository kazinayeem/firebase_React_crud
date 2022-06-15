// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA0UkLai0taVJzy8SHIbE17fCPG7IQjVA",
  authDomain: "todoappreact-b1c10.firebaseapp.com",
  projectId: "todoappreact-b1c10",
  storageBucket: "todoappreact-b1c10.appspot.com",
  messagingSenderId: "1042612142077",
  appId: "1:1042612142077:web:7638012c275a513b83a394",
  measurementId: "G-JK8XFT81BJ",
};

const app = initializeApp(firebaseConfig);

export const google_auth = getAuth(app);

export const firestore = getFirestore(app);
