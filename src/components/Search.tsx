import { FormEventHandler, useState } from 'react';
import './Search.scss';

type SearchProps = {
  value: string;
  onChange: (q: string) => void;
};

export default function Search(props: SearchProps) {
  const { onChange } = props;
  const [hasError, setHasError] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onChange(value);
  };

  if (hasError) {
    throw new Error('Error for ErrorBoundary');
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        onChange={(e) => setValue(e.target.value.trim())}
        value={value}
      />
      <button className="search__button">Search</button>
      <button
        className="search__button search__button--error"
        onClick={() => {
          setHasError(true);
        }}
      >
        Throw an error
      </button>
      <p className="search__note">
        Use wildcard for partial matching <code>char*</code>
      </p>
    </form>
  );
}
