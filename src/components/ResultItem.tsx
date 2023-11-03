import './ResultItem.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { PokemonCard } from '../types/PokemonCard';

type ResultItemProps = {
  card: PokemonCard;
};

export default function ResultItem(props: ResultItemProps) {
  const {
    id,
    name,
    images: { small },
  } = props.card;
  const [searchParams] = useSearchParams();
  const cardLink = (id: string) => `/card/${id}?${searchParams.toString()}`;

  return (
    <li className="card">
      <h2 className="card__name">{name}</h2>
      <Link to={cardLink(id)} onClick={(e) => e.stopPropagation()}>
        <img className="card__image" src={small} alt={name} />
      </Link>
    </li>
  );
}
