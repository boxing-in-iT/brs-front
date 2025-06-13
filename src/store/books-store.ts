import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { instance } from "../services/api-client"; // axios instance

export interface Book {
  id: number;
  isbn13: string;
  isbn10: string;
  title: string;
  subtitle: string | null;
  author?: string;
  description?: string;
  category?: string;
  coverImage?: string;
  [key: string]: any; // на случай дополнительных полей
}

export interface BookListResponse {
  data: Book[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface IBookStore {
  isLoading: boolean;
  books: BookListResponse;
  detailBook: any;
  recommendations: any;
  personalRecommendations: any;
  getBooks: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    author?: string;
    category?: string;
    sort?: "title:ASC" | "title:DESC" | "rating:ASC" | "rating:DESC";
  }) => Promise<void>;
  getDetailBook: (id: string) => Promise<void>;
  getRecommendations: (title: string) => Promise<void>;
  getPersonalRecommendations: () => Promise<void>;
}

const useBookStore = create(
  devtools<IBookStore>((set) => ({
    isLoading: false,
    recommendations: [],
    personalRecommendations: [],
    books: {
      data: [],
      page: 0,
      limit: 0,
      total: 0,
      totalPages: 0,
    },
    detailBook: null,

    getBooks: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get("/books", {
          params: {
            page: params?.page || 1,
            limit: params?.limit || 9,
            search: params?.search || undefined,
            author: params?.author || undefined,
            category: params?.category || undefined,
            sort: params?.sort || undefined,
          },
        });
        set({ books: data, isLoading: false });
      } catch (error) {
        console.error("Ошибка получения книг:", error);
        set({ isLoading: false });
      }
    },

    getDetailBook: async (id: string) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get(`/books/${id}`);
        set({ detailBook: data, isLoading: false });
      } catch (error) {
        console.error("Ошибка получения книги:", error);
        set({ isLoading: false });
      }
    },

    getRecommendations: async (title: string) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get("/recommendations", {
          params: { title },
        });
        set({ recommendations: data, isLoading: false });
      } catch (error) {
        console.error("Ошибка получения рекомендаций:", error);
        set({ isLoading: false });
      }
    },

    getPersonalRecommendations: async () => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get("/recommendations/personalized");
        set({ personalRecommendations: data, isLoading: false });
      } catch (error) {
        console.error("Ошибка получения рекомендаций:", error);
        set({ isLoading: false });
      }
    },
  }))
);

export default useBookStore;
