import { useRef, useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import { CardType } from '@/data/cardData';
import { cn } from '@/lib/utils';

interface RightPanelProps {
  cards: CardType[];
}

const RightPanel = ({ cards }: RightPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerHeight = containerRef.current.clientHeight;
      const scrollTop = containerRef.current.scrollTop;
      const cardIndex = Math.round(scrollTop / containerHeight);
      
      setActiveCardIndex(Math.min(Math.max(0, cardIndex), cards.length - 1));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [cards.length]);

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    
    const containerHeight = containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: index * containerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn(
      "relative w-full md:w-2/5 h-screen",
      isMobile ? "mt-10" : ""
    )}>
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className="h-screen w-full snap-start snap-always"
          >
            <PortfolioCard 
              {...card} 
              isActive={activeCardIndex === index}
            />
          </div>
        ))}
      </div>

      {!isMobile && (
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeCardIndex === index 
                  ? "bg-white w-3 h-3" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightPanel;