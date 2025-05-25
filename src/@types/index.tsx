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
  [key: string]: any; // на случай дополнительных полей
}

export interface FilterOptions {
  genre: string;
  author: string;
  rating: number;
}

export interface Image {
  id: number;
  path: string;
  src?: string;
}
