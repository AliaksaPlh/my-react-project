import type { Pokemon, PokemonShort } from '../types_interfaces/interfaces';

export const mockPokemon: Pokemon = {
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
export const mockShort: PokemonShort = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};
export const mockDetailed: Pokemon = {
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
