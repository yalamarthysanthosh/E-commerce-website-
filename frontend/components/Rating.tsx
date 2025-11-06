
import React from 'react';
import { StarIcon } from './Icons';

interface RatingProps {
  rating: number;
  maxRating?: number;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const filledStars = Math.round(rating);
  
  return (
    <div className="flex items-center space-x-1 bg-cyan-500 text-white font-bold text-sm px-2 py-1 rounded-md">
      <span>{rating.toFixed(1)}</span>
      <StarIcon className="w-4 h-4 text-white" />
    </div>
  );
};

export default Rating;
