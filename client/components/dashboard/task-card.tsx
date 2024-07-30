import { LowPriorityTag, MediumPriorityTag, UrgentPriorityTag } from "./priority-tags";

import ClockIcon from "@/public/clock_icon.svg";

interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    deadline: Date | null;
    priority: number;
    created_at: Date | null;
}

export default function TaskCard ({ id, title, description, deadline, priority, created_at }: TaskCardProps) {
    return (
        <div className="h-fit w-full bg-foreground/5 border-[0.5px] border-foreground/5 p-3 flex flex-col gap-3 rounded-lg cursor-grab">
            <p className="">{title}</p>
            
            { description !== "" && <p className="text-sm text-gray-400 -mt-4">
                {description}
            </p> }

            { priority === 1 && <LowPriorityTag /> }
            { priority === 2 && <MediumPriorityTag /> }
            { priority === 3 && <UrgentPriorityTag /> }

            { deadline && <div className="flex items-center gap-2">
                <ClockIcon className="w-6 h-6" />
                <p className="text-xs">{deadline.toDateString()}</p>
            </div> }

            { created_at && <p className="text-gray-400 text-xs">{ created_at.toDateString() }</p> }
        </div>
    )
}