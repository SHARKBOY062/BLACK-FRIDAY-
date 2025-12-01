import { ChevronLeft, ChevronRight, Clock, Gift, Store, Pill, HeartPulse } from "lucide-react";
import { useRef } from "react";

export default function AdvantageBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const items = [
    {
      icon: <Clock size={26} />,
      title: "Receba em até 1 hora",
      subtitle: "com a entrega rápida!",
    },
    {
      icon: <Gift size={26} />,
      title: "Ganhe pontos Stix",
      subtitle: "em suas compras.",
    },
    {
      icon: <Store size={26} />,
      title: "Retire na farmácia em até 30 min",
      subtitle: "Grátis!",
    },
    {
      icon: <Pill size={26} />,
      title: "Descontos e benefícios",
      subtitle: "em medicamentos.",
    },
    {
      icon: <HeartPulse size={26} />,
      title: "Exames, testes, vacinas",
      subtitle: "e muito mais.",
    },
  ];

  return (
    <div className="relative w-full bg-black py-6">
      {/* SETAS PARA DESKTOP */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white"
      >
        <ChevronRight size={22} />
      </button>

      {/* LISTA */}
      <div
        ref={scrollRef}
        className="
          flex gap-5 px-6 overflow-x-auto scrollbar-none
          md:justify-center md:overflow-visible md:px-0
        "
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-col items-center bg-neutral-900 border  
              rounded-2xl px-6 py-4 min-w-[230px]
              text-center text-white flex-shrink-0
            "
          >
            <div className="mb-2">{item.icon}</div>

            <p className="font-semibold leading-tight">{item.title}</p>
            <p className="text-gray-300 text-sm leading-tight">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
