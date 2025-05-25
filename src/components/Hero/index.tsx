import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHNAMES } from "../../constants/routes";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center py-16 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Discover Your Next Favorite Book
      </h1>
      <p className="text-gray-600 mb-6">
        Personalized book recommendations based on your preferences.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        onClick={() => navigate(PATHNAMES.GET_RECOMMENDATIONS)}
      >
        Get Recommendations
      </button>
    </section>
  );
};

export default Hero;
