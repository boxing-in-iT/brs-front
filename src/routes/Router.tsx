import { FC, useEffect } from "react";
import { PATHNAMES } from "../constants/routes";
import { HomePage } from "../pages/HomePage";
// import { AUTH_REFRESH_TOKEN } from "../constants/cookiesKeys";
// import Cookies from "js-cookie";
// import { isTokenExpired } from "../services/interceptors";
import { useLocation, useRoutes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LoginPage } from "../pages/Login";
import { BookPage } from "../pages/BookPage";
import { GetRecommendationsPage } from "../pages/GetRecommendationsPage";
import { ProfilePage } from "../pages/Profile";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import useAuthStore from "../store/auth-store";

const ROUTES = [
  {
    element: <HomePage />,
    path: PATHNAMES.HOME,
  },
  {
    element: <LoginPage />,
    path: PATHNAMES.LOGIN,
  },
  {
    element: <BookPage />,
    path: `${PATHNAMES.BOOK}`,
  },
  {
    element: <GetRecommendationsPage />,
    path: `${PATHNAMES.GET_RECOMMENDATIONS}`,
  },
  {
    element: <PrivateRoute component={ProfilePage} />,
    path: `${PATHNAMES.PROFILE}`,
  },
];

const AppRoutes: FC = () => {
  // const refreshToken = Cookies.get(AUTH_REFRESH_TOKEN);
  // const skip = !refreshToken || isTokenExpired(refreshToken);
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth(); // ← при монтировании проверим токен
  }, []);

  const location = useLocation();
  const authPage = [PATHNAMES.LOGIN];
  const hideHeaderFooter = authPage.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {useRoutes(ROUTES)}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default AppRoutes;
