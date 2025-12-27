// src/components/Cart.jsx
import React, { useState } from 'react';

function Cart({ cart, onClose, removeFromCart, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [isOrderMode, setIsOrderMode] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
      <div className="bg-white w-11/12 md:w-1/2 rounded-2xl p-6 shadow-2xl relative animate-bounce-in max-h-[90vh] overflow-y-auto">
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
        >
            &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">
            {isOrderMode ? "Delivery detail " : "Your Cart "}
        </h2>

        {isOrderMode ? (
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="Họ và tên" className="border p-3 rounded-lg w-full focus:outline-none focus:border-orange-500"/>
                <input type="text" placeholder="Số điện thoại" className="border p-3 rounded-lg w-full focus:outline-none focus:border-orange-500"/>
                <input type="text" placeholder="Địa chỉ giao hàng" className="border p-3 rounded-lg w-full focus:outline-none focus:border-orange-500"/>
                
                <div className="flex gap-4 mt-4">
                    <button 
                        onClick={() => setIsOrderMode(false)} // Quay lại giỏ hàng
                        className="w-1/2 bg-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-400 transition"
                    >
                        Back
                    </button>
                    <button 
                        onClick={onCheckout} // Gọi hàm đặt hàng từ App
                        className="w-1/2 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        ) : (
            <>
                <div className="max-h-96 overflow-y-auto mb-6">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">Empty Cart</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-b py-3">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-gray-500 text-sm">${item.price}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(index)}
                                    className="text-red-500 hover:text-red-700 font-bold text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-orange-500">${total}</span>
                </div>

                {cart.length > 0 && (
                    <button 
                        className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl mt-6 hover:bg-orange-600 transition"
                        onClick={() => setIsOrderMode(true)} // Chuyển sang chế độ điền Form
                    >
                        Payment Process
                    </button>
                )}
            </>
        )}
      </div>
    </div>
  );
}

export default Cart;