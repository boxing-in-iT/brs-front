export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  description: string;
  coverImage: string;
  genre: string;
}

export interface FilterOptions {
  genre: string;
  author: string;
  rating: number;
}
