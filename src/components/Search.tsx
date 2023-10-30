import { Component, FormEventHandler } from 'react';
import './Search.scss';

type SearchProps = {
  value: string;
  onChange: (q: string) => void;
};

type SearchState = {
  value: string;
};

export default class Search extends Component<SearchProps, SearchState> {
  state = {
    value: this.props.value,
  };

  render() {
    const { onChange } = this.props;

    const handleSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      onChange(this.state.value);
    };

    return (
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          onChange={(e) => this.setState({ value: e.target.value.trim() })}
          value={this.state.value}
        />
        <button className="search__button">Search</button>
        <p className="search__note">
          Use wildcard for partial matching <code>char*</code>
        </p>
      </form>
    );
  }
}
