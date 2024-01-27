import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
import { IItemsData } from '../constants/interfaces/IItemsData';
import { IPathData } from '../constants/interfaces/IPathData';


export const addPath = async (userUid: any, pathData: IPathData) => {
    try {
        const userDocRef = doc(db, 'users', userUid);
        const pathsCollectionRef = collection(userDocRef, 'paths');

        // Check if a path with the same pathId already exists
        const existingPathQuery = query(
            pathsCollectionRef,
            where('pathId', '==', pathData.pathName.toLowerCase().replace(/ /g, '-'))
        );
        const existingPathSnapshot = await getDocs(existingPathQuery);

        if (!existingPathSnapshot.empty) {
            // Path with the same pathId already exists
            console.log(`Path with pathId ${pathData.pathName.toLowerCase().replace(/ /g, '-')} already exists for user ${userUid}.`);
            // You can handle this situation as needed, e.g., throw an error or return null
            return null;
        }

        // Add a new document to the paths subcollection
        const newPathRef = await addDoc(pathsCollectionRef, {
            pathImage: pathData.pathImage,
            pathName: pathData.pathName,
            pathId: pathData.pathName
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
export const addItemToPath = async (userUid: any, userProvidedPathId: any, itemData: IItemsData) => {
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
        const existingItemIndex = currentItems.findIndex((item: IItemsData) => item.id === itemData.id);

        if (existingItemIndex === -1) {
            // Item doesn't exist, add it to the "items" array
            await updateDoc(pathDocRef, {
                items: arrayUnion(itemData),
            });

            console.log(`Item added to path ${userProvidedPathId} for user ${userUid}.`);
        } else {
            // Item exists, update it with the new data
            currentItems[existingItemIndex] = { ...currentItems[existingItemIndex], ...itemData };

            await updateDoc(pathDocRef, {
                items: currentItems,
            });

            console.log(`Item with itemId ${itemData.id} updated in path ${userProvidedPathId}.`);
        }
    } catch (error: any) {
        console.error('Error adding/updating item in path:', error.message);
    }
};

// Function to delete an item from a specific path using user-provided pathId and itemId
export const deleteItemFromPath = async (userUid: any, userProvidedPathId: any, item: IItemsData) => {
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

        // Find the index of the item with the provided itemId
        const itemIndexToDelete = currentItems.findIndex((item: IItemsData) => item.id === item.id);

        if (itemIndexToDelete !== -1) {
            // Remove the item from the array
            currentItems.splice(itemIndexToDelete, 1);

            // Update the path document with the modified items array
            await updateDoc(pathDocRef, {
                items: currentItems,
            });

            console.log(`Item with itemId ${item.id} deleted from path ${userProvidedPathId}.`);
            return true;
        } else {
            // Item with the provided itemId not found
            console.log(`Item with itemId ${item.id} not found in path ${userProvidedPathId}.`);
            return null
        }
    } catch (error: any) {
        console.error('Error deleting item from path:', error.message);
    }
};

// Function to edit a path's information
export const editPath = async (userUid: any, userProvidedPathId: any, updatedPathData: Partial<IPathData>) => {
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

        // Update the path document with the new data
        await updateDoc(pathDocRef, updatedPathData);

        console.log(`Path ${userProvidedPathId} updated for user ${userUid}.`);
        return true;
    } catch (error: any) {
        console.error('Error updating path:', error.message);
        return null;
    }
};
