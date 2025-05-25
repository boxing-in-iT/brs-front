import BookList from "../../components/BookList";
import Hero from "../../components/Hero";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      {/* <Recommendations /> */}
      <BookList />
    </div>
  );
};
