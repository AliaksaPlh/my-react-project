import { fetchPokemonByName } from '../../../lib/pokemon';

function escapeCsvValue(value: string | number) {
  const stringValue = String(value);

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.split('"').join('""')}"`;
  }

  return stringValue;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const names = (searchParams.get('names') || '')
    .split(',')
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);

  if (!names.length) {
    return new Response('No pokemon names provided', { status: 400 });
  }

  const pokemons = await Promise.all(
    names.map((name) => fetchPokemonByName(name))
  );
  const headers = ['name', 'id', 'height', 'weight', 'types'];
  const rows = pokemons.map((pokemon) =>
    [
      pokemon.name,
      pokemon.id,
      pokemon.height,
      pokemon.weight,
      pokemon.types.map((item) => item.type.name).join('|'),
    ]
      .map(escapeCsvValue)
      .join(',')
  );

  return new Response([headers.join(','), ...rows].join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${names.length}_items.csv"`,
    },
  });
}
