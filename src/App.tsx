import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Headet';
import ToggleThemeButton from './components/ThemeToggle/ThemeToggle';

const App = () => {
  return (
    <>
      <ToggleThemeButton />
      <ErrorBoundary>
        <Header />
        <PokemonContainer />
      </ErrorBoundary>
    </>
  );
};

export default App;
