import { ReactNode } from "react";

interface TaskLabelProps {
  Icon: ReactNode;
  text: string;
}

export default function TaskInputLabel({ Icon, text }: TaskLabelProps) {
  return (
    <div className="w-inherit flex items-center justify-start gap-4 p-2 rounded-sm cursor-pointer text-gray-400">
      {Icon}
      <p className="w-[400] text-sm text-gray-500"> {text} </p>
    </div>
  );
}
