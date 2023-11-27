"use client";
import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircleIcon } from "lucide-react";
import PlayVideoModal from "../home/components/PlayVideoModal";
import { FC, useState } from "react";

interface IProps {
  title: string;
  overview: string;
  id: number;
  age: number;
  youtubeUrl: string;
  releaseYear: number;
  duration: number;
}

const MovieButtons: FC<IProps> = ({
  title,
  overview,
  id,
  age,
  youtubeUrl,
  releaseYear,
  duration,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)} className="text-lg font-medium">
        <PlayCircleIcon className="mr-2 w-6 h-6" /> Play
      </Button>
      <Button
        onClick={() => setVisible(true)}
        className="text-lg font-medium text-white bg-white/40 hover:bg-white/30"
      >
        <InfoIcon className="mr-2 w-6 h-6" /> Learn More
      </Button>
      <PlayVideoModal
        state={visible}
        changeState={setVisible}
        title={title}
        overview={overview}
        key={id}
        age={age}
        youtubeUrl={youtubeUrl}
        releaseYear={releaseYear}
        duration={duration}
      />
    </>
  );
};
export default MovieButtons;
