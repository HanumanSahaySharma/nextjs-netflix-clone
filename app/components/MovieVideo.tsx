import { title } from "process";
import prisma from "../utils/db";
import MovieButtons from "./MovieButton";

const getMoviesData = async () => {
  const data = await prisma.movie.findFirst({
    select: {
      id: true,
      title: true,
      overview: true,
      videoSource: true,
      imageString: true,
      release: true,
      duration: true,
      age: true,
    },
  });
  return data;
};

const MovieVideo = async () => {
  const movie = await getMoviesData();
  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        poster={movie?.imageString}
        autoPlay
        muted
        loop
        src={movie?.videoSource}
        className="w-full absolute top-0 left-0 object-cover -z-10 brightness-[60%]"
      />
      <div className="absolute w-[90%] lg:w-[40%]">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {movie?.title}
        </h1>
        <p className="text-white text-lg line-clamp-3">{movie?.overview}</p>
        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            title={movie?.title as string}
            overview={movie?.overview as string}
            id={movie?.id as number}
            age={movie?.age as number}
            youtubeUrl={movie?.videoSource as string}
            releaseYear={movie?.release as number}
            duration={movie?.release as number}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieVideo;
