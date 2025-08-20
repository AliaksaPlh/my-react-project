import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Pokemon,
  GetPokemonByPage,
  ApiRequestByPage as ApiRequest,
} from '../../types_interfaces/interfaces';
import { isPokemonsList } from '../../helpers';

const apiURL = 'https://pokeapi.co/api/v2/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiURL }),
  tagTypes: ['Pokemon', 'PokemonList'],

  endpoints: (build) => ({
    getPokemonByName: build.query<Pokemon, string>({
      query: (name: string) => `/${name}`,
      providesTags: (result) => [{ type: 'Pokemon', id: result?.name }],
    }),

    getPokemonByPage: build.query<GetPokemonByPage, ApiRequest>({
      query: ({ apiRequest, offset = 0, limit = 20 }: ApiRequest) => {
        if (apiRequest)
          return (
            apiRequest?.split('pokemon').splice(1).join('') || `/${apiRequest}`
          );

        return `?offset=${offset}&limit=${limit}`;
      },
      providesTags: (result, _error, queryParams) => {
        if (isPokemonsList(result)) {
          return [
            ...result.results.map((p) => ({
              type: 'PokemonList' as const,
              id: p.name,
            })),
            { type: 'PokemonList', id: JSON.stringify(queryParams) },
          ];
        }
        if (result && 'name' in result) {
          return [{ type: 'Pokemon', id: result.name }];
        }
        return [];
      },
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonByPageQuery } =
  pokemonApi;
