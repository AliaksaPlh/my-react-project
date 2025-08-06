import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { clearAllSelectedPokemon } from './slice';
import Button from '../components/Button/Button';

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
    <div
      style={{
        border: '0.5px solid #f6bd21',
        backgroundColor: '#f6bd2129',
        borderRadius: '8px',
        padding: '10px',
        position: 'absolute',
        bottom: '1rem',
        right: '5px',
      }}
    >
      <h3>
        ✔️ <strong> {selectedPokemons.length}</strong>
      </h3>
      <br />
      <Button
        onClick={handleClear}
        style={{
          backgroundColor: '#b473bd',
          color: '#f5e652',
          fontWeight: 'bold',
        }}
      >
        Unselect all 🧽
      </Button>
    </div>
  );
};

export default SelectedPokemonList;
