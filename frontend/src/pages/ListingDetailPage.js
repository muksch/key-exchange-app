import { useParams } from 'react-router-dom';

const ListingDetailPage = () => {
  const { listingId } = useParams();
  return (
    <div>
      <h1>Detail inzerátu ID: {listingId}</h1>
      <p>Tato stránka zobrazí data pro inzerát s ID: {listingId}.</p>
    </div>
  );
};
export default ListingDetailPage;
