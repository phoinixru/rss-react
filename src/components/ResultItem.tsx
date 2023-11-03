import './ResultItem.scss';
import { Link } from 'react-router-dom';
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

  return (
    <li className="card">
      <h2 className="card__name">{name}</h2>
      <Link to={`card/${id}`}>
        <img className="card__image" src={small} alt={name} />
      </Link>
    </li>
  );
}
