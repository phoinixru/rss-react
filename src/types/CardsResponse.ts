import { PokemonCard } from './PokemonCard';

export type CardsResponse = {
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
  data: PokemonCard[];
};
