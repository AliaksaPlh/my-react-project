import React from 'react';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { clearAllSelectedPokemon } from '../slice';
import Button from '../../components/Button/Button';
import './SelectedPokemonsBox.css';
import { selectPokemons } from '../slice';
import { parseDownload } from '../../helpers';
import download from '../../assets/download.png';
import complete from '../../assets/complete.png';

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
      <div className="up">
        <h3>
          {' '}
          <img
            src={complete}
            alt="✔️ "
            style={{
              height: '25px',
              width: '25px',
            }}
          />
          <strong> {selectedPokemons.length}</strong>
        </h3>
        <a
          className="anchorDownload"
          download={`${selectedPokemons.length}_items.csv`}
          href={parseDownload(selectedPokemons)}
        >
          <img
            src={download}
            alt="Download"
            style={{
              height: '25px',
              width: '25px',
            }}
          />
        </a>{' '}
      </div>
      <Button onClick={handleClear} className="selectedPokemons">
        Unselect all 🧽
      </Button>
    </div>
  );
};

export default SelectedPokemonList;
