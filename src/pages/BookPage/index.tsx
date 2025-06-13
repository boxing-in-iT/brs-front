import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useBookStore from "../../store/books-store";
import useAuthStore from "../../store/auth-store";
import useInteractionStore from "../../store/interaction-store";

export const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { detailBook, getDetailBook } = useBookStore();
  const isAthorised = useAuthStore((state) => state.isAuthorized);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const getInteractions = useInteractionStore((state) => state.getInteractions);
  const interactions = useInteractionStore((state) => state.interactions);
  const like = useInteractionStore((state) => state.like);
  const dislike = useInteractionStore((state) => state.dislike);

  useEffect(() => {
    getInteractions();
  }, [getInteractions]);

  useEffect(() => {
    if (id) getDetailBook(id);
  }, [id, getDetailBook]);

  useEffect(() => {
    if (id && interactions.length > 0) {
      const interaction = interactions.find((i) => i.book.id === Number(id));
      setLiked(interaction?.interactionType === "like");
      setDisliked(interaction?.interactionType === "dislike");
    }
  }, [id, interactions]);

  const handleLike = async () => {
    if (!isAthorised || !id) return;

    setLiked(true);
    setDisliked(false);
    await like(id);
  };

  const handleDislike = async () => {
    if (!isAthorised || !id) return;

    setDisliked(true);
    setLiked(false);
    await dislike(id);
  };

  if (!detailBook) return <div>Book not found</div>;

  return (
    <main className="w-[90vw] mx-auto p-6 bg-white shadow-lg rounded-lg mt-12 min-h-[80vh]">
      <div className="flex flex-col md:flex-row gap-8">
        {detailBook?.thumbnail && (
          <img
            src={detailBook.thumbnail}
            alt={detailBook.title}
            className="w-full object-cover rounded-lg shadow-md"
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

          {isAthorised && (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 p-2 rounded ${
                  liked ? "text-blue-500" : "text-gray-500"
                } hover:text-blue-600`}
              >
                <svg
                  className="w-6 h-6"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Лайк
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 p-2 rounded ${
                  disliked ? "text-red-500" : "text-gray-500"
                } hover:text-red-600`}
              >
                <svg
                  className="w-6 h-6"
                  fill={disliked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                Дизлайк
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
