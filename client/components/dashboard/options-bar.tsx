import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { OptionButton } from "./option-button";

import AddIcon from "@/public/add_icon.svg";
import ShareIcon from "@/public/share_icon.svg";
import FilterIcon from "@/public/filter_icon.svg";
import SearchIcon from "@/public/search_icon.svg";
import CalendarIcon from "@/public/calendar_icon.svg";
import AutomationIcon from "@/public/automation_icon.svg";
import TaksModal from "./task-modal";

const TriggerButton = (
  <Button className="w-full bg-gradient-taskflo-button hover:bg-gradient-taskflo-hover-button text-white">
    Create new <AddIcon className="w-6 h-6 ml-2" />
  </Button>
);

export default function OptionsBar () {
    return (
        <section className="flex items-center justify-between">
            <div className="flex items-center">
                <Input placeholder="Search" className="w-fit bg-current/100 shadow-none rounded-lg" />
                <SearchIcon className="w-6 h-6 text-gray-400 -ml-8" />
            </div>

            <div className="flex items-center justify-between gap-2">
                <OptionButton Icon={CalendarIcon} optionName="Calendar view" />
                <OptionButton Icon={AutomationIcon} optionName="Automation" />
                <OptionButton Icon={FilterIcon} optionName="Filter" />
                <OptionButton Icon={ShareIcon} optionName="Share" />

                <TaksModal TriggerButton={TriggerButton} />     
            </div>
        </section>
    )
}