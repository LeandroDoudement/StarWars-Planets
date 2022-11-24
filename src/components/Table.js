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
      {filterTypes && filterTypes.map((element, index) => (
        <p key={ index }>
          {`${element.selectedColumn} 
          ${element.selectedComparison} 
          ${element.valueFilter}`}

        </p>
      ))}
      <table className=" planetsTable ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
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
