// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, where} from 'firebase/firestore';
import {DetailCharacterInterface} from "@/utils/interfaces";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXX3qGm-zBCWOh0XsTXEv8YBmLOZL1J4g",
    authDomain: "recruitment-mostrans.firebaseapp.com",
    projectId: "recruitment-mostrans",
    storageBucket: "recruitment-mostrans.appspot.com",
    messagingSenderId: "773300565887",
    appId: "1:773300565887:web:693d4b5ff8d209d3bb0c4a",
    measurementId: "G-XBQTKJV91K"
};

let app, db: any;

// Initialize Firebase
if (typeof window !== "undefined") {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    db = getFirestore(app);
} else {
    db = null; // Set db to null if not running in the browser
}

const addCharacterToLocation = async (location: string, character: DetailCharacterInterface) => {
    try {
        const q = query(collection(db, 'locations'), where('character.id', '==', character.character.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const existingLocationDoc = querySnapshot.docs[0];
            const existingLocationId = existingLocationDoc.id;
            await deleteDoc(doc(db, 'locations', existingLocationId));
            console.log('Existing character location removed successfully.');
        }

        const data = {
            location: location,
            character: character.character
        };
        await addDoc(collection(db, 'locations'), data);
        console.log('Character added to location successfully.');
    } catch (error) {
        console.error('Error adding character to location:', error);
    }
};

const getCharacterLocation = async (character: DetailCharacterInterface) => {
    try {
        const q = query(collection(db, 'locations'), where('character.id', '==', character.character.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const location = querySnapshot.docs[0].data().location;
            return location;
        }
    } catch (error) {
        console.error('Error getting character location:', error);
        return 'Error';
    }
}

const getAllLocations = async () => {
    try {
        const locationsArray: string[] = [];
        const querySnapshot = await getDocs(collection(db, 'locations'));
        querySnapshot.forEach((doc) => {
            const locationData = doc.data().location;
            if (locationData && !locationsArray.includes(locationData)) {
                locationsArray.push(locationData);
            }
        });
        return locationsArray;
    } catch (error) {
        console.error('Error getting locations:', error);
        return [];
    }
};


const getCharactersFromLocation = async (location: string) => {
    try {
        const characters: any[] = [];
        const q = query(collection(db, 'locations'), where('location', '==', location));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            characters.push(doc.data());
        });
        return characters;
    } catch (error) {
        console.error('Error getting characters by location:', error);
        return [];
    }
};

export {db, getCharactersFromLocation, addCharacterToLocation, getAllLocations, getCharacterLocation}
