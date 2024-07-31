"use client";

import { useRef, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { KanbanColumn } from "./kanban-column";

import { Task } from "@/validation/TaskSchema";
import { useTasks } from "@/app/store/tasksContext";

export default function Kanban() {
  const isEditCalled = useRef(false);
  const { tasks, setTasks, editTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    const task = Object.values(tasks)
      .flat()
      .find((task) => task.id === id);
    setActiveTask(task || null);

    isEditCalled.current = false;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const { id: activeId } = active;
    const { id: overId } = over;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const { id: activeId } = active;
    const { id: overId } = over;

    if (activeId === overId) {
      return;
    }

    setTasks((prevTasks) => {
      const activeColumn = Object.keys(prevTasks).find((key) =>
        prevTasks[key].some((task) => task.id === activeId)
      );
      const overColumn =
        Object.keys(prevTasks).find((key) =>
          prevTasks[key].some((task) => task.id === overId)
        ) || overId;

      if (!activeColumn) {
        return prevTasks;
      }

      const activeTask = prevTasks[activeColumn].find(
        (task) => task.id === activeId
      );

      if (!activeTask) {
        return prevTasks;
      }

      if (activeColumn === overColumn) {
        const sourceIndex = prevTasks[activeColumn].findIndex(
          (task) => task.id === activeId
        );
        const destinationIndex = prevTasks[overColumn].findIndex(
          (task) => task.id === overId
        );

        const updatedColumn = arrayMove(
          prevTasks[activeColumn],
          sourceIndex,
          destinationIndex
        );

        return {
          ...prevTasks,
          [activeColumn]: updatedColumn,
        };
      }

      const activeItems = prevTasks[activeColumn].filter(
        (task) => task.id !== activeId
      );
      let overItems = prevTasks[overColumn] || [];
      const updatedTask = {
        ...activeTask,
        status: overColumn.toString() as
          | "todo"
          | "in_progress"
          | "under_review"
          | "finished",
      };

      if (activeColumn !== overColumn) {
        if (!isEditCalled.current) {
          editTask(updatedTask, true);
          isEditCalled.current = true;
        }
        overItems = prevTasks[overColumn]
          ? [...prevTasks[overColumn], updatedTask]
          : [activeTask];
      }

      return {
        ...prevTasks,
        [activeColumn]: activeItems,
        [overColumn]: overItems,
      };
    });

    setActiveTask(null);
  };

  return (
    <div className="h-full w-full overflow-hidden bg-background/100 rounded-lg p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="h-full overflow-y-scroll flex items-start justify-between gap-4 hide-scrollbar">
          <KanbanColumn id="todo" title="To Do" />
          <KanbanColumn id="in_progress" title="In Progress" />
          <KanbanColumn id="under_review" title="Under Review" />
          <KanbanColumn id="finished" title="Finished" />
        </div>
      </DndContext>
    </div>
  );
}
