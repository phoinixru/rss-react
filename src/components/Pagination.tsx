import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';

type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
};

export default function Pagination(props: PaginationProps) {
  const [, setSearchParams] = useSearchParams();
  const { page, pageSize, total } = props;

  const from = 1 + (page - 1) * pageSize;
  const to = page * pageSize;

  const firstPage = 1;
  const lastPage = Math.ceil(total / pageSize);

  const changePage = (delta: number) => {
    const newPage = page + delta;
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="pagination">
      <div className="info">
        Showing: {from}-{to} of {total}
      </div>
      <fieldset className="controls">
        <button
          className="btn btn--prev"
          disabled={page === firstPage}
          onClick={() => changePage(-1)}
        >
          &lt;
        </button>
        <button
          className="btn btn--next"
          disabled={page === lastPage}
          onClick={() => changePage(1)}
        >
          &gt;
        </button>
      </fieldset>
    </div>
  );
}
