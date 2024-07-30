const LowPriorityTag = () => {
    return <span className="w-fit items-center justify-start px-2 py-1 bg-[#0ECC5A] rounded-lg">
        <p className="text-white text-xs">Low</p>
    </span>;
}

const MediumPriorityTag = () => {
  return (
    <span className="w-fit items-center justify-start px-2 py-1 bg-[#FFA235] rounded-lg">
      <p className="text-white text-xs">Medium</p>
    </span>
  );
};

const UrgentPriorityTag = () => {
  return (
    <span className="w-fit items-center justify-start px-2 py-1 bg-[#FF6B6B] rounded-lg">
      <p className="text-white text-xs">Urgent</p>
    </span>
  );
};

export { LowPriorityTag, MediumPriorityTag, UrgentPriorityTag };