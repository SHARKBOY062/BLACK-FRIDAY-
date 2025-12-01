import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  name: string;
  image: string;
  oldPrice: number;
  discountPercent: number;
  lightning?: boolean;
  timer?: boolean;
}

interface Props {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Título + Setas */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="bg-neutral-200 hover:bg-neutral-300 text-black p-2 rounded-full"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-neutral-200 hover:bg-neutral-300 text-black p-2 rounded-full"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Produtos */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none md:overflow-visible"
        >
          {products.map((item, index) => {
            const finalPrice = (item.oldPrice * (1 - item.discountPercent)).toFixed(2);

            return (
              <div
                key={index}
                className="bg-white rounded-2xl  p-4 w-[220px] md:w-[240px] flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  crossOrigin="anonymous"
                  className="w-full h-[180px] object-cover rounded-xl mb-3"
                />

                <p className="font-semibold text-[15px] leading-tight mb-2">
                  {item.name}
                </p>

                <p className="line-through text-gray-400 text-sm">
                  R$ {item.oldPrice}
                </p>

                <p className="text-red-600 font-bold text-xl mb-2">
                  R$ {finalPrice}
                </p>

                {/* Quantidade */}
                <div className="flex items-center gap-2 justify-center my-3">
                  <button className="bg-neutral-200 px-3 py-1 rounded">-</button>
                  <span>1</span>
                  <button className="bg-neutral-200 px-3 py-1 rounded">+</button>
                </div>

                {/* Botões */}
                <button
                  onClick={() =>
                    addToCart({
                      name: item.name,
                      price: Number(finalPrice),
                      quantity: 1,
                      image: item.image,
                    })
                  }
                  className="w-full bg-[#d71921] hover:bg-[#b1141b] text-white py-2 rounded-xl font-medium mb-2"
                >
                  Adicionar à cesta
                </button>

                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                    `Quero comprar: ${item.name} por R$ ${finalPrice}`
                  )}`}
                  target="_blank"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  Comprar no WhatsApp
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
