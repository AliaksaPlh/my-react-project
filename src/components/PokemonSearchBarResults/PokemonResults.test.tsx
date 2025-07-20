import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import PokemonResults from './PokemonResults';
import { mockPokemon, mockPokemon2 } from '../../test-utils/mockData';

describe('PokemonResults', () => {
  it('displays loader when loading', () => {
    render(
      <PokemonResults
        loading={true}
        error={null}
        currentPokemon={null}
        allPokemons={[]}
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('displays pokemon card from currentPokemon if provided', () => {
    render(
      <PokemonResults
        loading={false}
        error={null}
        currentPokemon={mockPokemon}
        allPokemons={[]}
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
      <PokemonResults
        loading={false}
        error={null}
        currentPokemon={null}
        allPokemons={[mockPokemon, mockPokemon2]}
      />
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
        loading={false}
        error={null}
        currentPokemon={null}
        allPokemons={[]}
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
        loading={false}
        error={'Pokémon not found. Status: 404'}
        currentPokemon={null}
        allPokemons={[]}
      />
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
  it('error message when API fails with 500', () => {
    render(
      <PokemonResults
        loading={false}
        error={'Pokémon not found. Status: 500'}
        currentPokemon={null}
        allPokemons={[]}
      />
    );
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });
});
