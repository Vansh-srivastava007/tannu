import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/ui/heart-icon';
import { FloatingHearts } from '@/components/ui/floating-hearts';
import { useQuest } from '@/contexts/QuestContext';
import { useNavigate } from 'react-router-dom';
import coupleImage from '@/assets/couple-2.jpg';

const HeartPuzzlePage = () => {
  const { goToNextPage, addCredit, completeCurrentPage, quest } = useQuest();
  const navigate = useNavigate();
  const [heartClicked, setHeartClicked] = useState(false);
  const [showCredit, setShowCredit] = useState(false);
  const [puzzleStep, setPuzzleStep] = useState(0);

  const handleHeartClick = () => {
    if (puzzleStep === 0) {
      setPuzzleStep(1);
      setTimeout(() => {
        setPuzzleStep(2);
        setTimeout(() => {
          setHeartClicked(true);
          setTimeout(() => {
            setShowCredit(true);
            addCredit("You're the most beautiful part of my world 💕");
            completeCurrentPage();
          }, 500);
        }, 800);
      }, 600);
    }
  };

  const handleNext = () => {
    navigate('/memory-match');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dreamy relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 animate-fade-in-up">
        <h1 className="font-romantic text-5xl md:text-6xl mb-8 text-foreground">
          Puzzle of Love 💝
        </h1>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-romantic mb-8">
          {puzzleStep >= 1 && (
            <div className="mb-6 animate-fade-in">
              <img 
                src={coupleImage} 
                alt="Sweet couple moment" 
                className="w-20 h-20 rounded-full object-cover mx-auto shadow-heart animate-bounce-in border-4 border-primary/50"
              />
            </div>
          )}
          
          <p className="font-display text-xl text-card-foreground mb-8">
            {puzzleStep === 0 && "Click the heart to start unlocking your love message! 💕"}
            {puzzleStep === 1 && "The magic is beginning... 🌟"}
            {puzzleStep === 2 && "Almost there! One more click! ✨"}
            {heartClicked && "Perfect! Your heart is glowing with love! 💖"}
          </p>
          
          <div 
            className={`relative mx-auto w-32 h-32 cursor-pointer transition-all duration-500 ${
              heartClicked ? 'scale-150' : puzzleStep > 0 ? 'scale-125 animate-pulse' : 'hover:scale-110'
            }`}
            onClick={handleHeartClick}
          >
            <HeartIcon 
              className={`w-full h-full transition-all duration-500 ${
                heartClicked 
                  ? 'text-primary animate-pulse-love' 
                  : puzzleStep > 0 
                    ? 'text-primary/70 animate-pulse'
                    : 'text-muted hover:text-primary animate-pulse'
              }`}
              filled={heartClicked || puzzleStep > 0}
              size={128}
            />
            
            {puzzleStep >= 1 && !heartClicked && (
              <div className="absolute inset-0 animate-sparkle">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full animate-bounce"
                    style={{
                      left: `${30 + (i % 2) * 40}%`,
                      top: `${30 + Math.floor(i / 2) * 40}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            {heartClicked && (
              <div className="absolute inset-0 animate-sparkle">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{
                      left: `${10 + (i % 4) * 25}%`,
                      top: `${10 + Math.floor(i / 4) * 30}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {showCredit && (
          <div className="bg-gradient-romantic rounded-3xl p-6 shadow-heart mb-8 animate-bounce-in">
            <h3 className="font-romantic text-2xl text-primary-foreground mb-2">
              Credit #1 Unlocked! 🎉
            </h3>
            <p className="font-display text-lg text-primary-foreground">
              "You're the most beautiful part of my world 💕"
            </p>
          </div>
        )}

        {heartClicked && (
          <Button 
            onClick={handleNext}
            size="lg"
            className="bg-gradient-romantic hover:bg-gradient-heart text-primary-foreground font-display text-xl px-12 py-6 rounded-full shadow-heart hover-float hover-glow animate-bounce-in"
          >
            Next Adventure
            <HeartIcon className="ml-3" size={24} filled />
          </Button>
        )}
        
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === 1 ? 'bg-primary animate-pulse-love' : 
                i === 0 ? 'bg-primary/50' :
                'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeartPuzzlePage;