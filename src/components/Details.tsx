import { useParams } from 'react-router-dom';
import './Details.scss';
import Loader from './Loader';
import { API_URL } from '../config';
import { useEffect, useState } from 'react';
import { PokemonCard } from '../types/PokemonCard';

export default function Details() {
  const { id } = useParams();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/cards/${id}`);
      const result = await res.json();
      setIsLoading(false);

      if ('data' in result) {
        setCard(result.data);
      }
    };

    fetchCard();
  }, [id]);

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (!card) {
    content = <p>No card found</p>;
  } else {
    content = (
      <>
        <h2>
          #{card.number} - {card.name}
        </h2>
        <img src={card.images.large} alt={card.name} />
      </>
    );
  }

  return <div className="card-details">{content}</div>;
}
