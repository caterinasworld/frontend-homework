import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getSouthAmericanCountries } from '../services/countryService';
import Loading from '../components/Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const LanguageChart = () => {
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

  const languageCounts = {};

countries.forEach((country) => {
  if (Array.isArray(country.languages)) {
    country.languages.forEach((language) => {
      const languageName = language.name;

      if (languageName) {
        languageCounts[languageName] = (
          languageCounts[languageName] || 0
        ) + 1;
      }
    });
  }
});
  const sortedLanguages = Object.entries(languageCounts)
  .sort((first, second) => second[1] - first[1]);

const chartData = {
  labels: sortedLanguages.map(([language]) => language),
  datasets: [
    {
      label: 'Number of countries',
      data: sortedLanguages.map(([, count]) => count),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

  const data = {
    labels: sortedLanguages.map(([language]) => language),
    datasets: [
      {
        label: 'Number of countries',
        data: sortedLanguages.map(([, count]) => count),
        backgroundColor: 'rgba(25, 135, 84, 0.7)',
        borderColor: 'rgba(25, 135, 84, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Languages Across South America',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <section>
      <h1 className="page-title">Languages of South America</h1>

      <p className="text-muted">
        Explore how many countries use each language.
      </p>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default LanguageChart;
