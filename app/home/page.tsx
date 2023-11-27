import MovieVideo from "../components/MovieVideo";
import RecentlyAdded from "./components/RecentlyAdded";

export default async function Home() {
  return (
    <div className="p-5 lg:p-0">
      <MovieVideo />
      <RecentlyAdded />
    </div>
  );
}
