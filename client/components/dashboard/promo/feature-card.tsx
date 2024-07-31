import React from "react";

interface FeatureCardProps {
  featureImage: React.ElementType;
  featureHeader: string;
  featureDescription: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  featureImage: FeatureImage,
  featureHeader,
  featureDescription,
}) => {
  return (
    <div className="px-4 py-4 rounded-md flex items-center gap-3 max-w-fit h-28 sm:h-fit bg-background/100 cursor-pointer">
      <FeatureImage className="min-w-fit" />
      <span className="flex flex-col gap-1 max-w-fit">
        <p className="text-gray-500 text-sm font-semibold">{featureHeader}</p>
        <p className="text-gray-400 text-xs">{featureDescription}</p>
      </span>
    </div>
  );
};
