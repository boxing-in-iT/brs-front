import React, { useEffect, useState } from "react";
import useBookStore from "../../store/books-store";
import BookCard from "../BookCard";
import Pagination from "../Pagination";

const categories = [
  "All",
  "Fiction",
  "Non-fiction",
  "Fantasy",
  "Science",
  "History",
];

const BookList = () => {
  const { books, isLoading, getBooks } = useBookStore();

  // Основные фильтры
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("");
  const [sort, setSort] = useState<
    "title:ASC" | "title:DESC" | "rating:ASC" | "rating:DESC"
  >("title:ASC");

  const [currentPage, setCurrentPage] = useState(1);

  // Локальные фильтры для UI
  const [localSearch, setLocalSearch] = useState("");
  const [localAuthor, setLocalAuthor] = useState("");
  const [localCategory, setLocalCategory] = useState("All");
  const [localSort, setLocalSort] = useState<
    "title:ASC" | "title:DESC" | "rating:ASC" | "rating:DESC"
  >("title:ASC");

  useEffect(() => {
    fetchBooks(1); // загружаем книги со значениями фильтров по умолчанию
  }, []);

  const fetchBooks = (pageNum = 1) => {
    setCurrentPage(pageNum);
    getBooks({
      search: search || undefined,
      category: category !== "All" ? category : undefined,
      author: author || undefined,
      sort,
      page: pageNum,
    });
  };

  const fetchBooksDirect = (
    search: string,
    author: string,
    category: string,
    sort: "title:ASC" | "title:DESC" | "rating:ASC" | "rating:DESC",
    pageNum = 1
  ) => {
    setCurrentPage(pageNum);
    getBooks({
      search: search || undefined,
      author: author || undefined,
      category: category !== "All" ? category : undefined,
      sort,
      page: pageNum,
    });
  };

  const applyFilters = () => {
    setSearch(localSearch);
    setAuthor(localAuthor);
    setCategory(localCategory);
    setSort(localSort);

    fetchBooksDirect(localSearch, localAuthor, localCategory, localSort, 1);
  };

  if (isLoading) return <div className="text-center mt-10">Загрузка...</div>;

  return (
    <div className="flex min-h-screen flex-col w-screen">
      <div className="flex flex-col lg:flex-row flex-1 w-full px-10 py-10 gap-10">
        <aside className="lg:w-1/4 w-full bg-white shadow rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Фильтры</h2>

          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Поиск книги..."
            className="w-full mb-4 px-3 py-2 border rounded-md"
          />

          <input
            type="text"
            value={localAuthor}
            onChange={(e) => setLocalAuthor(e.target.value)}
            placeholder="Автор книги..."
            className="w-full mb-4 px-3 py-2 border rounded-md"
          />

          <div className="mb-4">
            <label className="block mb-2 font-medium">Жанр</label>
            <select
              className="w"
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Сортировка</label>
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={localSort}
              onChange={(e) =>
                setLocalSort(
                  e.target.value as
                    | "title:ASC"
                    | "title:DESC"
                    | "rating:ASC"
                    | "rating:DESC"
                )
              }
            >
              <option value="title:ASC">Название (по возрастанию)</option>
              <option value="title:DESC">Название (по убыванию)</option>
              <option value="rating:ASC">Рейтинг (по возрастанию)</option>
              <option value="rating:DESC">Рейтинг (по убыванию)</option>
            </select>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-4"
          >
            Применить фильтры
          </button>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.data.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <Pagination
            currentPage={books.page}
            totalPages={books.totalPages}
            onPageChange={fetchBooks}
          />
        </main>
      </div>
    </div>
  );
};

export default BookList;
