import React from 'react';
import { useAppSelector } from '../Hooks/useAppSelector';
import { useAppDispatch } from '../Hooks/useAppDispatch';
import { clearAllSelectedPokemon } from './slice';
import Button from '../components/Button/Button';
import './SelectedPokemonsBox.css';
import { selectPokemons } from './slice';

const SelectedPokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(selectPokemons);

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
