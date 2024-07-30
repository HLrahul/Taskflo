import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import { useTasks } from "@/app/store/tasksContext";

import TaskCard from "./task-card";
import TaksModal from "./task-modal";

import ColumnOptionsIcon from "@/public/column_options_icon.svg";

interface KanbanColumnProps {
  id: "todo" | "in_progress" | "under_review" | "finished";
  title: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title }) => {
  const { tasks, setTasks } = useTasks();
  const { setNodeRef } = useDroppable({ id });

  const handleDrop = (event: { active: any; over: any }) => {
    const { active, over } = event;
    if (!over) return;

    const { id: sourceId } = active;
    const { id: destinationId } = over;

    if (sourceId !== destinationId) {
      setTasks((prevTasks) => {
        const sourceColumn = prevTasks[sourceId];
        const destinationColumn = prevTasks[destinationId];

        const sourceIndex = sourceColumn.findIndex(
          (task) => task.id === active.id
        );
        const [draggedItem] = sourceColumn.splice(sourceIndex, 1);

        const newTasks = { ...prevTasks };
        newTasks[sourceId] = sourceColumn;
        newTasks[destinationId] = [...destinationColumn, draggedItem];

        return newTasks;
      });
    }
  };

  return (
    <section className="max-h-fit w-full p-2" ref={setNodeRef}>
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
          <Button className="mt-3 w-full flex items-center justify-between">
            Add new
            <PlusIcon className="w-5 h-5 text-background" />
          </Button>
        }
      />
    </section>
  );
};