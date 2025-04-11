import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-6 text-center text-sm text-gray-600">
      <p>© 2025 BookRec. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" aria-label="Twitter" className="hover:text-blue-500">
          Twitter
        </a>
        <a href="#" aria-label="Facebook" className="hover:text-blue-500">
          Facebook
        </a>
        <a href="#" aria-label="Contact" className="hover:text-blue-500">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
