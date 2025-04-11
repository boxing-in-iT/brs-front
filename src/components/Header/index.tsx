import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">BookRec</div>
      <nav className="hidden md:flex gap-6 text-gray-700">
        <a href="#" className="hover:text-blue-600">
          Home
        </a>
        <a href="#" className="hover:text-blue-600">
          Catalog
        </a>
        <a href="#" className="hover:text-blue-600">
          Recommendations
        </a>
        <a href="#" className="hover:text-blue-600">
          Profile
        </a>
      </nav>
      <input
        type="text"
        placeholder="Search books..."
        className="border rounded-md px-3 py-1 ml-4 w-1/3 hidden md:block"
        aria-label="Search books"
      />
    </header>
  );
};

export default Header;
