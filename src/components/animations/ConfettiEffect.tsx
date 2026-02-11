import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';


// Simple useWindowSize hook implementation since we might not want another dependency just for this
const useInternalWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect: React.FC<ConfettiProps> = ({ active, onComplete }) => {
  const { width, height } = useInternalWindowSize();
  const [show, setShow] = useState(active);

  useEffect(() => {
    setShow(active);
    if (active && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000); // Stop after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!show) return null;

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={true}
      numberOfPieces={200}
      gravity={0.2}
      colors={['#a855f7', '#ec4899', '#60a5fa', '#facc15']}
    />
  );
};
