import './styles/App.scss';
import Results from './components/Results';
import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  const [searchQuery, setSearchQuery] = useState(localStorage?.q);

  const updateQuery = (q: string) => {
    localStorage.setItem('q', q);
    setSearchQuery(q);
  };

  return (
    <div className="app">
      <h1>Pokémon TCG</h1>
      <Search onChange={updateQuery} value={searchQuery} />
      <div className="cards-pane">
        <ErrorBoundary>
          <Results query={searchQuery} />
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
