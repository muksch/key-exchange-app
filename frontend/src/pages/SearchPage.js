import { useSearchParams } from 'react-router';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="search-content">
      <h1>Search Page</h1>
      <p>User search for {searchParams.get('q')}</p>
    </div>
  );
};

export default SearchPage;
