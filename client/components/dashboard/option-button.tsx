interface OptionButtonProps {
  Icon: React.ElementType;
  optionName: string;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ Icon, optionName }) => {
  return (
    <div className="flex items-center justify-between w-fit gap-3 cursor-pointer rounded-md hover:bg-foreground/5 py-2 px-3">
      <p className="text-gray-500 text-sm">{optionName}</p>
      <Icon className="w-6 h-6 text-gray-400 text-sm" />
    </div>
  );
};