import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ListingProvider } from './context/ListingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ListingProvider>
        <App />
      </ListingProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
