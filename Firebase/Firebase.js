import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBoh4B2oFgooMEMKNVhLMXG4H9ObkLcexg",
  authDomain: "sorteiajoke.firebaseapp.com",
  projectId: "sorteiajoke",
  storageBucket: "sorteiajoke.appspot.com",
  messagingSenderId: "688185454762",
  appId: "1:688185454762:web:cccdc4f9fc00c7f950e0d3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);