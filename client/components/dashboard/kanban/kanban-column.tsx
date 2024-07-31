import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { useTasks } from "@/app/store/tasksContext";

import TaskCard from "./task-card";
import TaksModal from "../task-modal";

import ColumnOptionsIcon from "@/public/column_options_icon.svg";

interface KanbanColumnProps {
  id: "todo" | "in_progress" | "under_review" | "finished";
  title: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title }) => {
  const { tasks } = useTasks();
  const { setNodeRef } = useDroppable({ id });

  return (
    <section
      className="max-h-fit w-full p-2"
      ref={setNodeRef}
    >
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
              status={task.status}
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
          <Button className="mt-3 w-full flex items-center justify-between z-1000" onClick={e => console.log("clicked")}>
            Add new
            <PlusIcon className="w-5 h-5 text-background" />
          </Button>
        }
      />
    </section>
  );
};
