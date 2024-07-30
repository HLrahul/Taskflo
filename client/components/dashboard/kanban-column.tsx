import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragEndEvent, useDroppable } from "@dnd-kit/core";
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

 const handleDrop = (event: any) => {
   const { active, over } = event;
   const { id: sourceId } = active;
   const { id: destinationId } = over;

   setTasks((prevTasks) => {
     const updatedTasks = { ...prevTasks };
     const sourceColumn = updatedTasks[sourceId];
     const destinationColumn = updatedTasks[destinationId];

     if (sourceId === destinationId) {
       const sourceIndex = sourceColumn.findIndex(
         (task) => task.id === active.id
       );
       const destinationIndex = destinationColumn.findIndex(
         (task) => task.id === over.id
       );

       const [movedTask] = sourceColumn.splice(sourceIndex, 1);
       sourceColumn.splice(destinationIndex, 0, movedTask);
     }

     return updatedTasks;
   });
 };

  return (
    <section className="max-h-fit w-full p-2" ref={setNodeRef} onDrop={handleDrop}>
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
