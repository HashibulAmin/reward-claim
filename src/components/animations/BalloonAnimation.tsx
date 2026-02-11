import React from 'react';

interface BalloonProps {
  count?: number;
  className?: string;
}

export const BalloonAnimation: React.FC<BalloonProps> = ({ 
  count = 15,
  className = "" 
}) => {
  const balloons = Array.from({ length: count }).map((_, i) => ({
    id: i,
    color: ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 6)],
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {balloons.map((b) => (
        <div
          key={b.id}
          className={`absolute bottom-[-100px] opacity-70 ${b.color} rounded-full`}
          style={{
            left: b.left,
            width: '60px',
            height: '70px',
            transform: `scale(${b.scale})`,
            animation: `float-up ${b.animationDuration} linear infinite`,
            animationDelay: b.animationDelay,
            boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.1)'
          }}
        >
          {/* String */}
          <div className="absolute top-full left-1/2 w-[2px] h-[60px] bg-white/30 origin-top transform -translate-x-1/2 animate-wiggle" />
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(var(--scale, 1)); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(-120vh) scale(var(--scale, 1)); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
