import { initializeApp } from 'firebase/app'; // Importing the initializeApp function from the 'firebase/app' module
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'; // Importing various functions and objects from the 'firebase/auth' module

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase configuration object containing API keys and other credentials
const firebaseConfig = {
  apiKey: "AIzaSyCMKCSWvQ4UeXc4PPUuCoad8XRlsR23IyQ",
  authDomain: "crwn-clothing-db-76082.firebaseapp.com",
  projectId: "crwn-clothing-db-76082",
  storageBucket: "crwn-clothing-db-76082.appspot.com",
  messagingSenderId: "1098148900978",
  appId: "1:1098148900978:web:ac2b2221aa3bbdb76392eb"
};

const firebaseApp = initializeApp(firebaseConfig); // Initializing the Firebase app with the provided configuration

const provider = new GoogleAuthProvider(); // Creating a new instance of the GoogleAuthProvider class

provider.setCustomParameters({
  prompt: 'select_account',
}); // Setting custom parameters for the Google sign-in provider

export const auth = getAuth(); // Getting the authentication instance from Firebase
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // Function to initiate Google sign-in using a popup

export const db = getFirestore(); // Getting the Firestore instance from Firebase

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid); // Creating a document reference for the user in the 'users' collection using the user's UID

  const userSnapshot = await getDoc(userDocRef); // Retrieving the document snapshot for the user from Firestore

  if (!userSnapshot.exists()) { // Checking if the user document exists
    const { displayName, email } = userAuth; // Extracting the display name and email from the user authentication object
    const createdAt = new Date(); // Creating a new Date object for the current timestamp

    try {
      await setDoc(userDocRef, { // Creating the user document in Firestore
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message); // Logging an error message if there's an error creating the user document
    }
  }

  return userDocRef; // Returning the user document reference
};