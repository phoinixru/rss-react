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
    const { number, name, images, set, supertype, subtypes, rarity, artist } =
      card;
    content = (
      <>
        <img className="set-logo" src={set.images.logo} alt="logo" />
        <div className="info">
          <h2>{name}</h2>
          <img className="image" src={images.large} alt={name} />
          <dl>
            <dt>Set</dt>
            <dd>
              <img
                className="set-symbol"
                src={set.images.symbol}
                alt="symbol"
              />
              {set.name}
            </dd>

            <dt>Number</dt>
            <dd>
              {number} / {set.total}
            </dd>

            <dt>Type</dt>
            <dd>
              {supertype} / {subtypes.join(', ')}
            </dd>

            {rarity && (
              <>
                <dt>Rarity</dt>
                <dd>{rarity}</dd>
              </>
            )}

            <dt>Artist</dt>
            <dd>{artist}</dd>
          </dl>
        </div>
      </>
    );
  }

  return (
    <div className="card-details">
      <div className="close-container">
        <button className="btn btn--close" onClick={closeDetails}>
          Close
        </button>
      </div>
      <div className="details-content">{content}</div>
    </div>
  );
}
