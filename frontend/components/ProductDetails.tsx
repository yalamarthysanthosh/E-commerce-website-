
import React from 'react';
import type { Product } from '../constants';
import Rating from './Rating';
import { TagIcon, CheckCircleIcon, BoltIcon, CartIcon } from './Icons';
import type { Page } from '../App';
import EmojiSpawner from './EmojiSpawner';

interface ProductDetailsProps {
  product: Product;
  navigateTo: (page: Page) => void;
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, navigateTo, selectedColor, onColorSelect, onAddToCart }) => {

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl md:text-2xl font-medium text-white">{product.name}</h1>
      <div className="flex items-center space-x-4">
        <Rating rating={product.rating} />
        <span className="text-slate-400 font-semibold">{product.reviews.toLocaleString()} Ratings & Reviews</span>
      </div>
      
      <div>
        <span className="text-3xl font-bold text-cyan-400">₹{product.price.toLocaleString()}</span>
        <span className="text-slate-400 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
        <span className="text-green-400 font-bold ml-2">{product.discount}% off</span>
      </div>
      
      <div className="text-sm font-bold text-slate-300">Available offers</div>
      <div className="space-y-2">
        {product.offers.map((offer, index) => (
          <div key={index} className="flex items-start text-sm">
            <TagIcon className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-slate-300">{offer}</span>
          </div>
        ))}
      </div>

      {/* Color Selector */}
      <div>
        <span className="font-bold text-slate-300">Color:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.colors.map(color => (
            <button 
              key={color}
              onClick={() => onColorSelect(color)}
              className={`px-4 py-2 text-sm rounded-sm border transition-all transform active:scale-95 ${selectedColor === color ? 'border-cyan-500 text-cyan-400 bg-cyan-900/50' : 'border-slate-600 text-slate-300 hover:border-cyan-500'}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      
      {/* Highlights */}
      <div>
        <span className="font-bold text-slate-300">Highlights:</span>
        <ul className="list-none space-y-2 mt-2">
            {product.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-sm text-slate-300">
                    <CheckCircleIcon className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                    <span>{highlight}</span>
                </li>
            ))}
        </ul>
      </div>

      {/* Action Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-4 pt-4">
        <button 
          className="relative flex-1 flex items-center justify-center py-4 px-8 text-lg font-bold bg-cyan-600 text-white rounded-sm shadow-md hover:bg-cyan-700 transition-colors transform active:scale-95 animate-button-pulse group overflow-hidden"
          onClick={onAddToCart}
        >
          <EmojiSpawner />
          <div className="relative z-10 flex items-center justify-center pointer-events-none">
            <CartIcon className="w-6 h-6 mr-2 transition-transform group-hover:-translate-x-1" />
            ADD TO CART
          </div>
        </button>
        <button 
          className="relative flex-1 flex items-center justify-center py-4 px-8 text-lg font-bold bg-fuchsia-600 text-white rounded-sm shadow-md hover:bg-fuchsia-700 transition-colors transform active:scale-95 group overflow-hidden"
          onClick={onAddToCart}
        >
          <EmojiSpawner />
          <div className="relative z-10 flex items-center justify-center pointer-events-none">
            <BoltIcon className="w-6 h-6 mr-2 transition-transform group-hover:rotate-12" />
            BUY NOW
          </div>
        </button>
      </div>

    </div>
  );
};

export default ProductDetails;
