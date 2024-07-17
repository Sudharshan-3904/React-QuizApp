import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            {pages.map((page) => (
                <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
