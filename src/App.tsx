import { Component } from 'react';
import './App.scss';
import Results from './components/Results';
import Search from './components/Search';
import { PokemonCard } from './types/PokemonCard';

type AppState = {
  q: string;
  results: PokemonCard[];
};

export default class App extends Component<null, AppState> {
  state = {
    q: '',
    results: [],
  };

  render() {
    const updateQuery = (q: string) => {
      this.setState({ q });
    };

    return (
      <div className="app">
        <Search onChange={updateQuery} />
        <Results />
      </div>
    );
  }
}
