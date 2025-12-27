import { useEffect, useState } from 'react';

// 1. Nhận props addToCart để bấm mua được
function DailySpecial({ addToCart }) {
    const [specials, setSpecials] = useState([]);

    // 2. Gọi API lấy danh sách món giảm giá từ database.json
    useEffect(() => {
        const fetchSpecials = async () => {
            try {
                const response = await fetch('http://localhost:3001/dailySpecials');
                const data = await response.json();
                setSpecials(data);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
            }
        };
        fetchSpecials();
    }, []);

    // Hàm tính % giảm giá (cho nó xịn)
    const calculateDiscount = (price, oldPrice) => {
        if (!oldPrice) return 0;
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    };

    return (
        <div className="container mx-auto px-4 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                <div className="lg:col-span-1 pr-4">
                    <span className="text-orange-500 font-bold text-sm uppercase tracking-wider mb-2 block">Daily Special</span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Lunch Combo Deals</h2>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                        Grab these amazing lunch combos starting at just <span className="text-gray-900 font-bold">$10</span>. 
                        Perfect for a midday refuel with your colleagues or friends.
                    </p>
                    <button className="bg-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-200 w-full md:w-auto">
                        View All Deals
                    </button>
                </div>

                <div className="lg:col-span-2">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        

                        {specials.map((item) => (
                            <div key={item.id} className="bg-white p-3 rounded-2xl shadow-md hover:shadow-xl transition group flex flex-col justify-between h-full">
                                
                                <div className="relative mb-3">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-32 object-cover rounded-xl group-hover:scale-105 transition duration-300"
                                        onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                                    />

                                    {item.oldPrice && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                            -{calculateDiscount(item.price, item.oldPrice)}%
                                        </span>
                                    )}
                                </div>


                                <div>
                                    <h3 className="font-bold text-gray-800 text-sm truncate">{item.name}</h3>
                                    <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                                </div>
                                

                                <div className="flex justify-between items-end mt-2">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs line-through">${item.oldPrice}</span>
                                        <span className="text-orange-500 font-bold text-sm">${item.price}</span>
                                    </div>
                                    
                                    <button 
                                        onClick={() => addToCart(item)}
                                        className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
}

export default DailySpecial;