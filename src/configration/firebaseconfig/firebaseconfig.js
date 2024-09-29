import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB8HucL7uh2Ba7eCegluHZdQZLTP75i1aw",
    authDomain: "blogwebsite-91792.firebaseapp.com",
    projectId: "blogwebsite-91792",
    storageBucket: "blogwebsite-91792.appspot.com",
    messagingSenderId: "417934005053",
    appId: "1:417934005053:web:3a8f22e4ba21a887ac6b54",
    measurementId: "G-ZWGJQMK2DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export default app