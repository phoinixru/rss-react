import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { PAGE_SIZES } from '../config';

type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
};

export default function Pagination(props: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, pageSize, total } = props;

  const from = 1 + (page - 1) * pageSize;
  const to = Math.min(total, page * pageSize);

  const firstPage = 1;
  const lastPage = Math.ceil(total / pageSize);

  const changePage = (delta: number) => {
    const newPage = page + delta;
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  };

  const setPageSize = (pageSize: string) => {
    if (pageSize) {
      setSearchParams({ pageSize });
    }
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

        <select
          onChange={(e) => setPageSize(e.target.value)}
          defaultValue={pageSize}
        >
          <option value="">per page:</option>
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </fieldset>
    </div>
  );
}
