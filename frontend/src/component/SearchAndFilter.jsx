import { useBooks } from '../context/BookContext';

const SearchAndFilter = () => {
    const {
        searchTerm,
        genreFilter,
        statusFilter,
        genres,
        dispatch
    } = useBooks();

    return (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 mb-6">
            <div className="flex-grow mt-4">
                <input
                    type="text"
                    placeholder="🔍 Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
                    className="w-1/2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 
                 transition-all duration-200"
                />
            </div>

            <div className="flex flex-row items-center space-x-3">
                <select
                    value={genreFilter}
                    onChange={(e) => dispatch({ type: 'SET_GENRE_FILTER', payload: e.target.value })}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 
                 transition-all duration-200"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => dispatch({ type: 'SET_STATUS_FILTER', payload: e.target.value })}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none 
                 transition-all duration-200"
                >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Issued">Issued</option>
                </select>
            </div>
        </div>



    );
};

export default SearchAndFilter;