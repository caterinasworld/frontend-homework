import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center py-5">
    <h1>404 - Page Not Found</h1>

    <p className="text-muted">
      The page you are looking for does not exist.
    </p>

    <Link to="/home" className="btn btn-primary">
      Return Home
    </Link>
  </div>
);

export default NotFound;
