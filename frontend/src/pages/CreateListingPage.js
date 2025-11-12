import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '../context/ListingContext';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { createListing } = useListings();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    points: 0,
    imageUrl: 'https://via.placeholder.com/300x200?text=New+Listing',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || formData.points <= 0) {
      setError('Please fill in all required fields and ensure Points > 0.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await createListing(formData);

    setIsSubmitting(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(`Failed to create listing: ${result.error}`);
    }
  };

  return (
    <div>
      <h1>Vytvořit nový inzerát</h1>
      <p>Zadejte detaily vašeho domova pro výměnu klíčů.</p>

      {error && <div>Chyba: {error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Název inzerátu (Title)</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="location">Lokalita (Location)</label>
          <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="points">Hodnota v bodech (Points)</label>
          <input type="number" name="points" id="points" value={formData.points} onChange={handleChange} min="1" required />
        </div>

        <div>
          <label htmlFor="imageUrl">URL obrázku (Optional)</label>
          <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ukládám...' : 'Vytvořit Inzerát'}
        </button>
      </form>
    </div>
  );
};

export default CreateListingPage;
