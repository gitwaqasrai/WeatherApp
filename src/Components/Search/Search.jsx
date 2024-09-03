export default function Search({ search, setSearch, handleSearch,handleKeyDown }) {
 
 
  return (
    <div className="flex items-center justify-center mt-8">
      <input
        type="text"
        name="Search"
        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-l-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
        placeholder="Enter City Name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-r-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
