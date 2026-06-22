import React from 'react';
import Button from '../Button/Button';
import './Pagination.css';

interface Props {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
}

const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  label = `Page ${currentPage}`,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  return (
    <div className="pagination-container">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button secondary"
      >
        {previousLabel}
      </Button>

      <span>{label}</span>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-button secondary"
      >
        {nextLabel}
      </Button>
    </div>
  );
};

export default Pagination;
