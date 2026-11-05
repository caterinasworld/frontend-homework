
const CountryCard = ({ country }) => {
  const name = country.names?.common || 'Unknown country';

  const capitalValue = country.capitals?.[0];

  const capital = typeof capitalValue === 'string'
    ? capitalValue
    : capitalValue?.name || 'Not available';

  const population = typeof country.population === 'number'
    ? country.population.toLocaleString()
    : 'Not available';

  const languages = Array.isArray(country.languages)
    ? country.languages
        .map((language) => language.name)
        .filter(Boolean)
        .join(', ')
    : 'Not available';

  const flag = country.flag?.emoji || '🌎';

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className="card country-card h-100 shadow-sm">
        <div className="card-body">
          <div className="country-flag" aria-hidden="true">
            {flag}
          </div>

          <h2 className="card-title h5 mt-3">{name}</h2>

          <p className="mb-2">
            <strong>Capital:</strong> {capital}
          </p>

          <p className="mb-2">
            <strong>Population:</strong> {population}
          </p>

          <p className="mb-0">
            <strong>Languages:</strong> {languages || 'Not available'}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CountryCard;
