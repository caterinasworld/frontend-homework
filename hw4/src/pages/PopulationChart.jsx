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

const PopulationChart = () => {
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

  const chartCountries = countries
    .filter((country) => Number.isFinite(country.population))
    .sort((first, second) => second.population - first.population);

  const data = {
    labels: chartCountries.map((country) => country.names.common),
    datasets: [
      {
        label: 'Population',
        data: chartCountries.map((country) => country.population),
        backgroundColor: 'rgba(13, 110, 253, 0.7)',
        borderColor: 'rgba(13, 110, 253, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population of South American Countries',
      },
      tooltip: {
        callbacks: {
          label: (context) => (
            `Population: ${context.raw.toLocaleString()}`
          ),
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => Number(value).toLocaleString(),
        },
      },
    },
  };

  return (
    <section>
      <h1 className="page-title">Population Comparison</h1>

      <p className="text-muted">
        Compare the population of countries in South America.
      </p>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};

export default PopulationChart;
