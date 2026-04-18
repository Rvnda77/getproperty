export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">NoBroker Clone</h1>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900">Buy</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Rent</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Sell</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-extrabold text-gray-900">Find Your Dream Property</h2>
          <p className="mt-2 text-sm text-gray-600">Search for properties to buy, rent, or sell.</p>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">Search Properties</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  type="text"
                  placeholder="Location"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <select className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Buy</option>
                  <option>Rent</option>
                </select>
                <input
                  type="number"
                  placeholder="Min Price"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Search
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Featured Properties</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder property cards */}
              <div className="bg-white shadow rounded-lg p-4">
                <img src="/placeholder.jpg" alt="Property" className="w-full h-48 object-cover rounded-md" />
                <h4 className="mt-2 text-lg font-medium">Beautiful Apartment</h4>
                <p className="text-gray-600">$500,000</p>
                <p className="text-sm text-gray-500">3 beds, 2 baths</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <img src="/placeholder.jpg" alt="Property" className="w-full h-48 object-cover rounded-md" />
                <h4 className="mt-2 text-lg font-medium">Cozy House</h4>
                <p className="text-gray-600">$750,000</p>
                <p className="text-sm text-gray-500">4 beds, 3 baths</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <img src="/placeholder.jpg" alt="Property" className="w-full h-48 object-cover rounded-md" />
                <h4 className="mt-2 text-lg font-medium">Modern Villa</h4>
                <p className="text-gray-600">$1,200,000</p>
                <p className="text-sm text-gray-500">5 beds, 4 baths</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
