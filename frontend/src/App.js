import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ListingDetailPage from './pages/ListingDetailPage';
import CreateListingPage from './pages/CreateListingPage';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <main className="listing-grid">
        <Routes>
          <Route path="/listing/:listingId" element={<ListingDetailPage />} />
          <Route path="/create" element={<CreateListingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
