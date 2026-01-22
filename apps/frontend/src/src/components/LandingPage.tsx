

import { motion } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag, Plus } from "lucide-react";

const reels = [
  {
    id: 1,
    title: "Cheesy Loaded Burger",
    creator: "@burgerbros",
    price: "$6.99",
    likes: 1200,
    comments: 89,
    gradient: "from-orange-500 to-yellow-400",
  },
  {
    id: 2,
    title: "Spicy Ramen Bowl",
    creator: "@ramenhouse",
    price: "$8.50",
    likes: 980,
    comments: 64,
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    creator: "@sweetspot",
    price: "$4.25",
    likes: 2100,
    comments: 143,
    gradient: "from-purple-500 to-fuchsia-500",
  },
];

export default function FoodReelsLanding() {
  return (
    <div className="min-h-screen bg-[#0f0f12] text-white overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#0f0f12]/70 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold">FoodReels</h1>
          <button className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition">
            <Plus size={16} /> Upload Reel
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Scroll food.<br />Order instantly.
          </h2>
          <p className="text-white/70 max-w-lg mb-10 leading-relaxed">
            A modern food platform where creators post short food reels and viewers order what they see — instantly.
            Simple, visual, addictive.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="rounded-2xl px-6 py-4 text-black font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 hover:opacity-90 transition">
              Explore Reels
            </button>
            <button className="rounded-2xl px-6 py-4 border border-white/30 hover:bg-white/10 transition">
              Become a Creator
            </button>
          </div>
        </motion.div>

        {/* Reel Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="w-[300px] h-[580px] rounded-[36px] bg-black border border-white/10 shadow-2xl overflow-hidden relative">
            {reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                className={`absolute inset-0 bg-gradient-to-br ${reel.gradient} flex flex-col justify-between p-4`}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                style={{ zIndex: reels.length - index }}
              >
                <div className="text-xs bg-black/40 px-3 py-1 rounded-full w-fit">
                  {reel.creator}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{reel.title}</h3>
                    <p className="text-xs text-white/80">{reel.price}</p>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <button className="flex flex-col items-center text-xs opacity-90 hover:opacity-100">
                      <Heart size={18} /> {reel.likes}
                    </button>
                    <button className="flex flex-col items-center text-xs opacity-90 hover:opacity-100">
                      <MessageCircle size={18} /> {reel.comments}
                    </button>
                    <button className="bg-black/40 p-3 rounded-full hover:scale-110 transition">
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Watch Food Reels", "Post Your Dishes", "Order in One Tap"].map((title, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Designed for speed and cravings — discover food visually and act instantly.
            </p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} FoodReels — short videos. real food.
      </footer>
    </div>
  );
}