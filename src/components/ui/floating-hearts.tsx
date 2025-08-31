import React from 'react';
import { HeartIcon } from './heart-icon';

export const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <HeartIcon
          key={i}
          className={`absolute text-primary/30 animate-float-hearts`}
          filled
          size={16 + (i % 3) * 8}
          style={{
            left: `${10 + (i * 15)}%`,
            top: `${20 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + (i % 2)}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};