import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';
import { tableHeads, initialColumns } from '../services/data';
import '../styles/Table.css';

function Home() {
  const { data, isLoading, dataError } = useContext(PlanetsContext);
  const [filteredName, setFilteredName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState(initialColumns);
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
    setColumns(columns.filter((element) => element !== selectedColumn));
    setFilterTypes([...filterTypes, newFilterTypes]);
  };

  const deleteFilterType = (index) => {
    setFilterTypes(filterTypes.filter((_filter, filterIndex) => filterIndex !== index));
    setColumns(initialColumns
      .filter((element) => element !== filterTypes.selectedColumn));
  };

  if (dataError) {
    return (
      <p>Um erro inesperado ocorreu</p>
    );
  }
  if (isLoading) {
    return (
      <p>Carregando a tabela...</p>
    );
  }
  return (
    <div className="white-box">
      <div className="name-filter-box">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => setFilteredName(event.target.value) }
          className="name-filter"
        />
      </div>
      <div className="filters-box">
        <div>
          <select
            data-testid="column-filter"
            onChange={ (event) => setSelectedColumn(event.target.value) }
          >
            {columns.map((element, index) => (
              <option value={ element } key={ index }>{element}</option>
            ))}
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
            className="value-filter"
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => handleFilterTypes() }
            className="filter-button"
          >
            Filter

          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => setFilterTypes([]) }
            className="filter-button"
          >
            Remover todos os filtros

          </button>
        </div>
      </div>
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
    </div>
  );
}

export default Home;
