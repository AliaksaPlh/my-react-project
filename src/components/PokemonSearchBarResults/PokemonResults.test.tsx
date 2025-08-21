import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import PokemonResults from './PokemonResults';
import { mockPokemon, mockPokemon2 } from '../../test-utils/mockData';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../../store/slice';

const testStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

describe('PokemonResults', () => {
  it('displays pokemon card from currentPokemon if provided', () => {
    render(
      <PokemonResults
        term={mockPokemon.name}
        currentPage={0}
        onItemClick={() => {}}
      />
    );
    const pokemonName = screen.getByText(mockPokemon.name);
    const pokemonHeight = screen.getByText(`Height: ${mockPokemon.height}`);
    const pokemonWeight = screen.getByText(`Weight: ${mockPokemon.weight}`);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(screen.getByText(/electric/)).toBeInTheDocument();
  });

  it('displays all pokemon cards from allPokemons if provided', () => {
    render(
      <Provider store={testStore}>
        <PokemonResults
          term={mockPokemon.name}
          currentPage={0}
          onItemClick={() => {}}
        />{' '}
      </Provider>
    );
    const pokemonName = screen.getByText(mockPokemon.name);
    const pokemonName2 = screen.getByText(mockPokemon2.name);
    expect(screen.getByText('All Pokémons: name and type')).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName2).toBeInTheDocument();
    expect(screen.getAllByText(/electric/i)).toHaveLength(2);
  });

  it('displays nothing if currentPokemon and allPokemons are null or empty, and no error', () => {
    render(
      <PokemonResults
        term={mockPokemon.name}
        currentPage={0}
        onItemClick={() => {}}
      />
    );
    expect(screen.queryByText(mockPokemon.name)).not.toBeInTheDocument();
    expect(
      screen.queryByText('All Pokémons: name and type')
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/status/i)).not.toBeInTheDocument();
  });

  it('error message when API fails with 404', () => {
    render(
      <PokemonResults
        term={mockPokemon.name}
        currentPage={0}
        onItemClick={() => {}}
      />
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it('error message when API fails with 500', () => {
    render(
      <PokemonResults
        term={mockPokemon.name}
        currentPage={0}
        onItemClick={() => {}}
      />
    );
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });
});
