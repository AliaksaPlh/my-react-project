import PokemonContainer from './components/PokemonContainer/PokemonContainer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Headet';
import { useTheme } from './Context/Themecontext';
import ToggleThemeButton from './components/ThemeToggle/ThemeToggle';
import { Provider } from 'react-redux';
import store from './store/store';

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
          <Provider store={store}>
            <Header />
            <PokemonContainer />{' '}
          </Provider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
