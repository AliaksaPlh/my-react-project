export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
}
export interface PokemonShort {
  name: string;
  url: string;
}

export interface Theme {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
