import { useDraggable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { PlusIcon } from "@radix-ui/react-icons";

import { useTasks } from "@/app/store/tasksContext";

import { Button } from "../ui/button";

import TaksModal from "./task-modal";
import TaskCard from "./task-card";

import ColumnOptionsIcon from "@/public/column_options_icon.svg";

interface KanbanColumnProps {
  id: "todo" | "in_progress" | "under_review" | "finished";
  title: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title }) => {
  const { tasks } = useTasks();
  const { setNodeRef } = useDraggable({ id });

  return (
    <section className="h-full w-full p-2" ref={setNodeRef}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xl text-gray-600">{title}</p>
        <ColumnOptionsIcon className="w-6 h-6 cursor-pointer" />
      </div>
      <SortableContext
        id={id}
        items={tasks[id] || []}
        strategy={verticalListSortingStrategy}
      >
        {(tasks[id] || []).map((task) => (
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
      </SortableContext>

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
    </section>
  );
};
