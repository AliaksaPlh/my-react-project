import React from 'react';
import Button from '../Button/Button';
import './Pagination.css';

interface Props {
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, onPageChange }) => {
  return (
    <div className="pagination-container">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button secondary"
      >
        Previous
      </Button>

      <span>Page {currentPage}</span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-button secondary"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
