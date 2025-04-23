import { useEffect, useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { cn } from '@/lib/utils';
import { cardData } from '@/data/cardData';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div className="gradient-bg" />
      <div className={cn(
        "relative flex flex-col md:flex-row w-full min-h-screen",
        isMobile ? "flex-col" : "flex-row"
      )}>
        <LeftPanel />
        <RightPanel cards={cardData} />
      </div>
    </>
  );
};

export default Layout;