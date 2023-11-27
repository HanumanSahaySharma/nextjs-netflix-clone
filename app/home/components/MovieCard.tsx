"use client";
import { Button } from "@/components/ui/button";
import { FileHeartIcon, Heart, PlayCircleIcon } from "lucide-react";
import { FC, useState } from "react";
import PlayVideoModal from "./PlayVideoModal";
import { addToWatchLists, deleteFromWatchLists } from "@/app/action";
import { usePathname } from "next/navigation";

interface IMovie {
  title: string;
  overview: string;
  movieId: number;
  watchListId: string;
  watchList: boolean;
  youtubeUrl: string;
  age: number;
  duration: number;
  releaseYear: number;
}
const MovieCard: FC<IMovie> = ({
  title,
  overview,
  movieId,
  watchList,
  watchListId,
  youtubeUrl,
  age,
  duration,
  releaseYear,
}) => {
  const [visible, setVisible] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <button onClick={() => setVisible(true)} className="-mt-14">
        <PlayCircleIcon className="w-16 h-16" />
      </button>
      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form action={deleteFromWatchLists}>
            <input type="hidden" name="watchlistId" value={watchListId} />
            <input type="hidden" name="pathName" value={pathName} />
            <Button variant={"outline"} size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={addToWatchLists}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathName" value={pathName} />
            <Button variant={"outline"} size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 absolute bottom-0 left-0 right-0">
        <p className="text-white text-lg font-normal line-clamp-1">{title}</p>
        <p className="text-white text-xs line-clamp-1">{overview}</p>
        <p className="flex items-center text-slate-400 text-xs mt-2 justify-between items-center">
          <span>{releaseYear}</span>
          <span className="border py-0.5px px-1 border-gray-200">{age}+</span>
          <span>{duration}h</span>
        </p>
      </div>
      <PlayVideoModal
        key={movieId}
        title={title}
        overview={overview}
        youtubeUrl={youtubeUrl}
        state={visible}
        changeState={setVisible}
        releaseYear={releaseYear}
        age={age}
        duration={duration}
      />
    </>
  );
};
export default MovieCard;
