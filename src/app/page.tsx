import PokemonContainer from '../components/PokemonContainer/PokemonContainer';
import SelectedPokemonList from '../store/SelectedPokemonsBox/SelectedPokemonsBox';

import MainLayout from './(main)/MainLayout';

export default function Page() {
  return (
    <MainLayout>
      <PokemonContainer />
      <SelectedPokemonList />
    </MainLayout>
    // <ErrorBoundary>
    //   <Provider store={store}>
    //     <Header />
    //     <PokemonContainer />
    //     <SelectedPokemonList />
    //   </Provider>
    // </ErrorBoundary>
  );
}
