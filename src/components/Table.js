import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

function Home() {
  const { data, isLoading, dataError } = useContext(PlanetsContext);
  const [filteredName, setFilteredName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterTypes, setFilterTypes] = useState([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const filteredByName = data.filter((element) => element.name.toLowerCase()
      .includes(filteredName.toLowerCase()));

    const newFilteredData = filterTypes
      .reduce((accumulator, filter) => accumulator
        .filter((planet) => {
          switch (filter.selectedComparison) {
          case 'maior que':
            return planet[filter.selectedColumn] > Number(filter.valueFilter);
          case 'menor que':
            return planet[filter.selectedColumn] < Number(filter.valueFilter);
          case 'igual a':
            return planet[filter.selectedColumn] === filter.valueFilter;
          default:
            return true;
          }
        }), filteredByName);
    setFilteredData(newFilteredData);
  }, [filteredName, filterTypes]);

  const handleFilterTypes = () => {
    const newFilterTypes = {
      selectedColumn,
      selectedComparison,
      valueFilter,
    };
    setFilterTypes([...filterTypes, newFilterTypes]);
  };

  const deleteFilterType = (index) => {
    setFilterTypes(filterTypes.filter((_filter, filterIndex) => filterIndex !== index));
  };

  const tableHeads = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  if (dataError) {
    return (
      <p>Um erro inesperado ocorreu</p>
    );
  }
  if (isLoading) {
    return (
      <p>Loading</p>
    );
  }
  return (
    <>
      <h1>Starwars Planets</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (event) => setFilteredName(event.target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ (event) => setSelectedColumn(event.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (event) => setSelectedComparison(event.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ (event) => setValueFilter(event.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterTypes() }
      >
        Filter

      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilterTypes([]) }
      >
        Remover todos os filtros

      </button>
      <ul>
        {filterTypes && filterTypes.map((element, index) => (
          <li key={ index } data-testid="filter">
            {`${element.selectedColumn} 
          ${element.selectedComparison} 
          ${element.valueFilter}`}
            <button
              type="button"
              onClick={ () => deleteFilterType(index) }
            >
              Remover filtro
            </button>
          </li>
        ))}
      </ul>
      <table className=" planetsTable ">
        <thead>
          <tr>
            {tableHeads.map((element, index) => (
              <th key={ index }>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((element, index) => (
            <tr key={ index }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Home;
