import React from "react";
import { mockBooks } from "../../constants/mockData";
import BookCard from "../BookCard";

const Recommendations: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recommended for You
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
