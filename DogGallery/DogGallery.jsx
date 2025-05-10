import React, { useState, useEffect } from 'react';

const DogGallery = () => {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
        if (!response.ok) throw new Error('Failed to fetch dogs');
        const data = await response.json();
        setDogs(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Adorable Dog Gallery
            </span>
          </h1>
          <p className="text-lg text-gray-600">Random collection of cute dog pictures</p>
        </div>

        {/* Loading & Error States */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-cyan-600 h-12 w-12"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <p className="text-red-600 font-medium">Error: {error}</p>
          </div>
        ) : (
          /* Dog Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dogs.map((dogUrl, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={dogUrl}
                  alt={`Dog ${index + 1}`}
                  className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="font-bold text-lg">Good Doggo</h3>
                    <p className="text-sm">Breed: Unknown</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-cyan-800">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        {!isLoading && !error && (
          <div className="mt-12 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Load New Dogs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogGallery;