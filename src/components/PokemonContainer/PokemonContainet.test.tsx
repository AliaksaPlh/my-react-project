import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Mock } from 'vitest';
import PokemonContainer from './PokemonContainer';
import { mockPokemon2, mockDetailed } from '../../test-utils/mockData';
import * as api from '../../api/pokemon';

vi.mock('../../api/pokemon', () => ({
  fetchPokemonByName: vi.fn(),
  fetchPokemonsPage: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('PokemonContainer', () => {
  it('render SearchBar (input and search button)', () => {
    render(<PokemonContainer />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  it('display saved searchTerm from localStorage', () => {
    window.localStorage.setItem('searchTerm', 'pikachu');
    render(<PokemonContainer />);
    const storedValue = window.localStorage.getItem('searchTerm');
    expect(screen.getByRole('textbox')).toHaveValue(storedValue);
  });
  it('check no saved term in localStorage', async () => {
    (api.fetchPokemonsPage as Mock).mockResolvedValueOnce([]);
    render(<PokemonContainer />);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });
  it('Makes initial API call on component mount', async () => {
    (api.fetchPokemonsPage as Mock).mockResolvedValueOnce([mockDetailed]);
    (api.fetchPokemonByName as Mock).mockResolvedValueOnce(mockDetailed);
    render(<PokemonContainer />);
    expect(api.fetchPokemonsPage).toHaveBeenCalledWith(1);
    await screen.findByText(/bulbasaur/i);
  });

  it('Handles search term from localStorage on initial load', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    (api.fetchPokemonByName as Mock).mockResolvedValueOnce(mockDetailed);
    render(<PokemonContainer />);
    await screen.findByText(/bulbasaur/i);
  });

  it('Manages loading during API calls', async () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    render(<PokemonContainer />);
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
    });
  });
});
