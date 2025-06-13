import { FC, useEffect } from "react";
import useInteractionStore from "../../store/interaction-store";
import useBookStore from "../../store/books-store";

export const ProfilePage: FC = () => {
  const getInteractions = useInteractionStore((state) => state.getInteractions);
  const interactions = useInteractionStore((state) => state.interactions);

  const getPersonalRecommendations = useBookStore(
    (state) => state.getPersonalRecommendations
  );
  const personalRecommendations = useBookStore(
    (state) => state.personalRecommendations
  );

  useEffect(() => {
    getInteractions();
    getPersonalRecommendations();
  }, [getInteractions, getPersonalRecommendations]);

  const likedBooks = interactions.filter(
    (item) => item.interactionType === "like"
  );
  const dislikedBooks = interactions.filter(
    (item) => item.interactionType === "dislike"
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Профіль</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Уподобані книги</h2>
          {likedBooks.length === 0 ? (
            <p className="text-gray-500">Ще немає уподобаних книг.</p>
          ) : (
            <ul className="space-y-4">
              {likedBooks.map((interaction) => (
                <li
                  key={interaction.id}
                  className="p-4 bg-white rounded shadow flex gap-4"
                >
                  <img
                    src={interaction.book.thumbnail}
                    alt={interaction.book.title}
                    className="w-20 h-auto rounded"
                  />
                  <div>
                    <h3 className="text-lg font-medium">
                      {interaction.book.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {interaction.book.authors}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {interaction.book.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Не сподобались</h2>
          {dislikedBooks.length === 0 ? (
            <p className="text-gray-500">Ще немає книг, які не сподобались.</p>
          ) : (
            <ul className="space-y-4">
              {dislikedBooks.map((interaction) => (
                <li
                  key={interaction.id}
                  className="p-4 bg-white rounded shadow flex gap-4"
                >
                  <img
                    src={interaction.book.thumbnail}
                    alt={interaction.book.title}
                    className="w-20 h-auto rounded"
                  />
                  <div>
                    <h3 className="text-lg font-medium">
                      {interaction.book.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {interaction.book.authors}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {interaction.book.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Рекомендовані книги</h2>
        {personalRecommendations.length === 0 ? (
          <p className="text-gray-500">Рекомендацій поки немає.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalRecommendations.map((book: any) => (
              <li key={book.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-medium">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.authors}</p>
                <p className="text-sm text-gray-500">
                  Категорія: {book.categories || "Невідомо"}
                </p>
                <p className="text-sm text-gray-500">
                  Рейтинг: {book.average_rating} | Рік: {book.published_year}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
