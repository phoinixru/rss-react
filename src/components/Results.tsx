import { useEffect, useState } from 'react';
import './Results.scss';
import { PokemonCard } from '../types/PokemonCard';
import { API_URL, PAGE_SIZE } from '../config';
import ResultItem from './ResultItem';
import Loader from './Loader';

type ResultsProps = {
  query: string;
};

const CARDS_POINT = `${API_URL}/cards`;

export default function Results(props: ResultsProps) {
  const { query = '' } = props;
  const [items, setItems] = useState<PokemonCard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      const q = query ? `name:${query}` : '';
      const params = new URLSearchParams({
        pageSize: String(PAGE_SIZE),
        q,
      });

      const res = await fetch(`${CARDS_POINT}?${params}`);
      const result = await res.json();
      setIsLoading(false);

      if ('data' in result) {
        setItems(result.data);
      }
    };

    fetchCards();
  }, [query]);

  return (
    <div className="results">
      {isLoading ? (
        <Loader />
      ) : items?.length ? (
        <ul className="cards">
          {items.map((item) => (
            <ResultItem key={item.id} card={item} />
          ))}
        </ul>
      ) : (
        <p className="nothing">Nothing is found</p>
      )}
    </div>
  );
}
