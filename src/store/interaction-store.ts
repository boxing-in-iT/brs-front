import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { instance } from "../services/api-client";

interface IInteractionStore {
  isLoading: boolean;
  interactions: any[];
  getInteractions: () => Promise<void>;
  like: (bookId: string) => Promise<void>;
  dislike: (bookId: string) => Promise<void>;
  cancelLike: (bookId: string) => Promise<void>;
  cancelDislike: (bookId: string) => Promise<void>;
}

const useInteractionStore = create(
  devtools<IInteractionStore>((set) => ({
    isLoading: false,
    interactions: [],
    getInteractions: async () => {
      set({ isLoading: true });
      try {
        const { data } = await instance.get("/interactions");
        set({ interactions: data, isLoading: false });
      } catch (error) {
        console.error("Ошибка получения взаимодействий:", error);
        set({ isLoading: false });
      }
    },
    like: async (bookId: string) => {
      try {
        await instance.post(`/interactions/`, {
          bookId,
          interactionType: "like",
        });
      } catch (error) {
        console.error("Error", error);
      }
    },
    dislike: async (bookId: string) => {
      try {
        await instance.post(`/interactions/`, {
          bookId,
          interactionType: "dislike",
        });
      } catch (error) {
        console.error("Error", error);
      }
    },
    cancelLike: (bookId: string) => Promise.resolve(),
    cancelDislike: (bookId: string) => Promise.resolve(),
  }))
);

export default useInteractionStore;
