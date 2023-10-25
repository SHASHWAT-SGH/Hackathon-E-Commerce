import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0tOl0cxMoFvnrrWj8pIHOrgVGiGfdk8g",
  authDomain: "hackathon-e-commerce-d51d9.firebaseapp.com",
  projectId: "hackathon-e-commerce-d51d9",
  storageBucket: "hackathon-e-commerce-d51d9.appspot.com",
  messagingSenderId: "949071047522",
  appId: "1:949071047522:web:178441a0ff70d1128f1a3b",
  measurementId: "G-H5Z8K376N1",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
