// Loading skeleton for public pages
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto mb-8"></div>

          {/* Search Bar Skeleton */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-16 bg-gray-200 rounded-2xl"></div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex gap-2 justify-center mb-8 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
            ))}
          </div>
        </div>

        {/* Prompts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
