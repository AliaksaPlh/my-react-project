'use client';

import React from 'react';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import './PokemonDetails.css';
import { useGetPokemonByNameQuery } from '../../api/Query/pokemonApi';
import { useTranslations } from 'next-intl';

interface Props {
  name: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const PokemonDetails: React.FC<Props> = ({ name, children }) => {
  const { data: pokemon, isFetching, isError } = useGetPokemonByNameQuery(name);
  const t = useTranslations('PokemonDetails');

  if (isFetching) {
    return <Loader className="loader" />;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  if (!pokemon) {
    return null;
  }
  return (
    <div className="pokemon-details module">
      <h2>{pokemon.name}</h2>
      <Image
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
        width={150}
        height={150}
        className="details-image"
      />
      <p>
        {t('height')}: {pokemon.height}
      </p>
      <p>
        {t('weight')}: {pokemon.weight}
      </p>
      <p>
        {t('types')}: {pokemon.types.map((item) => item.type.name).join(', ')}
      </p>
      {children}
    </div>
  );
};

export default PokemonDetails;
