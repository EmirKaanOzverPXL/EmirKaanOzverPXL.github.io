import { useState } from "react";
import { cn } from "@/lib/utils";
import { CardType } from "@/data/cardData";
import { MotionDiv } from "@/lib/motion";

interface PortfolioCardProps extends CardType {
  isActive: boolean;
}

const PortfolioCard = ({
  title,
  description,
  image,
  tags,
  isActive,
}: PortfolioCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionDiv
      className={cn(
        "h-full w-full flex items-center justify-center",
        isActive ? "z-10" : "z-0"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MotionDiv
        className={cn(
          "glass rounded-xl w-[95%] h-[90%] mx-auto overflow-hidden flex flex-col",
          "transition-all duration-300 ease-out",
          isHovered ? "scale-[1.02] shadow-lg" : ""
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${isHovered ? 0.15 : 0.1})`,
        }}
      >
        {image ? (
          // Layout when image is present (50/50 split)
          <div className="flex flex-col h-full">
            <div className="h-1/2 overflow-hidden">
              <img
                src={image}
                alt={title}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500",
                  isHovered ? "scale-110" : "scale-100"
                )}
              />
            </div>
            <div className="h-1/2 p-6 overflow-y-auto">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {title}
              </h3>
              
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <p className="text-gray-300">{description}</p>
            </div>
          </div>
        ) : (
          // Layout when no image is present (full height for content)
          <div className="p-6 h-full overflow-y-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              {title}
            </h3>
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-gray-300">{description}</p>
          </div>
        )}
      </MotionDiv>
    </MotionDiv>
  );
};

export default PortfolioCard;