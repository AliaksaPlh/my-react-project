import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PokemonDetailsModule from './PokemonDetailsModule';
import { mockPokemon } from '../../test-utils/mockData';

const pokemonApiMock = vi.hoisted(() => ({
  useGetPokemonByNameQuery: vi.fn(),
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
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      height: 'Height',
      weight: 'Weight',
      types: 'Types',
    })[key] ?? key,
}));

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader while fetching data', async () => {
    pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isFetching: true,
      isError: false,
    });

    render(<PokemonDetailsModule name="pikachu" onClose={() => {}} />);
    expect(
      screen.getByText(/loading/i) || screen.getByRole('progressbar')
    ).toBeInTheDocument();
  });

  it('renders pokemon details when fetch succeeds', async () => {
    pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
      data: mockPokemon,
      isFetching: false,
      isError: false,
    });

    render(<PokemonDetailsModule name="pikachu" onClose={() => {}} />);
    expect(
      await screen.findByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    pokemonApiMock.useGetPokemonByNameQuery.mockReturnValue({
      data: mockPokemon,
      isFetching: false,
      isError: false,
    });
    const onClose = vi.fn();

    render(<PokemonDetailsModule name="pikachu" onClose={onClose} />);
    await screen.findByRole('heading', { name: /pikachu/i });
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
