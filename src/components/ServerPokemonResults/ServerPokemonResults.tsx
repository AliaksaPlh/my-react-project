import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { fetchPokemonByName, fetchPokemonDetailsPage } from '../../lib/pokemon';
import PokemonShortCard from '../PokemonShortCard/PokemonShortCard';
import styles from '../PokemonSearchBarResults/PokemonResults.module.css';

type Props = {
  searchTerm: string;
  currentPage: number;
};

export default async function ServerPokemonResults({
  searchTerm,
  currentPage,
}: Props) {
  const t = await getTranslations('Search');

  if (searchTerm) {
    const pokemon = await fetchPokemonByName(searchTerm).catch(() => null);

    if (!pokemon) {
      return <p className={styles.error}>{t('error')}</p>;
    }

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.pokemonName}>{pokemon.name}</h2>
        <Image
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
          width={300}
          height={300}
          className={styles.image}
        />
        <div className={styles.pokemonInfo}>
          <p>Order: {pokemon.id}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Types: {pokemon.types.map((item) => item.type.name).join(', ')}</p>
        </div>
      </div>
    );
  }

  const pokemons = await fetchPokemonDetailsPage(currentPage);

  return (
    <div className="pokemonResults">
      <h3 style={{ cursor: 'default' }}>{t('allPokemons')}</h3>
      <ul className={styles.list}>
        {pokemons.map((pokemon) => (
          <PokemonShortCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}
