import React from "react";
import "./Pagination.css";


const Pagination = ({ currentPage, totalPages, onPageChange, totalPosts, postsPerPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const maxPageNumbersToShow = 5;
    let startPage, endPage;
    if (totalPages <= maxPageNumbersToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrentPage = Math.floor(maxPageNumbersToShow / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPageNumbersToShow / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            startPage = 1;
            endPage = maxPageNumbersToShow;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            startPage = totalPages - maxPageNumbersToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }
    const displayPageNumbers = pageNumbers.slice(startPage - 1, endPage);

    return (
        <nav className="pagination">
            <ul className="pagination-list">
                <li className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button onClick={() => onPageChange(1)} className="pagination-link" disabled={currentPage === 1}>
                        &laquo; First
                    </button>
                </li>
                <li className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button onClick={() => onPageChange(currentPage - 1)} className="pagination-link" disabled={currentPage === 1}>
                        &lsaquo; Prev
                    </button>
                </li>
                {startPage > 1 && (
                    <li className="pagination-item">
                        <span className="pagination-ellipsis">...</span>
                    </li>
                )}
                {displayPageNumbers.map((number) => (
                    <li key={number} className={`pagination-item ${currentPage === number ? "active" : ""}`}>
                        <button onClick={() => onPageChange(number)} className="pagination-link">
                            {number}
                        </button>
                    </li>
                ))}
                {endPage < totalPages && (
                    <li className="pagination-item">
                        <span className="pagination-ellipsis">...</span>
                    </li>
                )}
                <li className={`pagination-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button onClick={() => onPageChange(currentPage + 1)} className="pagination-link" disabled={currentPage === totalPages}>
                        Next &rsaquo;
                    </button>
                </li>
                <li className={`pagination-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button onClick={() => onPageChange(totalPages)} className="pagination-link" disabled={currentPage === totalPages}>
                        Last &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;