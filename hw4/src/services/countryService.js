
import axios from 'axios';

const API_URL = 'https://api.restcountries.com/countries/v5';

const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getSouthAmericanCountries = async () => {
  try {
    const response = await api.get('', {
      params: {
        limit: 100,
      },
    });

    console.log('API Response:', response.data);

    const countries = response.data?.data?.objects || [];

    return countries
      .filter((country) => country.subregion === 'South America')
      .sort((first, second) => (
        (first.names?.common || '').localeCompare(
          second.names?.common || '',
        )
      ));
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error('Unable to fetch country data.');
  }
};
