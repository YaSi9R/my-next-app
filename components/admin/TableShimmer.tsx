const ShimmerSection = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-xl shadow animate-pulse">
      <div className="h-6 bg-gray-300 w-48 mb-6 rounded"></div>
      <div className="h-10 bg-gray-200 w-full mb-4 rounded"></div>

      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 w-full mb-3 rounded"
        />
      ))}
    </div>

    <div className="bg-white p-6 rounded-xl shadow animate-pulse">
      <div className="h-6 bg-gray-300 w-48 mb-6 rounded"></div>
      <div className="h-10 bg-gray-200 w-full mb-4 rounded"></div>

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-200 w-full mb-3 rounded"
        />
      ))}
    </div>
  </div>
);
export default ShimmerSection;
