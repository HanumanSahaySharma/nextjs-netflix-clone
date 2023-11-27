import prisma from "@/app/utils/db";
import Image from "next/image";
import MovieCard from "./MovieCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

const getRecentMovies = async (userId: string) => {
  const data = await prisma.movie.findMany({
    select: {
      id: true,
      title: true,
      overview: true,
      imageString: true,
      videoSource: true,
      youtubeString: true,
      watchLists: {
        where: {
          userId: userId,
        },
      },
      age: true,
      duration: true,
      release: true,
    },
    orderBy: {
      createAt: "desc",
    },
    take: 4,
  });
  return data;
};

const RecentlyAdded = async () => {
  const session = await getServerSession(authOptions);
  const movies = await getRecentMovies(session?.user?.email as string);
  return (
    <>
      <h1 className="text-3xl font-bold">Recently Added</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-8 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="relative h-48 cursor-pointer">
            <Image
              src={movie.imageString}
              alt={movie.title}
              priority
              width={500}
              height={500}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duraction hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex justify-center items-center">
                <Image
                  src={movie.imageString}
                  alt={movie.title}
                  width={800}
                  height={800}
                  priority
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  overview={movie.overview}
                  title={movie.title}
                  watchListId={movie.watchLists[0]?.id}
                  youtubeUrl={movie.youtubeString}
                  watchList={movie.watchLists.length > 0 ? true : false}
                  age={movie.age}
                  duration={movie.duration}
                  releaseYear={movie.release}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default RecentlyAdded;
