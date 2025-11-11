
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductViewer from './components/ProductViewer';
import ProductDetails from './components/ProductDetails';
import { products as allProducts, Product } from './constants';
import { BoltIcon, CartIcon } from './components/Icons';
import CursorFollower from './components/CursorFollower';
import CartPage from './components/CartPage'; 
import BackgroundAnimation from './components/BackgroundAnimation';
import HomePage from './components/HomePage';
import LoadingScreen from './components/LoadingScreen';
// FIX: Update import path for toast components to resolve file casing conflict.
import { ToastProvider, useToast } from './components/ToastContainer';
import BongoCatLoginPage from './components/BongoCatLoginPage';
import BongoCatRegisterPage from './components/BongoCatRegisterPage';


export type Page = 'home' | 'product' | 'cart' | 'login' | 'register';

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
  const [isInitialAppLoad, setIsInitialAppLoad] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { addToast } = useToast();

  const selectedProduct = allProducts.find(p => p.id === selectedProductId);

  useEffect(() => {
    // Check login status on initial load
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colors[0]);
    }
  }, [selectedProduct]);

  const navigateTo = (page: Page, productId?: string) => {
    if (page === 'product' && productId) {
      setIsProductLoading(true);
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
  };

  const handleAddToCart = (productToAdd: Product, color: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === productToAdd.id && item.color === color
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product: productToAdd, quantity: 1, color }];
      }
    });
    addToast('Added to cart!', { type: 'success', emoji: '🛒' });
    navigateTo('cart');
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
        return <BongoCatLoginPage navigateTo={navigateTo} onLoginSuccess={() => setIsLoggedIn(true)} />;
      case 'register':
        return <BongoCatRegisterPage navigateTo={navigateTo} />;
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
                    onLoadingComplete={() => setIsProductLoading(false)}
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
    const timer = setTimeout(() => setIsInitialAppLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialAppLoad) {
    return <LoadingScreen text="Loading Experience..." />;
  }


  return (
    <>
      {currentPage === 'login' || currentPage === 'register' ? (
        <>
          {currentPage === 'login' && <BongoCatLoginPage navigateTo={navigateTo} onLoginSuccess={() => setIsLoggedIn(true)} />}
          {currentPage === 'register' && <BongoCatRegisterPage navigateTo={navigateTo} />}
        </>
      ) : (
        <div className="bg-slate-900 min-h-screen font-sans text-slate-200">
          <CursorFollower />
          <BackgroundAnimation />
          <Header navigateTo={navigateTo} isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
          <main className="container mx-auto p-2 md:p-4 relative z-0 transition-opacity duration-300" style={{ opacity: isProductLoading ? 0.5 : 1 }}>
            {renderPage()}
          </main>
        </div>
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