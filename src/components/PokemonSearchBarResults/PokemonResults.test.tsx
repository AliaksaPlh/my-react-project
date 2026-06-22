import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import PokemonResults from './PokemonResults';
import {
  mockPokemon,
  mockPokemon2,
  testStore,
} from '../../test-utils/mockData';
import { Provider } from 'react-redux';

const pokemonApiMock = vi.hoisted(() => ({
  useGetPokemonByNameQuery: vi.fn(),
  useGetPokemonByPageQuery: vi.fn(),
}));

vi.mock('../../api/Query/pokemonApi', () => ({
  pokemonApi: {
    reducerPath: 'pokemonApi',
    reducer: (state = {}) => state,
    middleware:
      () => (next: (action: unknown) => unknown) => (action: unknown) =>
        next(action),
  },
  useGetPokemonByNameQuery: pokemonApiMock.useGetPokemonByNameQuery,
  useGetPokemonByPageQuery: pokemonApiMock.useGetPokemonByPageQuery,
}));

vi.mock('../PokemonShortCardsList/PokemonShortCardsList', () => ({
  default: ({ name }: { name: string }) => (
    <li>
      <strong>{name}</strong>
      <p>electric</p>
    </li>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
  pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
    data: undefined,
    error: undefined,
    isFetching: false,
    isLoading: false,
  });
  pokemonApiMock.useGetPokemonByPageQuery.mockReturnValue({
    data: undefined,
    error: undefined,
    isFetching: false,
    isLoading: false,
  });
});

describe('PokemonResults', () => {
  it('displays pokemon card from currentPokemon if provided', () => {
    pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isFetching: false,
    });

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
    pokemonApiMock.useGetPokemonByPageQuery.mockReturnValue({
      data: {
        results: [{ name: mockPokemon.name }, { name: mockPokemon2.name }],
      },
      error: undefined,
      isFetching: false,
      isLoading: false,
    });
    pokemonApiMock.useGetPokemonByNameQuery.mockImplementation(
      (name: string) => ({
        data: name === mockPokemon.name ? mockPokemon : mockPokemon2,
        error: undefined,
        isLoading: false,
        isFetching: false,
      })
    );

    render(
      <Provider store={testStore}>
        <PokemonResults term="" currentPage={1} onItemClick={() => {}} />
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
    pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      error: { status: 404 },
      isFetching: false,
    });

    render(
      <PokemonResults
        term={mockPokemon.name}
        currentPage={0}
        onItemClick={() => {}}
      />
    );
    expect(screen.getByText(/error, check the name/i)).toBeInTheDocument();
  });

  it('error message when API fails with 500', () => {
    pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      error: { status: 500 },
      isFetching: false,
    });

    render(
      <PokemonResults
        term={mockPokemon.name}
        currentPage={0}
        onItemClick={() => {}}
      />
    );
    expect(screen.getByText(/error, check the name/i)).toBeInTheDocument();
  });
});
