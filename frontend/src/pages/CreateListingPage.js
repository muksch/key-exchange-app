import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListings } from '../context/ListingContext';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const { createListing, createListingImage } = useListings();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    points: 1,
    imageFile: null,
    space: '',
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
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];

    const resetSelection = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFormData((prev) => ({
        ...prev,
        imageFile: null,
      }));
    };

    if (!file) {
      resetSelection();
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Selected file must be an image.');
      resetSelection();
      return;
    }

    const MAX_SIZE_BYTES = 1_500_000;
    if (file.size > MAX_SIZE_BYTES) {
      setError('Image is too large (max 1.5 MB).');
      resetSelection();
      return;
    }

    setError(null);
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || formData.points <= 0 || !formData.imageFile || !formData.space) {
      setError('Please fill in all required fields and ensure Points > 0.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const uploadedImage = await createListingImage(formData.imageFile);
      if (!uploadedImage?.success || !uploadedImage?.url) {
        throw new Error(uploadedImage?.error || 'Image upload failed');
      }

      const payload = {
        title: formData.title,
        location: formData.location,
        points: formData.points,
        imageUrl: uploadedImage.url,
        space: formData.space,
      };

      const result = await createListing(payload);

      if (result.success) {
        setFormData({
          title: '',
          location: '',
          points: 1,
          imageFile: null,
          space: '',
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        navigate('/');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(`Failed to create listing: ${err.message}`);
    } finally {
      setIsSubmitting(false);
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
          <label htmlFor="imageFile">Obrázek (soubor)</label>
          <input ref={fileInputRef} id="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label htmlFor="space">Velikost</label>
          <input type="text" name="space" id="space" value={formData.space} onChange={handleChange} />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ukládám...' : 'Vytvořit Inzerát'}
        </button>
      </form>
    </div>
  );
};

export default CreateListingPage;
