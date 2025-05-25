import BookList from "../../components/BookList";
import Hero from "../../components/Hero";
import Recommendations from "../../components/Recommendations";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      {/* <Recommendations /> */}
      <BookList />
    </div>
  );
};
