import { useParams } from 'react-router-dom';
import { useListing } from '../context/ListingContext';

const ListingDetailPage = () => {
  const { listingId } = useParams();
  const { getListingById } = useListing();
  const listing = getListingById(listingId);

  if (!listing) {
    return (
      <div className="p-8 text-center bg-red-100 rounded-lg shadow-lg m-10">
        <h1 className="text-3xl font-bold text-red-700 mb-2">404 - Inzerát nenalezen</h1>
        <p className="text-lg text-red-600">Je nám líto, ale inzerát s ID **{listingId}** neexistuje.</p>
      </div>
    );
  }

  return (
    <div className="listing-detail-page p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6">{listing.title}</h1>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/800x300/a3e635/0d47a1?text=${listing.title.replace(/\s/g, '+')}`;
          }}
        />

        <div className="p-8 space-y-4">
          <p className="text-xl text-gray-700">
            <span className="font-semibold text-blue-700">Lokalita:</span> {listing.location}
          </p>

          <p className="text-2xl font-bold text-indigo-600">
            <span className="font-semibold">Cena za noc:</span> {listing.points} bodů 💰
          </p>

          <p className="text-gray-600 italic">Zde by byl dlouhý popis nemovitosti, informace o vybavení a hodnocení uživatelů.</p>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.01] shadow-md">Rezervovat pobyt</button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
