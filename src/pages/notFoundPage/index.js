import { Link } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-heading">404 - Page Not Found</h1>
      <p className="notfound-text">Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" className="notfound-link">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
