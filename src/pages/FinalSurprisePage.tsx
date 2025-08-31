import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/ui/heart-icon';
import { useQuest } from '@/contexts/QuestContext';

const FinalSurprisePage = () => {
  const { quest, addCredit, completeCurrentPage } = useQuest();
  const [showFinalMessages, setShowFinalMessages] = useState(false);
  const [showRainOfHearts, setShowRainOfHearts] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowRainOfHearts(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowFinalMessages(true);
      addCredit("Thank you for being my everything 💝");
      addCredit("I love you, Tannu ❤️ Forever & Always");
      completeCurrentPage();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [addCredit, completeCurrentPage]);

  const restartJourney = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dreamy relative overflow-hidden">
      {/* Falling hearts animation */}
      {showRainOfHearts && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <HeartIcon
              key={i}
              className="absolute text-primary animate-bounce-in"
              filled
              size={20 + (i % 4) * 10}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationName: 'fade-in-up',
                animationDuration: `${3 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 2}s`,
                animationFillMode: 'forwards',
                transform: `translateY(${window.innerHeight + 100}px)`
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-fade-in-up">
        <div className="mb-12 animate-bounce-in">
          <HeartIcon className="mx-auto text-primary animate-pulse-love mb-8" size={120} filled />
          <h1 className="font-romantic text-6xl md:text-7xl text-foreground mb-4">
            Final Surprise! 🎉
          </h1>
          <p className="font-display text-2xl text-muted-foreground">
            You've completed Tannu's Love Quest!
          </p>
        </div>

        {/* All collected credits */}
        <div className="space-y-6 mb-12">
          {quest.credits.map((credit, index) => (
            <div
              key={index}
              className="bg-gradient-romantic rounded-3xl p-6 shadow-heart animate-bounce-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <h3 className="font-romantic text-xl text-primary-foreground mb-2">
                Credit #{index + 1}
              </h3>
              <p className="font-display text-lg text-primary-foreground">
                {credit}
              </p>
            </div>
          ))}
        </div>

        {showFinalMessages && (
          <div className="space-y-8 mb-12 animate-fade-in-up">
            <div className="bg-gradient-heart rounded-3xl p-8 shadow-dreamy">
              <h2 className="font-romantic text-4xl text-primary-foreground mb-6">
                A Special Message Just for You 💕
              </h2>
              <div className="space-y-4 text-primary-foreground">
                <p className="font-display text-xl">
                  Tannu, you are the light in my darkest days,
                </p>
                <p className="font-display text-xl">
                  the smile that makes everything worthwhile,
                </p>
                <p className="font-display text-xl">
                  and the love that makes life beautiful.
                </p>
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <HeartIcon className="text-primary-foreground animate-pulse-love" size={32} filled />
                  <p className="font-romantic text-2xl">
                    Forever yours
                  </p>
                  <HeartIcon className="text-primary-foreground animate-pulse-love" size={32} filled />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Button 
            onClick={restartJourney}
            size="lg"
            className="bg-gradient-romantic hover:bg-gradient-heart text-primary-foreground font-display text-xl px-12 py-6 rounded-full shadow-heart hover-float hover-glow"
          >
            Play Again
            <HeartIcon className="ml-3 animate-float-hearts" size={24} filled />
          </Button>
        </div>
        
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-pulse-love"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalSurprisePage;