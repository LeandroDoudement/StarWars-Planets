import starWars from '../images/starWars.png';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <img src={ starWars } alt="Star Wars Logo" className="star-wars-logo" />
    </header>
  );
}

export default Header;
