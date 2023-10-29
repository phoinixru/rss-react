import { Component } from 'react';
import { PokemonCard } from '../types/PokemonCard';

type ResultItemProps = {
  card: PokemonCard;
};

export default class ResultItem extends Component<ResultItemProps> {
  render() {
    const {
      name,
      images: { small },
    } = this.props.card;
    return (
      <li className="card">
        <h2 className="card__name">{name}</h2>
        <img className="card__image" src={small} alt={name} />
      </li>
    );
  }
}
