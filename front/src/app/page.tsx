import React from 'react';
import SalesList from './pages/sales/page';
import { CartProvider } from './pages/cart/CartContext';

const Home: React.FC = () => {
  return (
    <CartProvider>
      <div className="flex items-center justify-center mt-40">
        <SalesList />
      </div>
    </CartProvider>
  );
};

export default Home;
