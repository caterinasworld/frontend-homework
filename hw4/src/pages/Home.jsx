import { Link } from 'react-router-dom';

const Home = () => (
  <section className="hero text-center py-5">
    <div className="container">
      <h1 className="display-4 fw-bold">
        Explore South America
      </h1>

      <p className="lead mt-3">
        Discover countries, populations, flags, and languages
        across the South American continent.
      </p>

      <div className="mt-4">
        <Link to="/list" className="btn btn-primary btn-lg me-2">
          Explore Countries
        </Link>

        <Link to="/population" className="btn btn-outline-primary btn-lg">
          View Population Chart
        </Link>
      </div>
    </div>
  </section>
);

export default Home;
