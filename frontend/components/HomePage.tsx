AbortController
import React from 'react';
import type { Page } from '../App';
import { Product } from '../constants';
import { HeadphonesIcon, EarbudsIcon, SpeakerIcon, AccessoriesIcon } from './Icons';
import { useToast } from './ToastContainer';
import EmojiSpawner from './EmojiSpawner';

interface HomePageProps {
  navigateTo: (page: Page, productId?: string) => void;
  products: Product[];
}

const CategoryCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}> = ({ icon, title, onClick, style }) => (
  <button
    onClick={onClick}
    style={style}
    className="relative bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-700/70 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group overflow-hidden"
  >
    <EmojiSpawner />
    <div className="text-cyan-400 mb-3 transition-transform duration-300 group-hover:scale-125 z-10 pointer-events-none">{icon}</div>
    <h3 className="font-bold text-white z-10 pointer-events-none">{title}</h3>
  </button>
);

const ProductCard: React.FC<{
  product: Product;
  onSelectProduct: (id: string) => void;
  style?: React.CSSProperties;
}> = ({ product, onSelectProduct, style }) => (
    <div 
        style={style}
        className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 flex flex-col text-center hover:bg-slate-700/70 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
        onClick={() => onSelectProduct(product.id)}
    >
        <div className="flex-grow flex items-center justify-center mb-4 min-h-[160px]">
            <img src={product.thumbnail} alt={product.name} className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="font-bold text-white text-md flex-grow">{product.name}</h3>
        <p className="text-slate-400 text-sm">{product.brand}</p>
        <p className="text-cyan-400 font-semibold text-xl mt-2">₹{product.price.toLocaleString()}</p>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ navigateTo, products }) => {
  const { addToast } = useToast();

  const speakerIconWithAnimation = (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <SpeakerIcon className="w-12 h-12" />
      {/* These divs are for the animation and will be controlled by the parent group's hover state */}
      <div className="sound-wave-1 absolute top-0 left-0 w-full h-full rounded-full bg-cyan-400/50"></div>
      <div className="sound-wave-2 absolute top-0 left-0 w-full h-full rounded-full bg-fuchsia-400/50"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="stagger-in text-center p-8 bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ animationDelay: '0.1s' }}>
          Experience Sound Redefined.
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
          Immerse yourself in high-fidelity audio with the new AcousticX lineup.
          Explore our collection in stunning 3D.
        </p>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 stagger-in" style={{ animationDelay: '0.3s' }}>Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-in">
          <CategoryCard
            icon={<HeadphonesIcon className="w-12 h-12" />}
            title="Headphones"
            onClick={() => navigateTo('product', 'P001')}
            style={{ animationDelay: '0.4s' }}
          />
          <CategoryCard
            icon={<EarbudsIcon className="w-12 h-12" />}
            title="Earbuds"
             onClick={() => navigateTo('product', 'P003')}
            style={{ animationDelay: '0.5s' }}
          />
          <CategoryCard
            icon={speakerIconWithAnimation}
            title="Speakers"
            onClick={() => navigateTo('product', 'P002')}
            style={{ animationDelay: '0.6s' }}
          />
          <CategoryCard
            icon={<AccessoriesIcon className="w-12 h-12" />}
            title="Accessories"
            onClick={() => addToast('Accessories coming soon!', { emoji: '🔌' })}
            style={{ animationDelay: '0.7s' }}
          />
        </div>
      </div>

      {/* Featured Products Section */}
       <div>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 stagger-in" style={{ animationDelay: '0.8s' }}>
          Our Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-in">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelectProduct={(id) => navigateTo('product', id)}
              style={{ animationDelay: `${0.9 + index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;