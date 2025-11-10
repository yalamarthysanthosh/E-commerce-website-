
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductViewer from './components/ProductViewer';
import ProductDetails from './components/ProductDetails';
import { products as allProducts, Product } from './constants';
import { BoltIcon, CartIcon } from './components/Icons';
import CursorFollower from './components/CursorFollower';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import BackgroundAnimation from './components/BackgroundAnimation';
import HomePage from './components/HomePage';
import LoadingScreen from './components/LoadingScreen';
import { addToCart as addToCartAPI } from './api/cart';
// FIX: Update import path for toast components to resolve file casing conflict.
import { ToastProvider, useToast } from './components/ToastContainer';


export type Page = 'home' | 'product' | 'cart' | 'login';

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const { addToast } = useToast();

  const selectedProduct = allProducts.find(p => p.id === selectedProductId);

  useEffect(() => {
    // When the selected product changes, reset the color to its first available color.
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  const navigateTo = (page: Page, productId?: string) => {
    if (page === 'product' && productId) {
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
  };

  const handleAddToCart = async (productToAdd: Product, color: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add items to your cart.');
      navigateTo('login');
      return;
    }
    try {
      const updatedCart = await addToCartAPI(
        {
          productId: productToAdd.id,
          color: color,
          quantity: 1, // Assuming we add one at a time
        },
        token,
      );
      setCart(updatedCart);
      addToast('Added to cart!', { type: 'success', emoji: '🛒' });
      navigateTo('cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      addToast('Failed to add item to cart.', { type: 'error' });
    }
  };

  const handleCartUpdate = (productId: string, color: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        // Remove item from cart
        return prevCart.filter(item => !(item.product.id === productId && item.color === color));
      } else {
        // Update quantity of existing item
        return prevCart.map(item =>
          (item.product.id === productId && item.color === color)
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'cart':
        return <CartPage navigateTo={navigateTo} cart={cart} onCartUpdate={handleCartUpdate} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} />;
      case 'product':
        if (!selectedProduct) {
          // If no product is selected, go back to the home page.
          return <HomePage navigateTo={navigateTo} products={allProducts} />;
        }
        return (
           <>
            <div className="bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Product Viewer Column */}
                <div className="lg:col-span-5 p-4 flex justify-center items-center">
                  <ProductViewer 
                    images={selectedProduct.images} 
                    selectedColor={selectedColor} 
                    onLoadingComplete={() => setIsAppLoading(false)}
                  />
                </div>

                {/* Product Details Column */}
                <div className="lg:col-span-7 p-4 border-t lg:border-t-0 lg:border-l border-cyan-500/10">
                  <ProductDetails 
                    product={selectedProduct} 
                    navigateTo={navigateTo} 
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                    onAddToCart={() => handleAddToCart(selectedProduct, selectedColor)}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 mt-4 p-4">
              <h2 className="text-xl font-medium text-cyan-400 mb-4">Product Description</h2>
              <p className="text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>
          </>
        );
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} products={allProducts} />;
    }
  };

  // Simplified loading logic for initial app start
  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <LoadingScreen />;
  }


  return (
    <>
      {currentPage !== 'login' && (
        <div className="bg-slate-900 min-h-screen font-sans text-slate-200">
          <CursorFollower />
          <BackgroundAnimation />
          <Header navigateTo={navigateTo} />
          <main className="container mx-auto p-2 md:p-4 relative z-0">
            {renderPage()}
          </main>
        </div>
      )}
      {currentPage === 'login' && (
        <LoginPage navigateTo={navigateTo} />
      )}
    </>
  );
};


const App: React.FC = () => (
  <ToastProvider>
    <AppContent />
  </ToastProvider>
)

export default App;