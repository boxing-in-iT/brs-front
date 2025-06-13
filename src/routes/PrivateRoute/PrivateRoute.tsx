import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ONLY_FOR, OnlyFor } from "./types";
import useAuthStore from "../../store/auth-store";
import { AUTH_REFRESH_TOKEN } from "../../constants/cookiesKeys";
import { isTokenExpired } from "../../services/interceptors";
import { PATHNAMES } from "../../constants/routes";

interface Props {
  component: FC;
  onlyFor?: OnlyFor;
}

export const PrivateRoute: FC<Props> = ({
  component: Component,
  onlyFor = ONLY_FOR.AUTHORIZED,
}) => {
  const isAuthorised = useAuthStore((state) => state.isAuthorized);
  const isInitialized = useAuthStore((state) => state.isInitialized); // ← добавим
  const clearClient = useAuthStore((state) => state.clearClient);

  const refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);
  const isRefreshTokenExpired = !refreshToken || isTokenExpired(refreshToken);

  const location = useLocation();

  // 🔒 Пока не инициализировали auth — ничего не рендерим
  if (!isInitialized) return null;

  if (isRefreshTokenExpired) {
    clearClient();
    return <Navigate to={PATHNAMES.LOGIN} replace />;
  }

  const { AUTHORIZED, UNAUTHORIZED } = ONLY_FOR;

  const hasAccess =
    (onlyFor === AUTHORIZED && isAuthorised) ||
    (onlyFor === UNAUTHORIZED && !isAuthorised);

  if (hasAccess) return <Component />;

  if (!isAuthorised) {
    return <Navigate to={PATHNAMES.LOGIN} state={{ from: location }} replace />;
  }

  return <Navigate to={PATHNAMES.HOME} replace />;
};
