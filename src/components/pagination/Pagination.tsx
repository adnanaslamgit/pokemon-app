import styles from "./Pagination.module.scss"; 

interface PaginationProps {
  limit: number;
  offset: number;
  setOffset: (offset: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ limit, offset, setOffset }) => {
  return (
    <div className={styles.pagination}>
      <button onClick={() => setOffset(Math.max(0, offset - limit))} disabled={offset === 0}>
        ⬅️ Back
      </button>
      <button onClick={() => setOffset(offset + limit)}>Next ➡️</button>
    </div>
  );
};

export default Pagination;
