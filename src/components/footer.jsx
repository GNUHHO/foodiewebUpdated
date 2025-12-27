//src/components/footer.jsx

function Footer() {
    return (
        <footer className="bg-gray-50 pt-16 pb-8 border-t mt-20">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="fa-solid fa-burger text-orange-500 text-xl"></i>
                            <span className="text-xl font-bold">FoodieExpress</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Bringing the best local flavors directly to your doorstep. Fresh, fast, and delicious.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-orange-500">About Us</a></li>
                            <li><a href="#" className="hover:text-orange-500">Careers</a></li>
                            <li><a href="#" className="hover:text-orange-500">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
                            <li><a href="#" className="hover:text-orange-500">Safety</a></li>
                            <li><a href="#" className="hover:text-orange-500">Terms</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-orange-500 hover:text-white transition">
                                <i className="fa-brands fa-facebook-f"></i>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-orange-500 hover:text-white transition">
                                <i className="fa-brands fa-twitter"></i>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-orange-500 hover:text-white transition">
                                <i className="fa-brands fa-instagram"></i>
                            </button>
                        </div>
                    </div>

                </div>

                <div className="border-t pt-8 text-center">
                    <p className="text-xs text-gray-400">&copy; 2025 FoodieExpress. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;