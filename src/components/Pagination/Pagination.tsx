import React from 'react';
import Button from '../Button/Button';

interface Props {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, onPageChange }) => {
  return (
    <div
      style={{
        margin: '10px',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        transition: 'all 0.25s',
      }}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </Button>

      <span>Page {currentPage}</span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-button"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
