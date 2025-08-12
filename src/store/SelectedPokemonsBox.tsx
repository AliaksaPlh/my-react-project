import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { clearAllSelectedPokemon } from './slice';
import Button from '../components/Button/Button';
import './SelectedPokemonsBox.css';

const SelectedPokemonList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemon.selected
  );

  const handleClear = () => {
    dispatch(clearAllSelectedPokemon());
  };

  if (selectedPokemons.length === 0) {
    return;
  }
  return (
    <div className="container">
      <h3>
        ✔️ <strong> {selectedPokemons.length}</strong>
      </h3>
      <br />
      <Button onClick={handleClear} className="selectedPokemons">
        Unselect all 🧽
      </Button>
    </div>
  );
};

export default SelectedPokemonList;
