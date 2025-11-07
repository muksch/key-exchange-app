import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '../context/ListingContext';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { createListing } = useListings();

  // Stav pro data formuláře
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    points: 0,
    imageUrl: 'https://via.placeholder.com/300x200?text=New+Listing', // Default placeholder
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Zpracování změny ve formuláři
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // Zpracování odeslání
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || formData.points <= 0) {
      setError('Please fill in all required fields and ensure Points > 0.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Volání funkce pro zápis do Firestore z Contextu
    const result = await createListing(formData);

    setIsSubmitting(false);

    if (result.success) {
      // Přesměrování na domovskou stránku po úspěšném zápisu
      navigate('/');
    } else {
      setError(`Failed to create listing: ${result.error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Vytvořit nový inzerát</h1>
      <p className="mb-6 text-gray-600">Zadejte detaily vašeho domova pro výměnu klíčů.</p>

      {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">Chyba: {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Název inzerátu (Title)
          </label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Lokalita (Location)
          </label>
          <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>

        <div>
          <label htmlFor="points" className="block text-sm font-medium text-gray-700">
            Hodnota v bodech (Points)
          </label>
          <input type="number" name="points" id="points" value={formData.points} onChange={handleChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            URL obrázku (Optional)
          </label>
          <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <button type="submit" disabled={isSubmitting} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}>
          {isSubmitting ? 'Ukládám...' : 'Vytvořit Inzerát'}
        </button>
      </form>
    </div>
  );
};

export default CreateListingPage;
