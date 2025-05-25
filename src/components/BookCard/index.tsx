import React from "react";
import { Book } from "../../@types";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { title, subtitle, authors, description, thumbnail, categories } = book;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow p-4 flex flex-col"
      onClick={handleClick}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="w-40 h-60 object-fit rounded-md mb-4"
        />
      ) : (
        <div className="h-40 bg-gray-200 rounded-md mb-4" />
      )}
      <h3 className="text-lg font-semibold mb-2">Назва книги {title}</h3>
      <p className="text-sm text-gray-600 mb-2">Автор: {authors}</p>
      <p className="text-sm text-gray-600">Жанр: {categories}</p>
      <p className="text-sm text-gray-800">
        Описание: {description?.slice(0, 25)}
      </p>
      <p className="text-sm text-gray-600">Подзаголовок: {subtitle}</p>
      <p className="text-sm text-gray-600">ISBN: {book.isbn13}</p>
    </div>
  );
};

export default BookCard;
