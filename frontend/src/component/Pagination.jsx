import { useBooks } from '../context/BookContext';

const Pagination = () => {
    const { currentPage, totalPages, dispatch, filteredBooks } = useBooks();

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                <span className="font-medium">
                    {Math.min(currentPage * 10, filteredBooks.length)}
                </span>{' '}
                of <span className="font-medium">{filteredBooks.length}</span> results
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: number })}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === number
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {number}
                    </button>
                ))}

                <button
                    onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;