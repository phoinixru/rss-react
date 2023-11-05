export type PokemonCard = {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  number: string;
  hp: string;
  images: {
    small: string;
    large: string;
  };
  rules: string[];
  rarity: string;
  artist: string;
  set: {
    id: string;
    name: string;
    series: string;
    total: number;
    images: {
      symbol: string;
      logo: string;
    };
  };
};
