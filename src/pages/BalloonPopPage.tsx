import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/ui/heart-icon';
import { FloatingHearts } from '@/components/ui/floating-hearts';
import { useQuest } from '@/contexts/QuestContext';

interface Balloon {
  id: number;
  x: number;
  y: number;
  popped: boolean;
  size: number;
}

const BalloonPopPage = () => {
  const { goToNextPage, addCredit, completeCurrentPage } = useQuest();
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  useEffect(() => {
    // Create 6 floating heart balloons
    const newBalloons: Balloon[] = [];
    for (let i = 0; i < 6; i++) {
      newBalloons.push({
        id: i,
        x: 15 + (i % 3) * 30 + Math.random() * 10,
        y: 20 + Math.floor(i / 3) * 40 + Math.random() * 15,
        popped: false,
        size: 40 + Math.random() * 20
      });
    }
    setBalloons(newBalloons);
  }, []);

  const handleBalloonPop = (balloonId: number) => {
    setBalloons(prev => 
      prev.map(balloon => 
        balloon.id === balloonId 
          ? { ...balloon, popped: true }
          : balloon
      )
    );
    
    const newPoppedCount = poppedCount + 1;
    setPoppedCount(newPoppedCount);
    
    if (newPoppedCount === 6) {
      setGameCompleted(true);
      setTimeout(() => {
        setShowCredit(true);
        addCredit("With you, every moment feels magical ✨");
        completeCurrentPage();
      }, 1000);
    }
  };

  const handleNext = () => {
    window.location.href = '/final-surprise';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dreamy relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        <h1 className="font-romantic text-5xl md:text-6xl mb-8 text-foreground">
          Heart Balloon Pop 🎈💕
        </h1>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-romantic mb-8">
          <p className="font-display text-xl text-card-foreground mb-6">
            Pop all the floating hearts to reveal your magical message!
          </p>
          <p className="font-display text-lg text-muted-foreground">
            Hearts popped: {poppedCount}/6
          </p>
        </div>
        
        <div className="relative h-96 mb-8">
          {balloons.map((balloon) => (
            <div
              key={balloon.id}
              className={`absolute transition-all duration-500 cursor-pointer ${
                balloon.popped ? 'scale-0 opacity-0' : 'hover:scale-110'
              }`}
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => !balloon.popped && handleBalloonPop(balloon.id)}
            >
              {!balloon.popped ? (
                <HeartIcon 
                  className="text-primary animate-float-hearts hover-glow"
                  size={balloon.size}
                  filled
                />
              ) : (
                <div className="animate-sparkle">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full animate-bounce-in"
                      style={{
                        left: `${(i % 3) * 20 - 20}px`,
                        top: `${Math.floor(i / 3) * 20 - 20}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {showCredit && (
          <div className="bg-gradient-romantic rounded-3xl p-6 shadow-heart mb-8 animate-bounce-in">
            <h3 className="font-romantic text-2xl text-primary-foreground mb-2">
              Credit #3 Unlocked! 🎉
            </h3>
            <p className="font-display text-lg text-primary-foreground">
              "With you, every moment feels magical ✨"
            </p>
          </div>
        )}

        {gameCompleted && (
          <Button 
            onClick={handleNext}
            size="lg"
            className="bg-gradient-romantic hover:bg-gradient-heart text-primary-foreground font-display text-xl px-12 py-6 rounded-full shadow-heart hover-float hover-glow animate-bounce-in"
          >
            Final Surprise
            <HeartIcon className="ml-3" size={24} filled />
          </Button>
        )}
        
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === 3 ? 'bg-primary animate-pulse-love' : 
                i < 3 ? 'bg-primary/50' :
                'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalloonPopPage;