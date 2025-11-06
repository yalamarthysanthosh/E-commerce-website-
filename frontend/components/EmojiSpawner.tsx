import React, { useState, useCallback } from 'react';

const emojis = ['✨', '🚀', '🔥', '💎', '🎉', '🤩', '🎶', '🎧'];

interface Pop {
  char: string;
  x: number;
  y: number;
  id: number;
}

const EmojiSpawner: React.FC = () => {
  const [pops, setPops] = useState<Pop[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn an emoji occasionally to prevent clutter
    if (Math.random() > 0.92) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const char = emojis[Math.floor(Math.random() * emojis.length)];
      const id = Date.now() + Math.random();
      
      setPops(current => [...current, { char, x, y, id }]);
      
      // Clean up the emoji from state after its animation finishes
      setTimeout(() => {
        setPops(current => current.filter(p => p.id !== id));
      }, 1000); // This duration should match the CSS animation duration
    }
  }, []);

  return (
    <div onMouseMove={handleMouseMove} className="absolute inset-0 z-20">
      {pops.map(({ char, x, y, id }) => (
        <span
          key={id}
          className="absolute text-2xl animate-emoji-pop pointer-events-none"
          style={{ left: x, top: y }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default EmojiSpawner;