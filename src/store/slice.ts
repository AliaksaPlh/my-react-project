import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../types_interfaces/interfaces';

interface SelectedPokemonsState {
  selected: Pokemon[];
}

const initialState: SelectedPokemonsState = {
  selected: [],
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addSelectedPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.selected.push(action.payload);
    },
    removeSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.selected = state.selected.filter((p) => p.name !== action.payload);
    },
    clearAllSelectedPokemon(state) {
      state.selected = [];
    },
  },
  selectors: {
    selectPokemons: (state: SelectedPokemonsState) => state.selected,
  },
});
export const {
  addSelectedPokemon,
  removeSelectedPokemon,
  clearAllSelectedPokemon,
} = pokemonSlice.actions;

export const { selectPokemons } = pokemonSlice.selectors;
export default pokemonSlice.reducer;
