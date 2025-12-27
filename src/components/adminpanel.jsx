import { useState, useEffect } from 'react';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  
  const [newProduct, setNewProduct] = useState({
    name: "", price: "", category: "Pizza", image: ""
  });
  
  const [imageInputType, setImageInputType] = useState('select');

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/products').then(res => res.json()).then(data => setProducts(data));
    fetch('http://localhost:3001/gallery').then(res => res.json()).then(data => {
         setGallery(data);
         if(data.length > 0 && !newProduct.image) setNewProduct(prev => ({...prev, image: data[0].url}));
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xóa thật không?")) {
      await fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
      
      if (editingId === id) resetForm();
    }
  };

  const handleEditClick = (food) => {
    setEditingId(food.id);
    setNewProduct(food); 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setNewProduct({ name: "", price: "", category: "Pizza", image: gallery[0]?.url || "" });
  };

  const handleSave = async () => {
    if (!newProduct.name || !newProduct.price) return alert("Nhập thiếu thông tin!");

    if (editingId) {
      try {
        const response = await fetch(`http://localhost:3001/products/${editingId}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        const updatedFood = await response.json();
        
        setProducts(products.map(p => p.id === editingId ? updatedFood : p));
        alert("Updated product successfully!");
        resetForm();
      } catch (error) { console.error(error); }

    } else {
      try {
        const response = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newProduct, id: Date.now().toString() }),
        });
        const data = await response.json();
        setProducts([...products, data]);
        alert("Added new product successfully!");
        resetForm();
      } catch (error) { console.error(error); }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-red-600">Admin Panel</h2>
      
      <div className={`p-6 rounded-xl mb-8 shadow-md border ${editingId ? "bg-yellow-50 border-yellow-300" : "bg-white border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 flex justify-between items-center">
            {editingId ? `Editing #${editingId} ` : "Add New Product"}
            
            {editingId && (
                <button onClick={resetForm} className="text-sm text-red-500 underline">Cancel</button>
            )}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Tên món..." className="border p-3 rounded" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            <div className="flex gap-4">
                <input type="number" placeholder="Giá..." className="border p-3 rounded w-1/2" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} />
                <select className="border p-3 rounded w-1/2" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  <option value="Pizza">Pizza</option><option value="Burger">Burger</option><option value="Asian">Asian</option><option value="Salad">Salad</option>
                </select>
            </div>
            
            <button 
                onClick={handleSave} 
                className={`text-white font-bold py-3 rounded shadow-lg transition ${editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"}`}
            >
              {editingId ? " Save" : "+ Add Product"}
            </button>
          </div>

          <div className="border rounded-xl p-4 bg-white">
            <div className="flex gap-2 mb-4">
                <button onClick={() => setImageInputType('select')} className={`flex-1 py-1 rounded text-sm font-bold ${imageInputType === 'select' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>gallery</button>
                <button onClick={() => setImageInputType('url')} className={`flex-1 py-1 rounded text-sm font-bold ${imageInputType === 'url' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>img link</button>
            </div>
            {imageInputType === 'select' ? (
                <div className="grid grid-cols-4 gap-2 h-40 overflow-y-auto pr-2">
                    {gallery.map((img) => (
                        <img key={img.id} src={img.url} onClick={() => setNewProduct({...newProduct, image: img.url})} className={`w-full h-16 object-cover rounded cursor-pointer border-2 ${newProduct.image === img.url ? "border-orange-500" : "border-transparent"}`} />
                    ))}
                </div>
            ) : (
               <input type="text" placeholder="img link" className="border p-2 rounded w-full" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
            )}
            <img src={newProduct.image} className="w-full h-32 object-contain mt-2 bg-gray-50 border border-dashed" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b"><tr><th className="p-4">Img</th><th className="p-4">Name</th><th className="p-4">Price</th><th className="p-4">Option</th></tr></thead>
          <tbody>
            {products.map((food) => (
              <tr key={food.id} className={`border-b ${editingId === food.id ? "bg-yellow-50" : ""}`}>
                <td className="p-4"><img src={food.image} className="w-12 h-12 rounded object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/50'}/></td>
                <td className="p-4 font-bold">{food.name}</td>
                <td className="p-4 text-orange-500">${food.price}</td>
                <td className="p-4 flex gap-2">
                  <button 
                    onClick={() => handleEditClick(food)} 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(food.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AdminPanel;