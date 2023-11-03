import { FormEventHandler, useState } from 'react';
import './Search.scss';

type SearchProps = {
  value: string;
  onChange: (q: string) => void;
};

export default function Search(props: SearchProps) {
  const { onChange } = props;
  const [value, setValue] = useState(props.value);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onChange(value);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <input
          className="search__input"
          onChange={(e) => setValue(e.target.value.trim())}
          value={value}
        />
        <button className="search__button">Search</button>
      </fieldset>
      <p className="search__note">
        Use wildcard for partial matching <code>char*</code>
      </p>
    </form>
  );
}
