import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { LowPriorityTag, MediumPriorityTag, UrgentPriorityTag } from "./priority-tags";

import ClockIcon from "@/public/clock_icon.svg";

interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    deadline: string;
    priority: number;
    created_at: string;
}

export default function TaskCard ({ id, title, description, deadline, priority, created_at }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const createdAtDate = new Date(created_at);
    const deadlineDate = deadline ? new Date(deadline) : null;

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="max-h-fit w-full bg-foreground/5 border-[0.5px] border-foreground/5 p-3 flex flex-col gap-3 rounded-lg cursor-grab mt-3"
      >
        <p className="">{title}</p>

        {description !== "" && (
          <p className="text-sm text-gray-400 -mt-3">{description}</p>
        )}

        {priority === 1 && <LowPriorityTag />}
        {priority === 2 && <MediumPriorityTag />}
        {priority === 3 && <UrgentPriorityTag />}

        {deadlineDate && (
          <div className="flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            <p className="text-xs">{deadlineDate.toDateString()}</p>
          </div>
        )}

        {created_at && (
          <p className="text-gray-400 text-xs">
            {createdAtDate.toDateString()}
          </p>
        )}
      </div>
    );
}