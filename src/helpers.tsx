import type { Pokemon } from './types_interfaces/interfaces';

export function parseDownload(data: Pokemon[]): string {
  if (!data.length) return '';

  const headers = ['name', 'id', 'height', 'weight', 'types'].join(',');
  const rows = data
    .map((pokemon) => {
      return [
        pokemon.name,
        pokemon.id,
        pokemon.height,
        pokemon.weight,
        pokemon.types[0].type.name,
        pokemon.types[1]?.type.name || '',
      ]
        .map((value) => `${String(value)}`)
        .join(',');
    })
    .join('\n');

  const blob = new Blob([`${headers}\n${rows}`], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  return url;
}
