import ListingCard from '../components/shared/ListingCard';

const mockListings = [
  { id: 1, title: 'Byt u moře', location: 'Split, Chorvatsko', points: 950, imageUrl: 'https://via.placeholder.com/300x200?text=Split+Home' },
  { id: 2, title: 'Centrum Prahy', location: 'Praha 1, Česko', points: 1100, imageUrl: 'https://via.placeholder.com/300x200?text=Prague+Apt' },
  { id: 3, title: 'Horská chata', location: 'Alpy, Rakousko', points: 750, imageUrl: 'https://via.placeholder.com/300x200?text=Alpine+Chalet' },
];

const HomePage = () => {
  return (
    <div>
      <h1>Available Key Exchanges</h1>
      <main className="listing-grid">
        {mockListings.map((listing) => (
          <ListingCard key={listing.id} id={listing.id} title={listing.title} location={listing.location} points={listing.points} imageUrl={listing.imageUrl} />
        ))}
      </main>
    </div>
  );
};

export default HomePage;
