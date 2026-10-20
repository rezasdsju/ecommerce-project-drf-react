
const SkeletonLoading = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="rounded-lg border p-3">
                    <div className="skeleton-shimmer aspect-square rounded-md"></div>

                    <div className="skeleton-shimmer h-4 rounded mt-3"></div>

                    <div className="skeleton-shimmer h-3 rounded mt-2 w-2/3"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoading;