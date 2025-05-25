import React, { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

// Sample book data
const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 6, title: "Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien" },
];

export const GetRecommendationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search for book recommendations..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />
            <ArrowRight />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Recommended Books</h2>
          <ul className="space-y-3">
            {books.map((book) => (
              <li key={book.id} className="border-b border-gray-200 pb-2">
                <span className="font-medium">{book.title}</span> by{" "}
                {book.author}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
