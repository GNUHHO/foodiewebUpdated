// src/components/banner.jsx
import bannerIMG from '../assets/bannerIMG.jpg';

function Banner() {
  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl mx-4 md:mx-0">
        <img src={bannerIMG} className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/50">
            <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
        
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase">
                    Free Delivery
                </span>

                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                    Craving something <br/> 
                    <span className="text-orange-500">Delicious?</span>
                </h1>

                <p className="text-gray-200 text-lg max-w-lg mb-8">
                    Order now and enjoy the best meals in town delivered hot & fresh to your doorstep.
                </p>

                <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold w-fit hover:bg-orange-600 transition">
                    Order Now
                </button>

            </div>
        </div>
    </div>
  );
}
export default Banner;