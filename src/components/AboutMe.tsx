import React from 'react';
import { useNavigate } from 'react-router';
import Button from './Button/Button';

const EboutMePage: React.FC = () => {
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
      }}
    >
      <h1>About Me</h1>
      <h2 style={{ width: '25rem', textAlign: 'center' }}>
        Hello, my name is Alexandra, I am junior frontend developer.
        <br />
        Welcome to my GitHub by <a href="https://github.com/AliaksaPlh">
          link
        </a>{' '}
        <br />
        Feel free to contact me via discord{' '}
        <b style={{ color: '#f6bd21' }}>aliaksaplh</b>
      </h2>
      <h3
        style={{
          width: '25rem',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        I am a studenr of -
        <a href="https://rs.school/courses/reactjs"> RSS React Course</a>
      </h3>
      <Button onClick={handleGoHome} className="go-home-button">
        Go Home
      </Button>
    </div>
  );
};
export default EboutMePage;
