import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Headet';
import { useTheme } from './Context/Themecontext';
import ToggleThemeButton from './components/ThemeToggle/ThemeToggle';

const App = () => {
  const theme: string = useTheme();
  const themeStyle = {
    backgroundColor: theme === 'light' ? '#242424' : '#fff',
  };
  return (
    <>
      <ToggleThemeButton />
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
