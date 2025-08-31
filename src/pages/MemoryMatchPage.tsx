import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HeartIcon } from '@/components/ui/heart-icon';
import { FloatingHearts } from '@/components/ui/floating-hearts';
import { useQuest } from '@/contexts/QuestContext';
import { useNavigate } from 'react-router-dom';
import couple1 from '@/assets/couple-1.jpg';
import couple2 from '@/assets/couple-2.jpg';
import couple3 from '@/assets/couple-3.jpg';

interface Card {
  id: number;
  symbol: string;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatchPage = () => {
  const { goToNextPage, addCredit, completeCurrentPage } = useQuest();
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  const cardTypes = [
    { symbol: '💕', image: couple1 },
    { symbol: '💖', image: couple2 },
    { symbol: '💝', image: couple3 }
  ];

  useEffect(() => {
    // Create pairs of cards
    const newCards: Card[] = [];
    cardTypes.forEach((cardType, index) => {
      newCards.push(
        { id: index * 2, symbol: cardType.symbol, image: cardType.image, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, symbol: cardType.symbol, image: cardType.image, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    const shuffled = newCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || gameCompleted) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card?.isFlipped || card?.isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.symbol === secondCard?.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === first || c.id === second) 
              ? { ...c, isMatched: true } 
              : c
          ));
          setFlippedCards([]);
          
          // Check if game completed
          const newCards = cards.map(c => 
            (c.id === first || c.id === second) 
              ? { ...c, isMatched: true } 
              : c
          );
          
          if (newCards.every(c => c.isMatched)) {
            setGameCompleted(true);
            setTimeout(() => {
              setShowCredit(true);
              addCredit("You make me smile even on my worst days 😘");
              completeCurrentPage();
            }, 500);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            (c.id === first || c.id === second) 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleNext = () => {
    navigate('/balloon-pop');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dreamy relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6 animate-fade-in-up">
        <h1 className="font-romantic text-5xl md:text-6xl mb-8 text-foreground">
          Memory Match 🧠💕
        </h1>
        
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-romantic mb-8">
          <p className="font-display text-xl text-card-foreground mb-8">
            Find the matching pairs to unlock your next love message!
          </p>
          
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`aspect-square bg-gradient-heart rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-romantic ${
                  card.isFlipped || card.isMatched 
                    ? 'transform scale-105 ring-2 ring-primary' 
                    : 'hover:scale-105 hover-glow'
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                {(card.isFlipped || card.isMatched) ? (
                  <div className="w-full h-full relative animate-bounce-in">
                    <img 
                      src={card.image} 
                      alt="Beautiful memory" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1">
                      <span className="text-lg">{card.symbol}</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-heart">
                    <HeartIcon className="text-primary-foreground animate-pulse" size={32} filled />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {showCredit && (
          <div className="bg-gradient-romantic rounded-3xl p-6 shadow-heart mb-8 animate-bounce-in">
            <h3 className="font-romantic text-2xl text-primary-foreground mb-2">
              Credit #2 Unlocked! 🎉
            </h3>
            <p className="font-display text-lg text-primary-foreground">
              "You make me smile even on my worst days 😘"
            </p>
          </div>
        )}

        {gameCompleted && (
          <Button 
            onClick={handleNext}
            size="lg"
            className="bg-gradient-romantic hover:bg-gradient-heart text-primary-foreground font-display text-xl px-12 py-6 rounded-full shadow-heart hover-float hover-glow animate-bounce-in"
          >
            Continue Journey
            <HeartIcon className="ml-3" size={24} filled />
          </Button>
        )}
        
        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === 2 ? 'bg-primary animate-pulse-love' : 
                i < 2 ? 'bg-primary/50' :
                'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchPage;