import { Component } from 'react';
import './Search.scss';

type SearchProps = {
  onChange: (q: string) => void;
};

type SearchState = {
  value: string;
};

export default class Search extends Component<SearchProps, SearchState> {
  state = {
    value: localStorage?.q ?? '',
  };

  render() {
    const { onChange } = this.props;

    const sendQuery = () => {
      onChange(this.state.value);
    };

    return (
      <div className="search">
        <input
          className="search__input"
          onChange={(e) => this.setState({ value: e.target.value })}
          value={this.state.value}
        />
        <button className="search__button" onClick={sendQuery}>
          Search
        </button>
      </div>
    );
  }
}
