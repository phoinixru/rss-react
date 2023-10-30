import { Component } from 'react';
import './styles/App.scss';
import Results from './components/Results';
import Search from './components/Search';

type AppProps = Record<string, never>;

type AppState = {
  q: string;
};

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    q: localStorage?.q,
  };

  render() {
    const updateQuery = (q: string) => {
      localStorage.setItem('q', q);
      this.setState({ q });
    };

    return (
      <div className="app">
        <h1>Pokémon TCG</h1>
        <Search onChange={updateQuery} value={this.state.q} />
        <Results query={this.state.q} />
      </div>
    );
  }
}
