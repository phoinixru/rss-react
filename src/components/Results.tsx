import { Component } from 'react';
import './Results.scss';
import { PokemonCard } from '../types/PokemonCard';
import { API_URL, PAGE_SIZE } from '../config';
import ResultItem from './ResultItem';

type ResultsProps = {
  query: string;
};

type ResultsState = {
  items: PokemonCard[] | null;
};

const CARDS_POINT = `${API_URL}/cards`;

export default class Results extends Component<ResultsProps, ResultsState> {
  state: ResultsState = {
    items: null,
  };

  static defaultProps = {
    query: '',
  };

  render() {
    return (
      <div className="results">
        {this.state.items === null ? (
          <p className="loading">Loading...</p>
        ) : this.state.items?.length ? (
          <ul className="cards">
            {this.state.items.map((item) => (
              <ResultItem key={item.id} card={item} />
            ))}
          </ul>
        ) : (
          <p className="nothing">Nothing is found</p>
        )}
      </div>
    );
  }

  componentDidMount(): void {
    this.fetchCards();
  }

  componentDidUpdate(prevProps: ResultsProps) {
    console.log(prevProps, this.props);
    if (prevProps.query !== this.props.query) {
      this.fetchCards();
    }
  }

  async fetchCards(): Promise<void> {
    const { query } = this.props;
    const q = query ? `name:${query}` : '';
    const params = new URLSearchParams({
      pageSize: String(PAGE_SIZE),
      q,
    });

    const res = await fetch(`${CARDS_POINT}?${params}`);
    const result = await res.json();

    if ('data' in result) {
      this.setState({ items: result.data });
    }
  }
}
