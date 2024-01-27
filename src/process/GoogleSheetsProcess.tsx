import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
import { IItemsData } from '../constants/interfaces/IItemsData';


/*// Function to add a new path for the user
export const addPath = async (userUid: any, pathName: any) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const pathsCollectionRef = collection(userDocRef, 'paths');

        // Add a new document to the paths subcollection
        const newPathRef = await addDoc(pathsCollectionRef, {
            pathName: pathName,
            pathId: pathName.toLowerCase().replace(/ /g, '-'),
            items: [],
            // Add other properties as needed
        });

        console.log(`Path created for user ${userUid}. Path ID: ${newPathRef.id}`);
        return newPathRef.id; // Return the generated path ID if needed
    } catch (error: any) {
        console.error('Error creating path:', error.message);
    }
};
*/
export const addPath = async (userUid: any, pathName: any, pathImage?: any) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const pathsCollectionRef = collection(userDocRef, 'paths');

        // Check if a path with the same pathId already exists
        const existingPathQuery = query(
            pathsCollectionRef,
            where('pathId', '==', pathName.toLowerCase().replace(/ /g, '-'))
        );
        const existingPathSnapshot = await getDocs(existingPathQuery);

        if (!existingPathSnapshot.empty) {
            // Path with the same pathId already exists
            console.log(`Path with pathId ${pathName.toLowerCase().replace(/ /g, '-')} already exists for user ${userUid}.`);
            // You can handle this situation as needed, e.g., throw an error or return null
            return null;
        }

        // Add a new document to the paths subcollection
        const newPathRef = await addDoc(pathsCollectionRef, {
            pathImage: pathImage,
            pathName: pathName,
            pathId: pathName
                .toLowerCase()
                .replace(/ /g, '-')
                .normalize('NFD') // Normalization Form Canonical Decomposition
                .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                .replace(/[^a-z0-9-]/g, ''),
            items: [],
            // Add other properties as needed
        });

        console.log(`Path created for user ${userUid}. Path ID: ${newPathRef.id}`);
        return newPathRef.id; // Return the generated path ID if needed
    } catch (error: any) {
        console.error('Error creating path:', error.message);
        return null;
    }
};

// Function to add a new item to a specific path
export const addItemToPath = async (userUid: any, pathId: any, itemData: any) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const pathDocRef = doc(userDocRef, 'paths', pathId);

        // Update the path document to add a new item to the "items" array
        await updateDoc(pathDocRef, {
            items: arrayUnion(itemData),
        });

        console.log(`Item added to path ${pathId} for user ${userUid}.`);
    } catch (error: any) {
        console.error('Error adding item to path:', error.message);
    }
};

export const getUserData = async (userUid: any) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const pathsCollectionRef = collection(userDocRef, 'paths');

        // Get all documents from the "paths" subcollection
        const snapshot = await getDocs(pathsCollectionRef);

        // Extract data from each document in the subcollection
        const userData = snapshot.docs.map((doc: any) => doc.data());

        console.log(`User data retrieved for user ${userUid}:`, userData);
        return userData;
    } catch (error: any) {
        console.error('Error getting user data from Firestore:', error.message);
        return [];
    }
};


// Function to add a new item to a specific path using user-provided pathId
export const addItemToPathTwo = async (userUid: any, userProvidedPathId: any, itemData: IItemsData) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const pathsCollectionRef = collection(userDocRef, 'paths');

        // Check if a path with the user-provided pathId exists
        const pathQuery = query(
            pathsCollectionRef,
            where('pathId', '==', userProvidedPathId)
        );
        const pathQuerySnapshot = await getDocs(pathQuery);

        if (pathQuerySnapshot.empty) {
            // Path with the user-provided pathId does not exist
            console.log(`Path with pathId ${userProvidedPathId} does not exist for user ${userUid}.`);
            // You can handle this situation as needed, e.g., throw an error or return null
            return null;
        }

        const pathDocRef = pathQuerySnapshot.docs[0].ref;

        // Get the current path document data
        const pathDocSnapshot = await getDoc(pathDocRef);
        const currentItems = pathDocSnapshot.exists() ? pathDocSnapshot.data()?.items || [] : [];

        // Check if the item already exists in the array
        const itemAlreadyExists = currentItems.some((item: any) => item.itemId === itemData.id);

        if (!itemAlreadyExists) {
            // Update the path document to add a new item to the "items" array
            await updateDoc(pathDocRef, {
                items: arrayUnion(itemData),
            });

            console.log(`Item added to path ${userProvidedPathId} for user ${userUid}.`);
        } else {
            console.log(`Item with itemId ${itemData.id} already exists in path ${userProvidedPathId}.`);
            // You can handle this situation as needed, e.g., throw an error or return null
            return null;
        }
    } catch (error: any) {
        console.error('Error adding item to path:', error.message);
    }
};
