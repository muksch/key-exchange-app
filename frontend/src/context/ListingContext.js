import { createContext, useContext, useState, useEffect } from 'react';
import { listingsCollectionRef, getDocs } from '../firebaseConfig';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        console.log('Loading listings');
        const data = await getDocs(listingsCollectionRef);

        const mappedListings = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setListings(mappedListings);
        console.log('Listing loaded:', mappedListings);
      } catch (error) {
        console.error('Error fetching listings from Firestore:', error);
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getListingById = (id) => {
    if (!listings) return undefined;
    const listingIdString = String(id);
    return listings.find((listingItem) => listingIdString === listingItem.id);
  };

  const contextValue = {
    listings,
    isLoading,
    getListingById,
  };

  return <ListingsContext.Provider value={contextValue}>{children}</ListingsContext.Provider>;
};

export const useListings = () => {
  return useContext(ListingsContext);
};
