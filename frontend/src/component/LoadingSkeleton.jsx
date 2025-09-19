const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex space-x-4 mb-6">
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {[...Array(6)].map((_, i) => (
                                <th key={i} scope="col" className="px-6 py-3">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <tr key={i}>
                                {[...Array(6)].map((_, j) => (
                                    <td key={j} className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex space-x-2">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSkeleton;