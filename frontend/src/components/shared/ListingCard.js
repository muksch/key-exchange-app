import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = ({ id, title, location, points, imageUrl }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const isInitialMount = useRef(true);

  const handleToggleFavorite = () => {
    setIsFavourite((prevIsFavourite) => !prevIsFavourite);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isFavourite) {
      console.log(`Listing ${title} has been FAVORITED.`);
    } else {
      console.log(`Listing ${title} has been UNFAVORITED.`);
    }
  }, [isFavourite, title]);

  return (
    <div className="listing-card">
      <div onClick={handleToggleFavorite} className="favourite-icon">
        {isFavourite ? (
          <span role="img" aria-label="Favorite">
            ❤️
          </span>
        ) : (
          <span role="img" aria-label="Not Favorite">
            🤍
          </span>
        )}
      </div>
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{location}</p>
        <p>Points per night: {points}</p>
        <Link to={`/listing/${id}`}>
          <button>Detail</button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
