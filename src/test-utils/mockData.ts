import type { Pokemon, PokemonShort } from '../types_interfaces/interfaces';
import { pokemonApi } from '../api/Query/pokemonApi';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../store/slice';

export const mockPokemon: Pokemon = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/pikachu.png',
      },
    },
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
export const mockPokemon2: Pokemon = {
  id: 26,
  name: 'raichu',
  sprites: {
    front_default: 'https://example.com/raichu.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/raichu.png',
      },
    },
  },
  height: 8,
  weight: 300,
  types: [
    {
      type: {
        name: 'electric',
      },
    },
  ],
};
export const mockShort: PokemonShort = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};
export const mockDetailed: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
    other: {
      dream_world: {
        front_default: 'https://example.com/bulbasaur.png',
      },
    },
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
export const mockPokemonsPage = [
  {
    name: 'bulbasaur',
    sprites: {
      front_default: 'url-to-image',
      other: {
        dream_world: {
          front_default: 'url-to-image',
        },
      },
    },
    types: [{ type: { name: 'grass' } }],
  },
  {
    name: 'charmander',
    sprites: {
      front_default: 'url-to-image',
      other: {
        dream_world: {
          front_default: 'url-to-image',
        },
      },
    },
    types: [{ type: { name: 'fire' } }],
  },
];

export const testStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonApi: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
