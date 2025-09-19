import { useForm } from 'react-hook-form';
import { useBooks } from '../context/BookContext';

const BookForm = ({ book, onClose }) => {
    const { addBook, updateBook, loading } = useBooks();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: book || {
            title: '',
            author: '',
            genre: '',
            publishedYear: new Date().getFullYear(),
            status: 'Available'
        }
    });

    const onSubmit = async (data) => {
        if (book) {
            await updateBook(book.id, data);
        } else {
            await addBook(data);
        }
        reset();
        onClose();
    };

    const genres = [
        'Fiction', 'Dystopian', 'Romance', 'Classic', 'Fantasy',
        'Modernist', 'Adventure', 'Historical', 'Mystery', 'Science Fiction'
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author
                </label>
                <input
                    type="text"
                    id="author"
                    {...register('author', { required: 'Author is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                {errors.author && (
                    <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                    Genre
                </label>
                <select
                    id="genre"
                    {...register('genre', { required: 'Genre is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                    <option value="">Select Genre</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
                {errors.genre && (
                    <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
                    Published Year
                </label>
                <input
                    type="number"
                    id="publishedYear"
                    min="1000"
                    max={new Date().getFullYear()}
                    {...register('publishedYear', {
                        required: 'Published year is required',
                        min: {
                            value: 1000,
                            message: 'Year must be after 1000'
                        },
                        max: {
                            value: new Date().getFullYear(),
                            message: `Year cannot be in the future`
                        }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                {errors.publishedYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.publishedYear.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                </label>
                <select
                    id="status"
                    {...register('status', { required: 'Status is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                    <option value="Available">Available</option>
                    <option value="Issued">Issued</option>
                </select>
                {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-blue-500 bg-gray-100 border border-gray-300 rounded-md 
               hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
               focus-visible:ring-blue-500 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-blue-500 bg-gray-100 border border-gray-300 rounded-md 
               hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
               focus-visible:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                    {book ? 'Update' : 'Add'} Book
                </button>
            </div>

        </form>
    );
};

export default BookForm;