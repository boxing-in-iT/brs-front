import { Book } from "../@types";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 4.3,
    description:
      "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.",
    coverImage: "https://via.placeholder.com/150x220?text=Gatsby",
    genre: "Classic",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    rating: 4.7,
    description:
      "A dystopian novel set in a totalitarian society under constant surveillance.",
    coverImage: "https://via.placeholder.com/150x220?text=1984",
    genre: "Dystopian",
  },
  // Add more books as needed
];
