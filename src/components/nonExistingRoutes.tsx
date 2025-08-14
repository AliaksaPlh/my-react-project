import React from 'react';
import { useNavigate } from 'react-router';
import Button from './Button/Button';
import pokemon from '../assets/pokemon.svg';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={pokemon}
        alt="pokemon"
        style={{
          height: '2rem',
          position: 'absolute',
        }}
      />
      <h1>404 - Page Not Found</h1>
      <p style={{ width: '25rem', textAlign: 'center' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Button onClick={handleGoHome} className="go-home-button">
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
