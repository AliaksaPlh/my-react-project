import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import PokemonContainer from './PokemonContainer';
import {
  mockPokemon,
  mockPokemon2,
  mockDetailed,
  mockShort,
} from '../../test-utils/mockData';
import * as api from '../../api/pokemon';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../../store/slice';

vi.mock('../../api/pokemon', () => ({
  fetchPokemonByName: vi.fn(),
  fetchPokemonsPage: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

const testStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

describe('PokemonContainer', () => {
  it('render SearchBar (input and search button)', () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [mockShort] }),
    });
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <PokemonContainer />{' '}
        </MemoryRouter>{' '}
      </Provider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('Manages search term state correctly', async () => {
    (api.fetchPokemonByName as Mock).mockResolvedValueOnce(mockPokemon);
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <PokemonContainer />
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  pikachu  ' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(api.fetchPokemonByName).toHaveBeenCalledWith('pikachu');
  });

  it('check no saved term in localStorage', async () => {
    (api.fetchPokemonsPage as Mock).mockResolvedValueOnce([]);
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <PokemonContainer />{' '}
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  it('Makes initial API call on component mount', async () => {
    (api.fetchPokemonsPage as Mock).mockResolvedValueOnce([mockDetailed]);
    (api.fetchPokemonByName as Mock).mockResolvedValueOnce(mockDetailed);
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <PokemonContainer />{' '}
        </MemoryRouter>
      </Provider>
    );
    expect(api.fetchPokemonsPage).toHaveBeenCalledWith(1);
    await screen.findByText(/bulbasaur/i);
  });

  it('Manages loading during API calls', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    render(
      <Provider store={testStore}>
        <MemoryRouter>
          <PokemonContainer />{' '}
        </MemoryRouter>
      </Provider>
    );
    const input = screen.getByRole('textbox');
    (api.fetchPokemonByName as Mock).mockImplementationOnce(() => {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockPokemon2), 100)
      );
    });
    fireEvent.change(input, { target: { value: 'raichu' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.findByText(/raichu/i));
    });
  });
});
