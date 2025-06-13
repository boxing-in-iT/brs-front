import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import useBookStore from "../../store/books-store";
import { useNavigate } from "react-router-dom";

export const GetRecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const recommendations = useBookStore((state) => state.recommendations);
  const getRecommendations = useBookStore((state) => state.getRecommendations);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setError("");

    try {
      await getRecommendations(searchTerm);
    } catch (e) {
      setError("Failed to fetch recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="relative">
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter book title..."
              className="w-full p-3 pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />
            <button
              onClick={handleSearch}
              className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : recommendations.length === 0 ? (
            <p>No recommendations yet. Try searching above.</p>
          ) : (
            <ul className="space-y-4">
              {recommendations.map((book: any, index: any) => (
                <li
                  key={index}
                  className="border-b border-gray-200 pb-3 last:border-none"
                  onClick={() => handleClick(book.id + 1)}
                >
                  <h3 className="text-lg font-medium">{book.title}</h3>
                  <p className="text-sm text-gray-600">
                    by {book.authors || "Unknown author"}{" "}
                    {book.published_year && `(${book.published_year})`}
                  </p>
                  {book.categories && (
                    <p className="text-sm text-blue-500">
                      Category: {book.categories}
                    </p>
                  )}
                  <p className="text-sm">
                    Rating: {book.average_rating ?? "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
