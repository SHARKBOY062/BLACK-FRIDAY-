import { useState } from "react";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import AdvantageBar from "./components/AdvantageBar";
import ProductCarousel from "./components/ProductCarousel";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";

import PholiaImg from "./assets/pholia.png";
import QuitosanaImg from "./assets/quitosana.png";
import MonjauroImg from "./assets/monajuro.png"; // ✅ NOVO

const injecoes = [
  {
    name: "Ozempic Caneta 2mg/3ml",
    image:
      "https://veja.abril.com.br/wp-content/uploads/2024/10/080_HL_TDURAND_2185873.jpg.jpg?quality=70&strip=info&resize=1080,565&crop=1",
    oldPrice: 1199.9,
    discountPercent: 0.47,
    lightning: true,
    timer: true,
  },
  {
    name: "Mounjaro 2.5mg",
    image: MonjauroImg, // ✅ AGORA FUNCIONA SEM BUGAR
    oldPrice: 1499.9,
    discountPercent: 0.47,
  },
  {
    name: "Saxenda 5x",
    image:
      "https://www.netpharmacy.co.nz/cdn/shop/files/saxenda-liraglutide-injection-18mg-3ml-5-prefilled-pens.webp?v=1699998192",
    oldPrice: 799.9,
    discountPercent: 0.47,
  },
  {
    name: "Wegovy 0.25mg",
    image:
      "https://veja.abril.com.br/wp-content/uploads/2024/05/GettyImages-2150033257.jpg?crop=1&resize=1212,909",
    oldPrice: 1349.9,
    discountPercent: 0.47,
  },
  {
    name: "Saxenda 3mg",
    image:
      "https://www.netpharmacy.co.nz/cdn/shop/files/saxenda-liraglutide-injection-18mg-3ml-5-prefilled-pens.webp?v=1699998192",
    oldPrice: 699.9,
    discountPercent: 0.47,
  },
];

/* =============================
   🟦 NOOTRÓPICOS – 55% OFF
============================= */
const nootropicos = [
  {
    name: "Pholia Magra 500mg",
    image: PholiaImg,
    oldPrice: 89.9,
    discountPercent: 0.55,
  },
  {
    name: "Orlistat 120mg",
    image: "https://diariodopara.com.br/wp-content/uploads/2022/10/Orlistat-1.webp",
    oldPrice: 159.9,
    discountPercent: 0.55,
  },
  {
    name: "Quitosana 120 cápsulas",
    image: QuitosanaImg,
    oldPrice: 49.9,
    discountPercent: 0.55,
  },
  {
    name: "Psyllium 200g",
    image:
      "https://images.tcdn.com.br/img/img_prod/1132291/psyllium_250mg_glucomannan_250mg_60_ou_120_capsulas_579_1_fb4fbd255f74339dce6933db5e4013fc.jpg",
    oldPrice: 69.9,
    discountPercent: 0.55,
  },
  {
    name: "L-Carnitina Líquida 3000mg",
    image:
      "https://images.tcdn.com.br/img/img_prod/1399289/l_carn_2000_l_carnitina_60_capsulas_75_1_ee4c020ccee78f1543c553a6564b8081.jpg",
    oldPrice: 119.9,
    discountPercent: 0.55,
  },
];

const maisProcurados = [
  injecoes[0],
  injecoes[1],
  nootropicos[0],
  nootropicos[1],
  injecoes[4],
];

export default function App() {
  const [openCart, setOpenCart] = useState(false);

  return (
    <div className="pt-[140px] md:pt-[100px] bg-black min-h-screen">
      <Header onOpenCart={() => setOpenCart(true)} />

      <HeroBanner />
      <AdvantageBar />

      <div className="w-full h-[160px] bg-gradient-to-b from-black/0 via-black/10 to-white"></div>

      <div className="bg-white text-black">
        <ProductCarousel title="Injeções para Emagrecimento" products={injecoes} />
        <ProductCarousel title="Nootrópicos para Emagrecimento" products={nootropicos} />
        <ProductCarousel title="Mais Procurados" products={maisProcurados} />
      </div>

      <CartModal open={openCart} onClose={() => setOpenCart(false)} />
      <Footer />
    </div>
  );
}
