import { createContext, useContext, useReducer } from 'react';
import { mockBooks, simulateApiDelay } from '../data/books';
import toast from 'react-hot-toast';

const BookContext = createContext();

const bookReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_BOOKS':
            return { ...state, books: action.payload };
        case 'ADD_BOOK':
            return { ...state, books: [...state.books, action.payload] };
        case 'UPDATE_BOOK':
            return {
                ...state,
                books: state.books.map(book =>
                    book.id === action.payload.id ? action.payload : book
                )
            };
        case 'DELETE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload, currentPage: 1 };
        case 'SET_GENRE_FILTER':
            return { ...state, genreFilter: action.payload, currentPage: 1 };
        case 'SET_STATUS_FILTER':
            return { ...state, statusFilter: action.payload, currentPage: 1 };
        default:
            return state;
    }
};

const initialState = {
    books: [],
    loading: false,
    currentPage: 1,
    itemsPerPage: 10,
    searchTerm: '',
    genreFilter: '',
    statusFilter: ''
};

export const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    // Load books from mock data
    const loadBooks = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        await simulateApiDelay();
        dispatch({ type: 'SET_BOOKS', payload: mockBooks });
        dispatch({ type: 'SET_LOADING', payload: false });
    };

    // Add a new book
    const addBook = async (bookData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        await simulateApiDelay();
        const newBook = {
            id: Math.max(...state.books.map(b => b.id), 0) + 1,
            ...bookData
        };
        dispatch({ type: 'ADD_BOOK', payload: newBook });
        dispatch({ type: 'SET_LOADING', payload: false });
        toast.success('Book added successfully!');
        return newBook;
    };

    // Update a book
    const updateBook = async (id, bookData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        await simulateApiDelay();
        const updatedBook = { id, ...bookData };
        dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
        dispatch({ type: 'SET_LOADING', payload: false });
        toast.success('Book updated successfully!');
        return updatedBook;
    };

    // Delete a book
    const deleteBook = async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        await simulateApiDelay();
        dispatch({ type: 'DELETE_BOOK', payload: id });
        dispatch({ type: 'SET_LOADING', payload: false });
        toast.success('Book deleted successfully!');
    };

    // Get filtered and paginated books
    const getFilteredBooks = () => {
        let filteredBooks = state.books;

        // Apply search filter
        if (state.searchTerm) {
            const term = state.searchTerm.toLowerCase();
            filteredBooks = filteredBooks.filter(
                book =>
                    book.title.toLowerCase().includes(term) ||
                    book.author.toLowerCase().includes(term)
            );
        }

        // Apply genre filter
        if (state.genreFilter) {
            filteredBooks = filteredBooks.filter(
                book => book.genre === state.genreFilter
            );
        }

        // Apply status filter
        if (state.statusFilter) {
            filteredBooks = filteredBooks.filter(
                book => book.status === state.statusFilter
            );
        }

        return filteredBooks;
    };

    const filteredBooks = getFilteredBooks();

    // Get current books for pagination
    const indexOfLastBook = state.currentPage * state.itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - state.itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / state.itemsPerPage);

    // Get all genres for filter dropdown
    const genres = [...new Set(state.books.map(book => book.genre))];

    return (
        <BookContext.Provider
            value={{
                ...state,
                currentBooks,
                filteredBooks,
                totalPages,
                genres,
                loadBooks,
                addBook,
                updateBook,
                deleteBook,
                dispatch
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBooks must be used within a BookProvider');
    }
    return context;
};