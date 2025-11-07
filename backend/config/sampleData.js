// This file is for seeding data. You can create a separate script to run this.
// For example, a seed.js in the root of /backend

const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly. High-quality AAC audio offers immersive listening experience. Built-in microphone allows you to take calls while working.',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 13 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  // Add more products as needed
];

export default products;