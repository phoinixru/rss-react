import { useEffect, useState } from 'react';
import './Results.scss';
import { API_URL, DEFAULT_PAGE_SIZE } from '../config';
import ResultItem from './ResultItem';
import Loader from './Loader';
import { CardsResponse } from '../types/CardsResponse';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';

type ResultsProps = {
  query: string;
};

const CARDS_POINT = `${API_URL}/cards`;

export default function Results(props: ResultsProps) {
  const { query = '' } = props;
  const [response, setResponse] = useState<CardsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      const q = query ? `name:${query}` : '';
      const params = new URLSearchParams({ q, page, pageSize });

      const res = await fetch(`${CARDS_POINT}?${params}`);
      const result = await res.json();
      setIsLoading(false);

      setResponse(result);
    };

    fetchCards();
  }, [query, page, pageSize]);

  let content;
  if (isLoading || !response) {
    content = <Loader />;
  } else {
    const { data, page, pageSize, totalCount } = response;

    if (!data.length) {
      content = <p className="nothing">Nothing is found</p>;
    } else {
      content = (
        <>
          <Pagination page={page} pageSize={pageSize} total={totalCount} />
          <ul className="cards">
            {data.map((item) => (
              <ResultItem key={item.id} card={item} />
            ))}
          </ul>
        </>
      );
    }
  }

  return <div className="results">{content}</div>;
}
