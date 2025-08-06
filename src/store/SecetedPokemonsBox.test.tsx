import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import SelectedPokemonList from './SelectedPokemonsBox';
import pokemonReducer from '../store/slice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('SelectedPokemonList', () => {
  it('renders correctly when pokemons are selected and dispatch works', () => {
    const testStore = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
      preloadedState: {
        pokemon: {
          selected: [
            { name: 'pikachu', types: [], sprites: {} },
            { name: 'bulbasaur', types: [], sprites: {} },
          ],
        },
      },
    });
    render(
      <Provider store={testStore}>
        <SelectedPokemonList />
      </Provider>
    );
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Unselect all/i));
    expect(screen.queryByText(/Unselect all/i)).not.toBeInTheDocument();
  });
});
