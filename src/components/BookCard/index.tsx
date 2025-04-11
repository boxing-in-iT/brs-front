import React from "react";
import { Book } from "../../@types";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={book.coverImage}
        alt={`Cover of ${book.title}`}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-600">by {book.author}</p>
        <p className="text-sm text-yellow-500 mt-1">Rating: {book.rating}</p>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
