import React from "react";

import { OptionButton } from "./option-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import ShareIcon from "@/public/share_icon.svg";
import CloseIcon from "@/public/close_icon.svg";
import ExpandIcon from "@/public/expand_icon.svg";
import FavouritesIcon from "@/public/favourites_icon.svg";

import TaskForm from "../forms/task-form";

import { Task } from "@/validation/TaskSchema";

interface TaksModalProps {
  TriggerButton: React.ReactNode;
  initialStatus?: 'todo' | 'in_progress' | 'under_review' | 'finished';
  disableStatus?: boolean;
  task?: Task;
}

const TaksModal: React.FC<TaksModalProps> = ({ TriggerButton, initialStatus, disableStatus, task }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{TriggerButton}</SheetTrigger>
      <SheetContent className="flex flex-col gap-5 w-[40vw]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between -mt-5">
          <div className="flex items-center gap-2">
            <SheetClose asChild>
              <CloseIcon className="w-6 h-6 cursor-pointer" />
            </SheetClose>
            <ExpandIcon className="w-6 h-6 cursor-pointer" />
          </div>

          <div className="flex items-center gap-2">
            <OptionButton Icon={ShareIcon} optionName="Share" />
            <OptionButton Icon={FavouritesIcon} optionName="Favourite" />
          </div>
        </div>

        <TaskForm initialStatus={initialStatus} disableStatus={disableStatus} task={task} />
      </SheetContent>
    </Sheet>
  );
};

export default TaksModal;