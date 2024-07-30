"use client";

import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";

export default function Kanban() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="h-full w-full bg-background/100 rounded-lg p-4 overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
      >
        <div className="flex items-start justify-between gap-4">
            <KanbanColumn id="todo" title="To Do" />
            <KanbanColumn id="in_progress" title="In Progress" />
            <KanbanColumn id="under_review" title="Under Review" />
            <KanbanColumn id="finished" title="Finished" />
        </div>
      </DndContext>
    </div>
  );
}
