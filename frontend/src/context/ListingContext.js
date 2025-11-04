import { createContext, useContext } from 'react';

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const listing = [
    { id: 1, title: 'Byt u moře', location: 'Split, Chorvatsko', points: 950, imageUrl: 'https://via.placeholder.com/300x200?text=Split+Home' },
    { id: 2, title: 'Centrum Prahy', location: 'Praha 1, Česko', points: 1100, imageUrl: 'https://via.placeholder.com/300x200?text=Prague+Apt' },
    { id: 3, title: 'Horská chata', location: 'Alpy, Rakousko', points: 750, imageUrl: 'https://via.placeholder.com/300x200?text=Alpine+Chalet' },
  ];
  const getListingById = (id) => {
    const filteredListing = listing.filter((listingItem) => id === listingItem.id);
    return filteredListing;
  };

  const contextValue = {
    listing,
    getListingById,
  };
  return <ListingContext.Provider value={contextValue}>{children}</ListingContext.Provider>;
};

export const useListing = () => {
  return useContext(ListingContext);
};
