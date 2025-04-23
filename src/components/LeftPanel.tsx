import { MotionDiv, MotionH1, MotionH2, MotionP } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LeftPanel = () => {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full md:w-3/5 h-screen flex flex-col justify-center items-center glass md:p-10 p-5 z-10"
    >
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <MotionH1
            className={cn(
              "text-4xl sm:text-6xl md:text-7xl font-bold mb-4 text-white tracking-tight",
              "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400",
              "transition-all duration-300"
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            Emir Kaan Özver
          </MotionH1>

          <MotionH2
            className={cn(
              "text-xl sm:text-2xl md:text-3xl text-gray-200 mb-8",
              "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-teal-400",
              "transition-all duration-300"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            I-Talent Portfolio
          </MotionH2>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

          <MotionP
            className="text-gray-300 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Welkom bij mijn portfolio waarin ik mijn vaardigheden, projecten en professionele reis presenteer. 
            Scroll door de kaarten aan de rechterkant om meer te leren over mijn werk en ervaringen.
          </MotionP>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 md:block hidden">
        <MotionDiv
          className="text-white/50 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Scroll om te verkennen
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default LeftPanel;