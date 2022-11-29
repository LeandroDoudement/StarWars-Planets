import { useState, useEffect } from 'react';

const useData = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataError, setDataError] = useState('');

  const fetchData = () => {
    try {
      fetch(url)
        .then((request) => request.json())
        .then((response) => setData(response.results));
    } catch (error) {
      setDataError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, dataError, fetchData };
};

export default useData;
