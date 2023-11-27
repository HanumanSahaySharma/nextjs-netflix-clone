import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import MovieCard from "../../components/MovieCard";

const getData = async (userId: string) => {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      Movie: {
        select: {
          id: true,
          title: true,
          overview: true,
          imageString: true,
          youtubeString: true,
          release: true,
          age: true,
          duration: true,
          watchLists: true,
        },
      },
    },
  });
  return data;
};

const WatchLists = async () => {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);
  return (
    <div className="p-5 sm:p-0">
      <h1 className="text-white text-4xl font-bold underline mt-10 px-5 sm:px-0 mb-5">
        Your watch lists
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
        {data?.map((movie) => (
          <div
            key={movie.Movie?.id}
            className="border border-gray-600 relative h-60 rounded-sm"
          >
            <Image
              src={movie.Movie?.imageString as string}
              className="w-full absolute rounded-sm h-full object-cover"
              width={500}
              height={500}
              alt={movie.Movie?.title as string}
              priority
            />
            <div className="h-60 relative z-10 w-full transform transition duraction hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex justify-center items-center">
                <Image
                  src={movie.Movie?.imageString as string}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                  width={500}
                  height={500}
                  alt={movie.Movie?.title as string}
                  priority
                />
                <MovieCard
                  key={movie.Movie?.id}
                  movieId={movie.Movie?.id as number}
                  overview={movie.Movie?.overview as string}
                  title={movie.Movie?.title as string}
                  watchListId={movie.Movie?.watchLists[0]?.id as string}
                  youtubeUrl={movie.Movie?.youtubeString as string}
                  watchList={
                    (movie.Movie?.watchLists.length as number) > 0
                      ? true
                      : false
                  }
                  age={movie.Movie?.age as number}
                  duration={movie.Movie?.duration as number}
                  releaseYear={movie.Movie?.release as number}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WatchLists;
