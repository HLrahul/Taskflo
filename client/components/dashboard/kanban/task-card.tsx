import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

import {
  LowPriorityTag,
  MediumPriorityTag,
  UrgentPriorityTag,
} from "../priority-tags";

import TaksModal from "../task-modal";
import SortableItem from "./sortable-item";

import { Task } from "@/validation/TaskSchema";

import EditIcon from "@/public/edit_icon.svg";
import ClockIcon from "@/public/clock_icon.svg";

export default function TaskCard({
  id,
  status,
  title,
  description,
  deadline,
  priority,
  created_at,
}: Task) {
  const [isHovered, setIsHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = {
    transform: CSS.Transform.toString({
      x: transform?.x || 0,
      y: transform?.y || 0,
      scaleX: 1,
      scaleY: 1,
    }),
    transition: isDragging ? "none" : "transform 0.2s ease",
  };

  return (
    <section
      className={`flex items-start relative ${
        status === "finished" ? "flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SortableItem key={id} id={id}>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={`max-h-fit w-full bg-foreground/5 border-[0.5px] border-foreground/5 p-3 flex flex-col gap-3 rounded-lg cursor-grab mt-3 ${
            isDragging ? "min-h-min scale-x-0 scale-y-0" : ""
          }`}
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
      </SortableItem>
      {isHovered && (
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
              <div
                className={`absolute bg-transparent outline-none border-none shadow-none mt-3 p-1 hover:bg-white rounded-lg ${
                  isHovered ? "bg-white" : ""
                } ${status === "finished" ? "-ml-6 mt-5" : ""}`}
              >
                <EditIcon className="w-fit h-fit flex items-start justify-start text-white" />
              </div>
            }
          />
        </div>
      )}
    </section>
  );
}
