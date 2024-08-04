import { useState } from 'react';

export const useSlideIndex = (maxLength: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxLength - 1));
  };

  return { currentIndex, handlePrev, handleNext };
};
