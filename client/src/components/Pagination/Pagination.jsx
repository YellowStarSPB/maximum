import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ queryConfig, onPageChange }) => {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchTotalPages() {
            const response = await fetch(
                `http://localhost:3000/totalPages?mark=${queryConfig.mark}&limit=${queryConfig.limit}&models=${queryConfig.models}`,
            );
            const data = await response.json();
            setTotalPages(data.totalPages);
        }
        fetchTotalPages();
    }, [queryConfig.mark, queryConfig.limit,queryConfig.models]);
    const pageNumbers = [];

    // Определяем диапазон страниц для отображения
    const range = 2;

    for (let i = 1; i <= totalPages; i++) {
        if (
            i <= range ||
            i >= totalPages - range ||
            (i >= queryConfig.page - range && i <= queryConfig.page + range)
        ) {
            pageNumbers.push(i);
        }
    }

    return (
        <div className={styles.pagination}>
            {/* Кнопки для страниц */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`${number === queryConfig.page ? styles.active : ''} ${
                        styles.paginationItem
                    }`}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
