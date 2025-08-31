import React from 'react';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/ui/heart-icon';
import { FloatingHearts } from '@/components/ui/floating-hearts';
import { useQuest } from '@/contexts/QuestContext';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/romantic-hero.jpg';
import coupleImage from '@/assets/couple-1.jpg';

const WelcomePage = () => {
  const { goToNextPage } = useQuest();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/heart-puzzle');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-dreamy/80"></div>
      <FloatingHearts />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 animate-fade-in-up">
        <div className="mb-8 animate-bounce-in">
          <HeartIcon className="mx-auto text-primary animate-pulse-love" size={80} filled />
        </div>
        
        <h1 className="font-romantic text-6xl md:text-7xl mb-6 text-foreground">
          Hi Tannu 💖
        </h1>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-romantic mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={coupleImage} 
              alt="Beautiful couple moment" 
              className="w-24 h-24 rounded-full object-cover shadow-heart animate-pulse-love border-4 border-primary/30"
            />
          </div>
          <p className="font-display text-xl md:text-2xl text-card-foreground leading-relaxed mb-6">
            I heard your mood is off... so I made this little game just for you. 
          </p>
          <p className="font-display text-lg text-muted-foreground">
            Let's go on a Love Quest! ✨
          </p>
        </div>

        <Button 
          onClick={handleStartJourney}
          size="lg"
          className="bg-gradient-romantic hover:bg-gradient-heart text-primary-foreground font-display text-xl px-12 py-6 rounded-full shadow-heart hover-float hover-glow animate-pulse-love"
        >
          Start the Journey
          <HeartIcon className="ml-3 animate-float-hearts" size={24} filled />
        </Button>
        
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === 0 ? 'bg-primary animate-pulse-love' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;