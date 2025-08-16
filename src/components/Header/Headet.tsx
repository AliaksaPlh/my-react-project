import React from 'react';
import { Link } from 'react-router';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul className="header-panel">
          <li>
            <Link to="/about" className="link">
              About Me
            </Link>
          </li>
          <li>
            <Link to="*" className="link">
              Not Exist
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
