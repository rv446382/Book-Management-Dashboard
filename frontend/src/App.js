import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useBooks } from './context/BookContext';
import BookTable from './component/BookTable';
import BookForm from './component/BookForm';
import DeleteConfirmation from './component/DeleteConfirmation';
import SearchAndFilter from './component/SearchAndFilter';
import Pagination from './component/Pagination';
import LoadingSkeleton from './component/LoadingSkeleton';

function App() {
  const {
    loading,
    loadBooks,
    deleteBook
  } = useBooks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (id) => {
    await deleteBook(id);
    setIsDeleteModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-500">📚 Book Management Dashboard</h1>
                <button
                  onClick={handleAddBook}
                  className="px-5 py-2 bg-white text-blue-600 text-sm font-semibold rounded-lg shadow hover:bg-gray-100 transition-all duration-200"
                >
                  + Add New Book
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <SearchAndFilter />

              {loading ? (
                <LoadingSkeleton />
              ) : (
                <>
                  <BookTable onEdit={handleEdit} onDelete={handleDelete} />
                  <Pagination />
                </>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {selectedBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <BookForm book={selectedBook} onClose={handleFormClose} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <DeleteConfirmation
            book={selectedBook}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;