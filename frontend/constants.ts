
export interface Product {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  offers: string[];
  highlights: string[];
  description: string;
  colors: string[];
  sizes: string[];
  thumbnail: string;
  images: string[];
}

// Generates an array of image URLs for the 360 viewer.
// Images from: https://img-seq.netlify.app/
const generateImageUrls = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const frame = String(i + 1).padStart(4, '0');
    return `https://www.apple.com/105/media/us/airpods-max/2020/996b980b-3134-43f3-ad73-fe80f27ba0d9/anim/turn/large/large_${frame}.jpg`;
  });
};

const headphoneImages: string[] = generateImageUrls(70); // 70 frames for a smoother rotation

export const products: Product[] = [
  {
    id: 'P001',
    name: 'Studio Pro Wireless Over-Ear Headphones',
    brand: 'AcousticX',
    rating: 4.6,
    reviews: 18450,
    price: 22999,
    originalPrice: 34900,
    discount: 34,
    offers: [
      '10% off on ICICI Bank Credit Cards, up to ₹1500',
      '5% Cashback on Flipkart Axis Bank Card',
      'Buy for 100 get ₹50 off your next order',
      'No Cost EMI starting from ₹3,834/month',
    ],
    highlights: [
      'Active Noise Cancellation (ANC)',
      'Up to 40 hours of battery life',
      'Personalized Spatial Audio with Dynamic Head Tracking',
      'High-Fidelity Audio with custom acoustic platform',
      'Compatible with Apple & Android',
    ],
    description: 'AcousticX Studio Pro brings immersive sound right to your ears. Its custom acoustic platform delivers powerful, balanced sound. When you want to silence distractions, Active Noise Cancellation blocks external noise for immersive sound. With up to 40 hours of listening time, you can keep the music going. And if you need a little extra juice, 5-minute Fast Fuel charging gives 4 hours of playback.',
    colors: ['Space Gray', 'Silver', 'Sky Blue', 'Green', 'Pink'],
    sizes: ['One Size'],
    thumbnail: headphoneImages[0],
    images: headphoneImages,
  },
  {
    id: 'P002',
    name: 'SoundSphere 360 Portable Speaker',
    brand: 'AcousticX',
    rating: 4.8,
    reviews: 9820,
    price: 12999,
    originalPrice: 18900,
    discount: 31,
    offers: [
        '10% off on HDFC Bank Credit Cards',
        '5% Cashback on Flipkart Axis Bank Card',
        'No Cost EMI available',
    ],
    highlights: [
        '360-degree immersive sound',
        'IP67 waterproof and dustproof',
        'Up to 15 hours of battery life',
        'PartyBoost compatible',
        'Built-in microphone for calls',
    ],
    description: 'Take the party anywhere with the SoundSphere 360. This portable Bluetooth speaker delivers shockingly powerful 360-degree sound. It\'s waterproof, dustproof, and ready for any adventure.',
    colors: ['Midnight Black', 'Ocean Blue', 'Sunset Red'],
    sizes: ['One Size'],
    thumbnail: 'https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-master-catalog/default/dw1e8b9580/JBL_Flip6_Lifestyle_1.png?sw=537&sfrm=png',
    images: headphoneImages, // Note: Reusing 3D model for demo purposes
  },
  {
    id: 'P003',
    name: 'Aura Buds Pro',
    brand: 'AcousticX',
    rating: 4.5,
    reviews: 12550,
    price: 8999,
    originalPrice: 12900,
    discount: 30,
    offers: [
        'Get a free case with your purchase',
        '5% Cashback on Flipkart Axis Bank Card',
        'No Cost EMI available',
    ],
    highlights: [
        'Intelligent Active Noise Cancellation',
        'Crystal clear calls with 3-mic system',
        'Up to 28 hours of battery with case',
        'IPX7 Water Resistance',
        'Comfortable ergonomic design',
    ],
    description: 'Immerse yourself in your world with Aura Buds Pro. Featuring Intelligent ANC and a comfortable fit, they offer a premium listening experience. The 3-mic system ensures your calls are always crystal clear.',
    colors: ['Graphite', 'White', 'Violet'],
    sizes: ['One Size'],
    thumbnail: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-r510nlvainu/gallery/in-galaxy-buds2-pro-r510-sm-r510nlvainu-533190435?$650_519_PNG$',
    images: headphoneImages, // Note: Reusing 3D model for demo purposes
  }
];
