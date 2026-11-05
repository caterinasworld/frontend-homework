import { useEffect, useState } from 'react';
import { getSouthAmericanCountries } from '../services/countryService';
import CountryCard from '../components/CountryCard';
import Loading from '../components/Loading';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getSouthAmericanCountries();
        setCountries(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">South American Countries</h1>

      <p className="text-muted mb-4">
        Explore the countries and their information.
      </p>

      <div className="row g-4">
        {countries.map((country) => (
          <CountryCard
            key={country.codes?.alpha_3 || country.names.common}
            country={country}
          />
        ))}
      </div>

      {countries.length === 0 && (
        <p>No countries were found.</p>
      )}
    </section>
  );
};

export default CountryList;
