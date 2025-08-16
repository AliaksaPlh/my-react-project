import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import pokemonReducer from './slice';
import {
  addSelectedPokemon,
  removeSelectedPokemon,
  clearAllSelectedPokemon,
} from './slice';
import {
  mockDetailed,
  mockPokemon,
  mockPokemon2,
} from './../test-utils/mockData';

describe('pokemonSlice', () => {
  it('addSelectedPokemon add correctly', () => {
    const initialState = { selected: [mockPokemon, mockPokemon2] };
    const state = pokemonReducer(
      initialState,
      addSelectedPokemon(mockDetailed)
    );
    expect(state.selected).toEqual([mockPokemon, mockPokemon2, mockDetailed]);
  });

  it('removeSelectedPokemon remove correctly', () => {
    const initialState = {
      selected: [mockPokemon, mockPokemon2, mockDetailed],
    };
    const state = pokemonReducer(
      initialState,
      removeSelectedPokemon(mockDetailed.name)
    );
    expect(state.selected).toEqual([mockPokemon, mockPokemon2]);
  });

  it('clearAllSelectedPokemon clear all, empty arr in state', () => {
    const initialState = {
      selected: [mockPokemon, mockPokemon2, mockDetailed],
    };
    const state = pokemonReducer(initialState, clearAllSelectedPokemon());
    expect(state.selected).length(0);
  });
});
