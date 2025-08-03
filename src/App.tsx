import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Headet';
import { useTheme, useUpdateTheme } from './Context/Themecontext';
import Button from './components/Button/Button';

const App = () => {
  const theme: string = useTheme();
  const toggleTheme = useUpdateTheme();
  const themeStyle = {
    backgroundColor: theme === 'light' ? '#333' : '#fff',
    color: '#fffwq',
  };
  return (
    <>
      <Button
        onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {' '}
        Theme Toggle{' '}
      </Button>
      <div style={themeStyle}>
        <ErrorBoundary>
          <Header />
          <PokemonContainer />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
