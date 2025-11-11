
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateIcon } from './Icons';

interface ProductViewerProps {
  images: string[];
  selectedColor: string;
  onLoadingComplete: () => void;
}

const colorMap: { [key: string]: string } = {
  'Space Gray': 'from-gray-700 to-gray-900',
  'Silver': 'from-slate-300 to-slate-500',
  'Sky Blue': 'from-sky-400 to-sky-600',
  'Green': 'from-green-400 to-green-600',
  'Pink': 'from-pink-400 to-pink-600',
  'Midnight Black': 'from-black to-gray-800',
  'Ocean Blue': 'from-blue-700 to-indigo-900',
  'Sunset Red': 'from-red-500 to-rose-800',
  'Graphite': 'from-gray-600 to-gray-800',
  'White': 'from-white to-slate-200',
  'Violet': 'from-violet-500 to-purple-700'
};

const ProductViewer: React.FC<ProductViewerProps> = ({ images, selectedColor, onLoadingComplete }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const startX = useRef(0);
  const startFrame = useRef(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    setIsLoading(true);
    let loadedCount = 0;
    preloadedImages.current = [];
    if (images.length === 0) {
      setIsLoading(false);
      onLoadingComplete();
      return;
    }
    
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoading(false);
          onLoadingComplete();
        }
      };
      preloadedImages.current.push(img);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    startFrame.current = currentFrame;
  }, [currentFrame]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !viewerRef.current) return;

    const sensitivity = 4;
    const dx = clientX - startX.current;
    const frameChange = Math.round(dx / sensitivity);
    
    let newFrame = startFrame.current + frameChange;
    
    // Use modulo to wrap around
    newFrame = (newFrame % images.length + images.length) % images.length;
    
    setCurrentFrame(newFrame);
  }, [isDragging, images.length]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => handleDragEnd();

  // Touch events
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();
  
  const bgColor = colorMap[selectedColor] || 'from-gray-700 to-gray-900';

  return (
    <div 
      ref={viewerRef}
      className={`relative w-full max-w-md aspect-square select-none cursor-grab active:cursor-grabbing rounded-lg overflow-hidden bg-gradient-to-br ${bgColor} transition-all duration-500 ease-in-out`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent rounded-md">
           <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400" role="status"></div>
           <p className="mt-4 text-slate-200">Loading 3D View...</p>
        </div>
      ) : (
        <>
          <img
            src={images[currentFrame]}
            alt={`Product view frame ${currentFrame + 1}`}
            className="w-full h-full object-contain pointer-events-none"
            draggable="false"
          />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-2 backdrop-blur-sm">
            <RotateIcon className="w-4 h-4 animate-slow-rotate" />
            <span>Drag to rotate</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductViewer;
