import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './ServerPagination.module.scss';

export interface ServerPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  className?: string;
}

const ServerPagination: React.FC<ServerPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  loading = false,
  className = '',
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1; // react-paginate uses 0-based indexing
    onPageChange(newPage);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`${styles.paginationContainer} ${className}`}>
      <div className={styles.paginationInfo}>
        <span className={styles.paginationText}>
          Showing {startItem} to {endItem} of {totalItems} items
        </span>
      </div>
      
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="Previous"
        forcePage={currentPage - 1} // Convert to 0-based for react-paginate
        disabled={loading}
        className={styles.pagination}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.pageItem}
        previousLinkClassName={styles.pageLink}
        nextClassName={styles.pageItem}
        nextLinkClassName={styles.pageLink}
        breakClassName={styles.pageItem}
        breakLinkClassName={styles.pageLink}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
      />
    </div>
  );
};

export default ServerPagination;
