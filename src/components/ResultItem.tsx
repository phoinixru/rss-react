import { PokemonCard } from '../types/PokemonCard';

type ResultItemProps = {
  card: PokemonCard;
};

export default function ResultItem(props: ResultItemProps) {
  const {
    name,
    images: { small },
  } = props.card;

  return (
    <li className="card">
      <h2 className="card__name">{name}</h2>
      <img className="card__image" src={small} alt={name} />
    </li>
  );
}
