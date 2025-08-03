import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Headet';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <PokemonContainer />
      </ErrorBoundary>
    </>
  );
};

export default App;
