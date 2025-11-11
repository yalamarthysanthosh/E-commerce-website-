
import React from 'react';
import type { Page, CartItem } from '../App';
import { ChevronLeftIcon, TrashIcon } from './Icons';
import { useToast } from './ToastContainer';
import { placeOrder } from '../api/orderApi';

interface CartPageProps {
  navigateTo: (page: Page, productId?: string) => void;
  cart: CartItem[];
  onCartUpdate: (productId: string, color: string, newQuantity: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ navigateTo, cart, onCartUpdate }) => {
  const { addToast } = useToast();
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);

  const shippingCost = cart.length > 0 ? 99 : 0;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    setIsPlacingOrder(true);
    try {
      const orderItems = cart.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        color: item.color,
      }));

      await placeOrder({ items: orderItems, totalAmount: total });

      addToast("Order placed! Your gear is on its way.", { type: 'success', emoji: '🚀' });
      // Clear the cart by setting all quantities to 0
      cart.forEach(item => onCartUpdate(item.product.id, item.color, 0));
    } catch (error) {
      addToast("Failed to place order. Please try again.", { type: 'error' });
      console.error("Checkout error:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };
  
  const handleRemoveItem = (productId: string, color: string) => {
    onCartUpdate(productId, color, 0);
    addToast("Item removed from cart.", { emoji: '🗑️' });
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg border border-cyan-500/20 p-4 md:p-8">
      <div className="flex items-center mb-6">
         <button onClick={() => navigateTo('home')} className="text-cyan-400 hover:text-cyan-300 transition-colors group">
            <ChevronLeftIcon className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
         </button>
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 ml-4">Your Cart</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">Your cart is empty.</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={`${item.product.id}-${item.color}`} className="flex flex-col sm:flex-row items-center bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <img src={item.product.thumbnail} alt={item.product.name} className="w-24 h-24 object-contain rounded-md bg-slate-700 mb-4 sm:mb-0 sm:mr-4 flex-shrink-0"/>
                    <div className="flex-grow text-center sm:text-left">
                        <h2 className="font-bold text-white">{item.product.name}</h2>
                        <p className="text-sm text-slate-400">{item.product.brand}</p>
                        <p className="text-sm text-slate-300 mt-1">Color: {item.color}</p>
                        <p className="text-lg font-semibold text-cyan-400 mt-1">₹{item.product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                         <div className="flex items-center border border-slate-600 rounded-md">
                            <button onClick={() => onCartUpdate(item.product.id, item.color, item.quantity - 1)} className="px-3 py-1 text-lg text-slate-300 hover:bg-slate-700 rounded-l-md">-</button>
                            <span className="px-4 py-1 text-white font-bold w-12 text-center">{item.quantity}</span>
                            <button onClick={() => onCartUpdate(item.product.id, item.color, item.quantity + 1)} className="px-3 py-1 text-lg text-slate-300 hover:bg-slate-700 rounded-r-md">+</button>
                        </div>
                        <button onClick={() => handleRemoveItem(item.product.id, item.color)} className="text-slate-400 hover:text-red-500 transition-colors p-2 group">
                            <TrashIcon className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                        </button>
                    </div>
                </div>
              ))
            )}

             <button 
                onClick={() => navigateTo('home')} 
                className="text-cyan-400 font-semibold hover:underline mt-6 inline-flex items-center group"
            >
                <ChevronLeftIcon className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"/>
                Continue Shopping
            </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-3 text-slate-300">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>₹{shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-600 my-3"></div>
                    <div className="flex justify-between text-white font-bold text-lg">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || isPlacingOrder}
                  className="w-full mt-6 py-3 text-lg font-bold bg-fuchsia-600 text-white rounded-md shadow-md hover:bg-fuchsia-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                    {isPlacingOrder ? 'Placing Order...' : 'Proceed to Checkout'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;