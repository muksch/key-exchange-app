import ListingCard from '../components/shared/ListingCard';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingContext';

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const { listings, isLoading } = useListings();

  return (
    <div>
      {!isLoggedIn && <h1>Vítejte v aplikaci Key Exchange. Pro zobrazení nabídek se přihlaste.</h1>}
      {isLoggedIn && (
        <div>
          <h1>Available Key Exchanges</h1>
          {isLoading && <p>Loading data...</p>}
          <main className="listing-grid">{!isLoading && listings.map((listing) => <ListingCard key={listing.id} id={listing.id} title={listing.title} location={listing.location} points={listing.points} imageUrl={listing.imageUrl} />)}</main>
        </div>
      )}
    </div>
  );
};

export default HomePage;
