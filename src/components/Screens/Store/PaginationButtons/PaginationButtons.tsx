
import './PaginationButtons.css'

export const PaginationButtons = ({ page, totalPages, setPage }: any) => {
    const handlePageChange = (newPage: number) => {
        setPage(newPage-1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const renderPageButtons = () => {
        const buttons = [];

        const maxButtons = 4;
        const middleIndex = Math.ceil(maxButtons / 2);
        let startPage = page - middleIndex + 1;
        let endPage = page + middleIndex - 1;

        if (startPage < 1) {
            endPage += Math.abs(startPage) + 1;
            startPage = 1;
        }

        if (endPage > totalPages) {
            startPage -= endPage - totalPages;
            endPage = totalPages;
        }

        if (startPage > 1) {
            buttons.push(
                <li key="ellipsis-start" className="page-item">
                    <a className="page-link" onClick={() => handlePageChange(startPage - 1)}>
                        ...
                    </a>
                </li>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                    <a className="page-link" onClick={() => handlePageChange(i)}>
                        {i}
                    </a>
                </li>
            );
        }

        if (endPage < totalPages) {
            buttons.push(
                <li key="ellipsis-end" className="page-item">
                    <a className="page-link" onClick={() => handlePageChange(endPage + 1)}>
                        ...
                    </a>
                </li>
            );
        }

        return buttons;
    };

    const showButtons = totalPages >= 3;

    return (
        <div className='containerPrincipalButtonsPaginationStore'>
            <nav aria-label="...">
                <ul className="pagination mt-4">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => handlePageChange(page - 1)}>
                            Previous
                        </a>
                    </li>
                    {showButtons && renderPageButtons()}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => handlePageChange(page + 1)}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
