import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsContext from './context/planetsContext';
import useData from './hooks/useData';
import Header from './components/Header';

function App() {
  const { isLoading, data, dataError, fetchData } = useData('https://swapi.dev/api/planets');

  data.forEach((element) => delete element.residents);

  const storage = {
    isLoading,
    data,
    dataError,
    fetchData,
  };

  return (
    <PlanetsContext.Provider value={ storage }>
      <Header />
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
