import LogoImg from "../assets/logo.png";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface Props {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: Props) {
  const { cart, total } = useCart();
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

      {/* CONTAINER DESKTOP */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-6 py-4">

        {/* LOGO */}
        <img src={LogoImg} alt="Logo" className="h-14" />

        {/* PESQUISA */}
        <div className="flex-1 px-6">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Buscar produtos..."
              className="
                w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10
                focus:outline-none focus:border-red-600
              "
            />
            <Search
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* SALDO + CARRINHO */}
        <div className="flex items-center gap-6">

          {/* SALDO */}
          <div className="text-right">
            <p className="text-xs text-gray-500">Saldo no carrinho</p>
            <p className="text-lg font-bold text-red-600">
              R$ {total.toFixed(2)}
            </p>
          </div>

          {/* CARRINHO */}
          <button
            onClick={onOpenCart}
            className="relative bg-white border border-gray-300 p-3 rounded-full shadow hover:scale-105 transition"
          >
            <ShoppingCart size={22} />

            {cart.length > 0 && (
              <span
                className="
                  absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold
                  rounded-full px-2 py-0.5
                "
              >
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================= MOBILE ========================= */}

      <div className="md:hidden px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <img src={LogoImg} alt="Logo" className="h-12" />

        {/* SALDO + CARRINHO (ALINHADOS) */}
        <div className="flex items-center gap-4">

          {/* SALDO MOBILE */}
          <p className="text-sm font-bold text-red-600">
            R$ {total.toFixed(2)}
          </p>

          {/* CARRINHO */}
          <button
            onClick={onOpenCart}
            className="relative bg-white border border-gray-300 p-3 rounded-full shadow"
          >
            <ShoppingCart size={22} />

            {cart.length > 0 && (
              <span
                className="
                  absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold
                  rounded-full px-2 py-0.5
                "
              >
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* BARRA DE PESQUISA MOBILE */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Buscar produtos..."
            className="
              w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-4 pr-10
              focus:outline-none focus:border-red-600
            "
          />
          <Search
            size={20}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

    </header>
  );
}
