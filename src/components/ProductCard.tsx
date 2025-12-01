import { useState, useEffect } from "react";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface Props {
  name: string;
  image: string;
  oldPrice: number;
  discountPercent: number;
  lightning?: boolean;
  timer?: boolean;
}

export default function ProductCard({
  name,
  image,
  oldPrice,
  discountPercent,
  lightning = false,
  timer = false,
}: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const newPrice = Number((oldPrice * (1 - discountPercent)).toFixed(2));

  const rating = Number((Math.random() * 1.5 + 3.5).toFixed(1));

  const [seconds, setSeconds] = useState(3600);

  useEffect(() => {
    if (!timer) return;
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = () => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const subtotal = (newPrice * quantity).toFixed(2);

  const msg = encodeURIComponent(`
💊 Pedido via WhatsApp
Produto: ${name}
Preço original: R$ ${oldPrice.toFixed(2)}
Desconto: ${(discountPercent * 100).toFixed(0)}%
Preço final: R$ ${newPrice.toFixed(2)}
Quantidade: ${quantity}
Subtotal: R$ ${subtotal}
${timer ? `⏳ Oferta expira em: ${formatTime()}` : ""}
⭐ Avaliação média: ${rating}
`);

  return (
    <div className="relative bg-white border rounded-xl  p-4 hover: transition flex flex-col">

      {lightning && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded animate-pulse">
          ⚡ OFERTA RELÂMPAGO
        </span>
      )}

      {timer && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
          ⏳ {formatTime()}
        </span>
      )}

      <img src={image} className="w-full h-40 object-contain mb-3" />

      <p className="font-medium text-sm min-h-[40px]">{name}</p>

      <p className="text-xs text-yellow-500">⭐ {rating}/5.0</p>

      <p className="line-through text-gray-500 text-xs">R$ {oldPrice}</p>
      <p className="text-red-600 font-bold text-lg">R$ {newPrice}</p>

      <div className="flex items-center mt-2 gap-2">
        <button
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() =>
          addToCart({
            name,
            price: newPrice,
            quantity,
          })
        }
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Adicionar à cesta
      </button>

      <a
        href={`https://wa.me/5511999999999?text=${msg}`}
        target="_blank"
        className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        Comprar no WhatsApp
      </a>
    </div>
  );
}
