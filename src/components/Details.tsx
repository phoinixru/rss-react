import './Details.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from './Loader';
import { API_URL } from '../config';
import { PokemonCard } from '../types/PokemonCard';

export default function Details() {
  const { id } = useParams();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const closeDetails = () => {
    navigate('/?' + searchParams.toString());
  };

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

  return (
    <div className="card-details">
      <button className="btn btn--close" onClick={closeDetails}>
        x
      </button>
      {content}
    </div>
  );
}
