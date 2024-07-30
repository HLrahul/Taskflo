import { useDraggable } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";

import TaskCard from "./task-card";

import ColumnOptionsIcon from "@/public/column_options_icon.svg";
import TaksModal from "./task-modal";

interface KanbanColumnProps {
  id: "todo" | "in_progress" | "under_review" | "finished";
  title: string;
}

const tasks = [
  {
    id: "Task-1",
    title: "Task 1",
    description: "This is a task description",
    deadline: new Date(),
    priority: 1,
    created_at: new Date(),
  },
];

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title }) => {
  const { setNodeRef } = useDraggable({ id });

  return (
    <section className="h-full w-full overflow-y-auto p-2" ref={setNodeRef}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xl text-gray-600">{title}</p>
        <ColumnOptionsIcon className="w-6 h-6 cursor-pointer" />
      </div>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            created_at={task.created_at}
            priority={task.priority}
          />
        ))}

        <TaksModal
          initialStatus={id}
          disableStatus={true}
          TriggerButton={
            <Button className="mt-3 w-full flex items-center justify-between">
              Add new
              <PlusIcon className="w-5 h-5 text-background" />
            </Button>
          }
        />
      </SortableContext>
    </section>
  );
};
