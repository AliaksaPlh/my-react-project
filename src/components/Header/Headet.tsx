import React from 'react';
import { Link } from 'react-router';
import fontstyle from '../../StyleProject';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul
          style={{
            padding: 0,
            display: 'flex',
            listStyle: 'none',
            gap: '1rem',
            flexDirection: 'row',
          }}
        >
          <li>
            <Link to="/about" style={fontstyle}>
              About Me
            </Link>
          </li>
          <li>
            <Link to="*" style={fontstyle}>
              Not Exist
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
