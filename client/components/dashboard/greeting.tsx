"use client";

import { Barlow } from "next/font/google";

import { useUser } from "@/app/store/userContext";

import HelpFeedbackIcon from "@/public/help_n_feedback_icon.svg";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Greeting() {
  const { userName } = useUser();

  return (
    <div className="w-full flex items-center justify-between">
      <p
        className={`${barlow.className} font-bold text-4xl`}
      >{`Good morning, ${userName}!`}</p>
      <span className="flex gap-2 cursor-pointer items-center">
        <p className="text-sm">Help & feedback</p>
        <HelpFeedbackIcon className="w-6 h-6 text-gray-500" />
      </span>
    </div>
  );
}
