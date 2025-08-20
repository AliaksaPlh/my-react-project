import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Headet';
import ToggleThemeButton from './components/ThemeToggle/ThemeToggle';
import SelectedPokemonList from './store/SelectedPokemonsBox/SelectedPokemonsBox';

const App = () => {
  return (
    <>
      <ToggleThemeButton />
      <ErrorBoundary>
        <Header />
        <PokemonContainer />
        <SelectedPokemonList />
      </ErrorBoundary>
    </>
  );
};

export default App;
