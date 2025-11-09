const BACKEND = 'https://e-commerce-website-zxn0.onrender.com';
const ORDERS_BASE = `${BACKEND}/api/orders`;

export async function createOrder(orderData, token) {
  const res = await fetch(ORDERS_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Order creation failed');
  }
  return res.json();
}
