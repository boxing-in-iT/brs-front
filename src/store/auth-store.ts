import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
import { instance } from "../services/api-client";
import { ACCESS_TOKEN, AUTH_REFRESH_TOKEN } from "../constants/cookiesKeys";
import { isTokenExpired } from "../services/interceptors";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface IAuthTokens {
  access_token: {
    accessToken: string;
    refreshToken: string;
  };
}

interface IAuthStore {
  isLoading: boolean;
  isAuthorized: boolean;
  user: any;
  login: (params: LoginParams, onSuccess: () => void) => Promise<void>;
  register: (params: RegisterParams, onSuccess: () => void) => Promise<void>;
  logout: () => void;
  clearClient: () => void;
  initAuth: () => void;
  isInitialized: boolean;
}

const useAuthStore = create(
  devtools<IAuthStore>((set) => ({
    isLoading: false,
    isAuthorized: false,
    user: null,
    isInitialized: false,
    clearClient: () => {
      set({
        isLoading: false,
        isAuthorized: false,
        user: null,
      });
      Cookies.remove(ACCESS_TOKEN);
      Cookies.remove(AUTH_REFRESH_TOKEN);
    },
    initAuth: () => {
      const token = Cookies.get(AUTH_REFRESH_TOKEN);
      const isValid = token && !isTokenExpired(token); // <-- ты уже используешь isTokenExpired
      set({ isAuthorized: Boolean(isValid), isInitialized: true });
    },
    login: async (values: LoginParams, onSuccess: () => void) => {
      set({ isLoading: true });

      try {
        const { data } = await instance.post<IAuthTokens>(
          "auth/login/",
          values
        );

        Cookies.set(ACCESS_TOKEN, data.access_token.accessToken); // Исправлено: access вместо access_token
        Cookies.set(AUTH_REFRESH_TOKEN, data.access_token.refreshToken); // Исправлено: refresh вместо refresh_token

        set({ isLoading: false, isAuthorized: true }); // Устанавливаем авторизацию

        onSuccess();
      } catch (error) {
        console.error("Ошибка входа:", error);
        set({ isLoading: false });
        // Здесь можно добавить обработку ошибки, например, показать сообщение пользователю
      }
    },
    register: async (params) => {
      set({ isLoading: true });
      try {
        const { data } = await instance.post("auth/register", params);
        set({ user: data, isAuthorized: true, isLoading: false });
      } catch (error) {
        console.error("Помилка реєстрації:", error);
        set({ isLoading: false });
      }
    },
    logout: () => {},
  }))
);

export default useAuthStore;
