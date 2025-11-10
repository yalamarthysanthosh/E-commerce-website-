import type { CartItem } from '../App';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://e-commerce-website-zxn0.onrender.com';

interface AddToCartData {
  productId: string;
  color: string;
  quantity: number;
}

export const addToCart = async (
  item: AddToCartData,
  token: string,
): Promise<CartItem[]> => {
  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error('Failed to add item to cart');
  return response.json();
};