import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import PokemonDetailsModule from './PokemonDetailsModule';
import * as api from '../../api/pokemon';
import { mockPokemon, testStore } from '../../test-utils/mockData';
import { Provider } from 'react-redux';

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loader while fetching data', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockImplementation(
      () => new Promise(() => {})
    );
    render(<PokemonDetailsModule name="pikachu" onClose={() => {}} />);
    expect(
      screen.getByText(/loading/i) || screen.getByRole('progressbar')
    ).toBeInTheDocument();
  });

  it('renders pokemon details when fetch succeeds', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockResolvedValue(mockPokemon);
    render(<PokemonDetailsModule name="pikachu" onClose={() => {}} />);
    expect(
      await screen.findByRole('heading', { name: /pikachu/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    vi.spyOn(api, 'fetchPokemonByName').mockResolvedValue(mockPokemon);
    const onClose = vi.fn();

    render(
      <Provider store={testStore}>
        <PokemonDetailsModule name="pikachu" onClose={onClose} />{' '}
      </Provider>
    );
    await screen.findByRole('heading', { name: /pikachu/i });
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
