'use client';

import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../Hooks/useAppSelector';
import { useAppDispatch } from '../../Hooks/useAppDispatch';
import { clearAllSelectedPokemon } from '../slice';
import Button from '../../components/Button/Button';
import './SelectedPokemonsBox.css';
import { selectPokemons } from '../slice';
import download from '../../assets/download.png';
import complete from '../../assets/complete.png';
import { useTranslations } from 'next-intl';

const SelectedPokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(selectPokemons);
  const t = useTranslations('Selected');
  const selectedNames = selectedPokemons
    .map((pokemon) => pokemon.name)
    .join(',');
  const csvHref = `/api/pokemon-csv?names=${encodeURIComponent(selectedNames)}`;

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
          <Image
            src={complete}
            alt="✔️ "
            width={25}
            height={25}
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
          href={csvHref}
        >
          <Image
            src={download}
            alt={t('download')}
            width={25}
            height={25}
            style={{
              height: '25px',
              width: '25px',
            }}
          />
        </a>{' '}
      </div>
      <Button onClick={handleClear} className="selectedPokemons">
        {t('unselectAll')}
      </Button>
    </div>
  );
};

export default SelectedPokemonList;
