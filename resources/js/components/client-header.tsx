import { ShoppingCart, User, Heart } from 'lucide-react';

export default function ClientHeader() {
  return (
    <header className="sticky top-0 bg-white z-40">
      <div className="max-w-screen-xl mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/kamalan_logo_green.png"
            alt="Kamalan"
            className="h-24 font-serif"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling!.style.display = 'block';
            }}
          />
          <span className="hidden font-serif text-xl font-bold text-[#A3B18A]">Kamalan</span>
        </div>

        <div className="flex items-center space-x-8">
          <Heart className="w-6 h-6 cursor-pointer" />

          <ShoppingCart className="w-6 h-6 cursor-pointer" />

          <User className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}