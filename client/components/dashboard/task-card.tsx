import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { Button } from "../ui/button";
import {
  LowPriorityTag,
  MediumPriorityTag,
  UrgentPriorityTag,
} from "./priority-tags";

import TaksModal from "./task-modal";

import ClockIcon from "@/public/clock_icon.svg";

import { Task } from "@/validation/TaskSchema";
import { useRef } from "react";

export default function TaskCard({
  id,
  status,
  title,
  description,
  deadline,
  priority,
  created_at,
}: Task) {
  const editButtonRef = useRef<HTMLButtonElement | null>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditTask = () => {
    if (editButtonRef.current) {
      editButtonRef.current.click();
    }
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="max-h-fit w-full bg-foreground/5 border-[0.5px] border-foreground/5 p-3 flex flex-col gap-3 rounded-lg cursor-grab mt-3"
        onClick={(e) => {
          handleEditTask();
        }}
      >
        <p className="text-md">{title}</p>

        {description !== "" && (
          <p className="text-xs text-gray-400 -mt-3">{description}</p>
        )}

        {priority === "low" && <LowPriorityTag />}
        {priority === "medium" && <MediumPriorityTag />}
        {priority === "urgent" && <UrgentPriorityTag />}

        {deadline && (
          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            <p className="text-xs">{deadline.toDateString()}</p>
          </div>
        )}

        {created_at && (
          <p className="text-gray-400 text-xs">{created_at.toDateString()}</p>
        )}
      </div>
      <div>
        <TaksModal
          initialStatus={status}
          disableStatus={true}
          task={{
            id,
            title,
            description,
            deadline,
            priority,
            status,
            created_at,
          }}
          TriggerButton={
            <Button ref={editButtonRef} className="hidden"></Button>
          }
        />
      </div>
    </>
  );
}
