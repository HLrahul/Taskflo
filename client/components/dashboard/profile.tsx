import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import MenuItem from "./menu_item";

import BellIcon from "@/public/bell_icon.svg";
import HomeIcon from "@/public/home_icon.svg";
import TeamsIcon from "@/public/teams_icon.svg";
import BoardsIcon from "@/public/boards_icon.svg";
import ForwardIcon from "@/public/forward_icon.svg";
import DownloadIcon from "@/public/download_icon.svg";
import SettingsIcon from "@/public/settings_icon.svg";
import AnalyticsIcon from "@/public/analytics_icon.svg";

export default function Profile() {
  return (
    <section className="h-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-start gap-2">
        <Avatar className="rounded-sm h-8 w-8">
          <AvatarImage src="/profile_image.png"></AvatarImage>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <p className="font-medium text-lg">User name</p>
      </div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-start gap-1">
          <BellIcon className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />
          <ThemeToggle />
          <ForwardIcon className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />
        </div>

        <Button variant="ghost" className="bg-foreground/5 text-gray-500">Logout</Button>
      </div>

      <div className="w-full flex flex-col gap-1">
        <MenuItem Icon={<HomeIcon className="-mt-1 w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />} text="Home" selected={true} />
        <MenuItem Icon={<BoardsIcon className="-mt-1 w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />} text="Boards" />
        <MenuItem Icon={<SettingsIcon className="-mt-1 w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />} text="Settings" />
        <MenuItem Icon={<TeamsIcon className="-mt-1 w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />} text="Teams" />
        <MenuItem Icon={<AnalyticsIcon className="-mt-1 w-6 h-6 text-gray-500 hover:text-black cursor-pointer" />} text="Analytics" />
      </div>

      <div className="flex items-center gap-3 p-2 rounded-md bg-foreground/5 cursor-pointer mt-auto">
        <DownloadIcon className="w-8 h-8 text-gray-500" />
        <div className="flex flex-col items-start justify-between">
          <p className="text-gray-500 text-lg font-semibold">Download the app</p>
          <p className="text-gray-500 text-xs">Get the full experience</p>
        </div>
      </div>
    </section>
  );
}
