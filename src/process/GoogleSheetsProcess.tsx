import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';

export const addDataToSheet = async (userUid: any, data: any) => {
    try {
        const sheetTitle = 'runtothehillsdata';
        const collectionRef = doc(db, sheetTitle, userUid);

        // Check if the data already exists in the entries array
        const snapshot = await getDoc(collectionRef);
        const existingData = snapshot.exists() ? snapshot.data().entries : [];

        if (!existingData.includes(data)) {
            // Data does not exist, add it to the collection
            await setDoc(collectionRef, { entries: arrayUnion(data) }, { merge: true });
            console.log(`Data added to Firestore collection for user ${userUid}.`);
        } else {
            console.log(`Data already exists in Firestore collection for user ${userUid}.`);
        }
    } catch (error: any) {
        console.error('Error adding data to Firestore collection:', error.message);
    }
};


export const getUserData = async (userUid: any) => {
    try {
        const sheetTitle = 'runtothehillsdata';
        const collectionRef = doc(db, sheetTitle, userUid);

        const snapshot = await getDoc(collectionRef);

        if (snapshot.exists()) {
            const userData = snapshot.data().entries || [];
            console.log(`User data retrieved for user ${userUid}:`, userData);
            return userData;
        } else {
            console.log(`No data found for user ${userUid}.`);
            return null;
        }
    } catch (error: any) {
        console.error('Error getting user data from Firestore:', error.message);
        return null;
    }
};


