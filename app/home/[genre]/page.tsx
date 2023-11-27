import { FC } from "react";
import { authOptions } from "@/app/utils/auth";
import prisma from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import MovieCard from "../components/MovieCard";

const getData = async (category: string, userId: string) => {
  switch (category) {
    case "shows": {
      const data = await prisma.movie.findMany({
        where: {
          category: "show",
        },
        select: {
          id: true,
          title: true,
          overview: true,
          imageString: true,
          youtubeString: true,
          release: true,
          age: true,
          duration: true,
          watchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "movies": {
      const data = await prisma.movie.findMany({
        where: {
          category: "movie",
        },
        select: {
          id: true,
          title: true,
          overview: true,
          imageString: true,
          youtubeString: true,
          release: true,
          age: true,
          duration: true,
          watchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    case "recently": {
      const data = await prisma.movie.findMany({
        where: {
          category: "recent",
        },
        select: {
          id: true,
          title: true,
          overview: true,
          imageString: true,
          youtubeString: true,
          release: true,
          age: true,
          duration: true,
          watchLists: {
            where: {
              userId: userId,
            },
          },
        },
      });
      return data;
    }
    default: {
      throw new Error("Internal server error");
    }
  }
};

interface IParamsProps {
  params: {
    genre: string;
  };
}

const CategoryPage: FC<IParamsProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const { genre } = params;
  const data = await getData(genre, session?.user?.email as string);
  return (
    <div className="p-5 sm:p-0">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
        {data?.map((movie) => (
          <div
            key={movie.id}
            className="border border-gray-600 relative h-60 rounded-sm"
          >
            <Image
              src={movie.imageString}
              className="w-full absolute rounded-sm h-full object-cover"
              width={500}
              height={500}
              alt={movie.title}
              priority
            />
            <div className="h-60 relative z-10 w-full transform transition duraction hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex justify-center items-center">
                <Image
                  src={movie.imageString}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                  width={500}
                  height={500}
                  alt={movie.title}
                  priority
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
    </div>
  );
};
export default CategoryPage;
