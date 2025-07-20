import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchPokemonByName, fetchPokemonsPage } from '../api/pokemon';
import type { Pokemon, PokemonShort } from '../types_interfaces/interfaces';

const mockPokemon: Pokemon = {
  name: 'pikachu',
  sprites: {
    front_default: 'https://example.com/pikachu.png',
  },
  height: 4,
  weight: 60,
  types: [
    {
      type: {
        name: 'electric',
      },
    },
  ],
};

const mockShort: PokemonShort = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

const mockDetailed: Pokemon = {
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
  },
  height: 7,
  weight: 69,
  types: [
    {
      type: {
        name: 'grass',
      },
    },
    {
      type: {
        name: 'poison',
      },
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchPokemonByName', () => {
  it('returns Pokémon data on successful fetch', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    const result = await fetchPokemonByName('pikachu');
    expect(result).toEqual(mockPokemon);
  });
  it('throws error if fetch fails with 404', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });
    await expect(fetchPokemonByName('unknown')).rejects.toThrow(
      'Pokémon "unknown" not found. Status: 404'
    );
  });
  it('throws error if fetch fails with 500', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    await expect(fetchPokemonByName('unknown')).rejects.toThrow(
      'Pokémon "unknown" not found. Status: 500'
    );
  });
});
describe('fetchPokemonsPage', () => {
  it('returns detailed Pokémon list on all successful fetchs', async () => {
    (fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [mockShort] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockDetailed,
      });
    const result = await fetchPokemonsPage(1);
    expect(result).toEqual([mockDetailed]);
  });
  it('throws error if fetch list fails with 500', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    await expect(fetchPokemonsPage(1)).rejects.toThrow(
      'Failed to fetch list. Status: 500'
    );
  });
  it('throws error if detail fetch fails with 404', async () => {
    (fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [mockShort] }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      });
    await expect(fetchPokemonsPage(1)).rejects.toThrow(
      'Failed to fetch Pokémon details. Status: 404'
    );
  });
});
