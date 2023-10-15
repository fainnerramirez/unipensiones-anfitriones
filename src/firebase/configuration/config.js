import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBa7P6gW_wDkMtOszqY_s1iNTxvDmICdNk",
  authDomain: "unipensiones.firebaseapp.com",
  projectId: "unipensiones",
  storageBucket: "unipensiones.appspot.com",
  messagingSenderId: "422331287123",
  appId: "1:422331287123:web:c6a96856294709fd9028a6"
};

export const app = initializeApp(firebaseConfig);