import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HintCardProps {
  hint: string;
}

const HintCard: React.FC<HintCardProps> = ({ hint }) => {
  const [hintVisible, setHintVisible] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-[#2D5A27]">Need a Hint?</h2>
        <Button
          variant="link"
          onClick={() => setHintVisible(true)}
          disabled={hintVisible}
          className="text-[#8B4513] hover:text-[#8B4513]/80 text-sm font-medium p-0 h-auto"
        >
          {hintVisible ? "Hint shown" : "Show Hint"}
        </Button>
      </div>
      
      {hintVisible ? (
        <div>
          <p className="text-sm">{hint}</p>
        </div>
      ) : (
        <p className="text-sm text-[#2C3639]/70">
          Stuck on this puzzle? Get a hint to point you in the right direction.
        </p>
      )}
    </div>
  );
};

export default HintCard;
