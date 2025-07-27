import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PokemonDetails from './PokemonDetails';
import * as api from '../../api/pokemon';
import { mockPokemon } from '../../test-utils/mockData';

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loader while fetching data', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockImplementation(
      () => new Promise(() => {})
    );
    render(<PokemonDetails name="pikachu" onClose={() => {}} />);
    expect(
      screen.getByText(/loading/i) || screen.getByRole('progressbar')
    ).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockRejectedValue(
      new Error('Failed to fetch')
    );
    render(<PokemonDetails name="pikachu" onClose={() => {}} />);
    const errorMessage = await screen.findByText(/failed to fetch/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders pokemon details when fetch succeeds', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockResolvedValue(mockPokemon);
    render(<PokemonDetails name="pikachu" onClose={() => {}} />);
    expect(
      await screen.findByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockResolvedValue(mockPokemon);
    const onClose = vi.fn();
    render(<PokemonDetails name="pikachu" onClose={onClose} />);
    await screen.findByRole('heading', { name: /pikachu/i });
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
