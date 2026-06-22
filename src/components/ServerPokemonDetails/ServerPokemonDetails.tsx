import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { fetchPokemonByName } from '../../lib/pokemon';
import DetailsCloseButton from './DetailsCloseButton';
import '../PokemonDetails/PokemonDetails.css';

type Props = {
  name: string;
};

export default async function ServerPokemonDetails({ name }: Props) {
  const t = await getTranslations('PokemonDetails');
  const pokemon = await fetchPokemonByName(name).catch(() => null);

  if (!pokemon) {
    return <div>Error...</div>;
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
      <DetailsCloseButton />
    </div>
  );
}
