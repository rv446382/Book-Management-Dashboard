const DeleteConfirmation = ({ book, onConfirm, onCancel }) => {
    return (
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">"{book.title}"</span> by {book.author}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    onClick={() => onConfirm(book.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmation;