import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IProps {
  title: string;
  overview: string;
  youtubeUrl: string;
  state: boolean;
  changeState: any;
  releaseYear: number;
  age: number;
  duration: number;
}

const PlayVideoModal: FC<IProps> = ({
  title,
  overview,
  youtubeUrl,
  state,
  changeState,
  releaseYear,
  age,
  duration,
}) => {
  return (
    <Dialog open={state} onOpenChange={() => changeState(!state)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="line-clamp-2">
            {overview}
          </DialogDescription>
          <div className="flex gap-x-2 items-center">
            <span>{releaseYear}</span>
            <span className="border py-0.5px px-1 border-gray-200">{age}+</span>
            <span>{duration}h</span>
          </div>
          <iframe src={youtubeUrl} height={250} className="w-full" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default PlayVideoModal;
