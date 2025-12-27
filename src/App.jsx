// src/App.jsx
import { useState } from 'react';
import Navbar from './components/navbar'; // Gọi Navbar vào
import Banner from './components/banner'; // Gọi Banner vào
import CategoryList from './components/categorylist'; // Gọi CategoryList vào
import DailySpecial from './components/dailyspecial'; // Gọi DailySpecial vào
import Product from './components/product'; // Gọi Product vào
import Footer from './components/footer'; // Gọi Footer vào
import Cart from './components/cart';
import AdminPanel from './components/adminpanel';

function App() {
  const [cart, setCart] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (food) => {
    setCart([...cart, food]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart)}

  const handleCheckout = () => {
    setCart([]); // Xóa sạch giỏ hàng về rỗng
    setIsCartOpen(false); // Đóng luôn cửa sổ giỏ hàng
    alert("Thank you for your order! Your food is being prepared.");
  }
  
  const [isAdminMode, setIsAdminMode] = useState(false);// Chế độ admin
  ;
  return (
    // Cái nền xám bao quanh toàn bộ trang web bat buoc phải có
    // chi chay duoc trong mot goi
    <div className="bg-gray-100 min-h-screen pb-20 relative">
      <button 
        onClick={() => setIsAdminMode(!isAdminMode)}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg text-sm"
      >{isAdminMode ? "Home Page" : "Admin Page"}
      </button>
      {isAdminMode ? <AdminPanel/> : (
    <div>
      <Navbar cart={cart} onOpencart={() => setIsCartOpen(true)}/> 
      <Banner/>
      <CategoryList/>
      <DailySpecial addToCart={handleAddToCart}/>
      <Product addToCart={handleAddToCart}/>
      {isCartOpen && <Cart 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} // Truyền hàm đóng
            removeFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout} // Truyền hàm đặt hàng
        />}
      <Footer/>
    </div>
  )}
    </div>
  )
}

export default App