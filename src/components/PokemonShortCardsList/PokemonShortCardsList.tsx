import React from 'react';
import { useGetPokemonByNameQuery } from '../../api/Query/pokemonApi';
import PokemonShortCard from '../PokemonShortCard/PokemonShortCard';
import Loader from '../Loader/Loader';

type Props = {
  name: string;
  onItemClick: (name: string) => void;
};

const PokemonShortCardsList: React.FC<Props> = ({ name, onItemClick }) => {
  const { data, isLoading, error } = useGetPokemonByNameQuery(name);

  if (isLoading) return <Loader />;
  if (error || !data) return <li>Ошибка загрузки {name}</li>;

  return <PokemonShortCard pokemon={data} onItemClick={onItemClick} />;
};

export default PokemonShortCardsList;
