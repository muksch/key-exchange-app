import { createContext, useContext, useState, useEffect } from 'react';
import { listingsCollectionRef } from '../firebaseConfig';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const storage = getStorage();
  const [listings, setListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      listingsCollectionRef,
      (snapshot) => {
        try {
          const mappedListings = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setListings(mappedListings);
          setIsLoading(false);
        } catch (error) {
          console.error('Error mapping data from Firestore:', error);
          setListings([]);
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Connection error with Firestore:', error);
        setListings([]);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const getListingById = (id) => {
    if (!listings) return undefined;
    const listingIdString = String(id);
    return listings.find((listingItem) => listingIdString === listingItem.id);
  };

  const createListingImage = async (file) => {
    try {
      const metadata = { contentType: file?.type || 'image/jpeg' };
      const uniqueName = `${crypto?.randomUUID ? crypto.randomUUID() : Date.now()}_${file.name}`;
      const storageRef = ref(storage, 'images/' + uniqueName);
      await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(storageRef);
      return { success: true, url: downloadURL, path: `images/${uniqueName}` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  const createListing = async ({ title, location, points, imageUrl }) => {
    try {
      const docRef = await addDoc(listingsCollectionRef, {
        title: title,
        location: location,
        points: points,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const contextValue = {
    listings,
    isLoading,
    getListingById,
    createListingImage,
    createListing,
  };

  return <ListingsContext.Provider value={contextValue}>{children}</ListingsContext.Provider>;
};

export const useListings = () => {
  return useContext(ListingsContext);
};
