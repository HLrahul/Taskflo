import { ReactNode } from "react";

interface MenuItemProps {
  Icon: ReactNode;
  text: string;
  selected?: boolean;
}

export default function MenuItem ({ Icon, text, selected }: MenuItemProps) {
    return (
      <div className={`w-inherit flex items-center justify-start gap-3 p-2 rounded-sm cursor-pointer hover:bg-foreground/5 ${selected ? "bg-foreground/5 border-[1px] border-forground-100" : ""}`}>
        {Icon}
        <p className="w-[400] text-gray-500"> {text} </p>
      </div>
    );
}