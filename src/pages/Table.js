import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/planetsContext';

function Home() {
  const { data, isLoading, dataError } = useContext(PlanetsContext);
  const [filteredName, setFilteredName] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilteredName(value);
  };

  const filteredData = data.filter((element) => element.name.toLowerCase()
    .includes(filteredName.toLowerCase()));

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
        onChange={ (event) => handleChange(event) }
      />
      <table>
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
        { filteredData.map((element, index) => (
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
            <td>{element.films.toString()}</td>
            <td>{element.created}</td>
            <td>{element.edited}</td>
            <td>{element.url}</td>
          </tr>
        )) }
      </table>
    </>
  );
}

export default Home;
