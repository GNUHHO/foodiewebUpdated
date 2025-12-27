import { useEffect, useState } from 'react';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]); // Kho chứa TẤT CẢ món ăn
  const [selectedCategory, setSelectedCategory] = useState("All"); // 1. Biến nhớ loại đang chọn
  const [searchTerm, setSearchTerm] = useState(""); // Biến nhớ từ khóa tìm kiếm (nếu có)

  // Danh sách các nút bộ lọc (Em có thể thêm bớt tùy ý)
  const categories = ["All", "Asian", "Burger", "Pizza", "Salad"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };
    fetchProducts();
  }, []);

  // 2. LOGIC LỌC (Quan trọng nhất)
  // Nếu chọn "All" thì lấy hết, ngược lại thì chỉ lấy món có category trùng khớp
    const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2>

        <div className="flex justify-center mb-8">
            <input 
                type="text" 
                placeholder="Search food..." 
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:border-orange-500"
                
                // Khi gõ phím, cập nhật ngay vào biến nhớ searchTerm
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
        {/* 3. Giao diện các nút bấm bộ lọc */}
        <div className="flex justify-center gap-4 mb-8">
            {categories.map(category => (
                <button 
                    key={category}
                    onClick={() => setSelectedCategory(category)} // Bấm vào thì cập nhật biến nhớ
                    className={`px-4 py-2 rounded-full font-bold transition ${
                        selectedCategory === category 
                        ? "bg-orange-500 text-white" // Nút đang chọn thì màu cam
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Nút thường thì màu xám
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
        
        {/* 4. Hiển thị danh sách ĐÃ LỌC (filteredProducts) thay vì danh sách gốc */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredProducts.map((food) => (
                <div key={food.id} className="bg-white p-4 rounded-2xl shadow-xl flex flex-col gap-4 hover:shadow-2xl transition duration-300">
                    <img 
                        src={food.image} 
                        alt={food.name} 
                        className="w-full h-40 object-cover rounded-xl"
                        onError={(e) => {e.target.src = 'https://via.placeholder.com/300'}}
                    />
                    <div>
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-lg">{food.name}</h2>
                            <span className="text-orange-500 font-bold">${food.price}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{food.category}</p>
                        <button onClick={() => addToCart(food)} className="bg-orange-500 text-white font-bold py-2 rounded-xl w-full mt-4 hover:bg-orange-600 transition">
                            Add to cart
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Thông báo nếu không tìm thấy món nào */}
        {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-10">Không tìm thấy món ăn nào thuộc loại này!</p>
        )}
    </div>
  );
}

export default ProductList;