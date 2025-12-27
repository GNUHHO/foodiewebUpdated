//src/components/categorylist.jsx

function CategoryList() {
    return (
        <div className="container mx-auto px-4 mb-8">
        
        <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-gray-800">Top Categories</h2>
            <a href="#" className="text-orange-500 text-sm font-bold hover:underline">View All</a>
        </div>

        <div class="flex gap-4 overflow-x-auto pb-4">

            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:shadow-md hover:border-orange-500 transition min-w-max">
                <i className="fa-solid fa-burger"></i>
                <span className="font-bold">Burgers</span>
            </button>

            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:shadow-md hover:border-orange-500 transition min-w-max">
                <i className="fa-solid fa-pizza-slice"></i>
                <span className="font-medium">Pizza</span>
            </button>

            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:shadow-md hover:border-orange-500 transition min-w-max">
                <i className="fa-solid fa-fish"></i>
                <span className="font-medium">Sushi</span>
            </button>

            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:shadow-md hover:border-orange-500 transition min-w-max">
                <i className="fa-solid fa-ice-cream"></i>
                <span className="font-medium">Desserts</span>
            </button>

            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:shadow-md hover:border-orange-500 transition min-w-max">
                <i className="fa-solid fa-bowl-rice"></i>
                <span className="font-medium">Asian</span>
            </button>

             <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-full shadow-sm hover:shadow-md hover:border-orange-500 transition min-w-max">
                <i className="fa-solid fa-carrot"></i>
                <span className="font-medium">Vegan</span>
            </button>

        </div>
    </div>
    );
}
export default CategoryList;
