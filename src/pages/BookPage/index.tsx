import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBookStore from "../../store/books-store";

export interface Book {
  id: number;
  isbn13: string;
  isbn10: string;
  title: string;
  subtitle: string | null;
  authors?: string;
  description?: string;
  categories?: string;
  thumbnail?: string;
  [key: string]: any;
}

// Мок книги для демонстрации
const mockBooks: Book[] = [
  {
    id: 1,
    isbn13: "9781234567897",
    isbn10: "1234567890",
    title: "React для профессионалов",
    subtitle: "Глубокое погружение в React и TypeScript",
    authors: "Иван Иванов, Петр Петров",
    description:
      "Это подробное руководство по React и TypeScript поможет вам создавать мощные и масштабируемые приложения.",
    categories: "Программирование, Веб-разработка",
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL._SX379_BO1,204,203,200_.jpg",
  },
  // можно добавить ещё книги
];

export const BookPage: React.FC = () => {
  const { id } = useParams();
  const { detailBook, isLoading, getDetailBook } = useBookStore();

  useEffect(() => {
    if (id) {
      getDetailBook(id);
    }
  }, [id, getDetailBook]);

  if (!detailBook) return <div>Book not found</div>;

  return (
    <main className="w-[90vw] mx-auto p-6 bg-white shadow-lg rounded-lg mt-12 min-h-[80vh]">
      <div className="flex flex-col md:flex-row gap-8">
        {detailBook?.thumbnail && (
          <img
            src={detailBook.thumbnail}
            alt={detailBook.title}
            className="w-full  object-cover rounded-lg shadow-md"
          />
        )}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-900">
            {detailBook.title}
          </h1>
          {detailBook.subtitle && (
            <h2 className="text-xl text-gray-600 mt-1">
              {detailBook.subtitle}
            </h2>
          )}
          {detailBook.authors && (
            <p className="mt-4 text-gray-700 font-semibold">
              Автор(ы): {detailBook.authors}
            </p>
          )}
          {detailBook.categories && (
            <p className="mt-2 text-sm text-gray-500 italic">
              Категории: {detailBook.categories}
            </p>
          )}

          {detailBook.description && (
            <section className="mt-6 text-gray-800 leading-relaxed whitespace-pre-line">
              {detailBook.description}
            </section>
          )}

          <div className="mt-6 border-t pt-4 text-gray-600 text-sm">
            <p>
              <span className="font-semibold">ISBN-13:</span>{" "}
              {detailBook.isbn13}
            </p>
            <p>
              <span className="font-semibold">ISBN-10:</span>{" "}
              {detailBook.isbn10}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
