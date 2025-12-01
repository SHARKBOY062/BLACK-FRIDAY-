import { useEffect, useState } from "react";

const names = [
  "Ana Paula", "João Marcos", "Fernanda L.", "Carlos A.", "Beatriz Santos",
  "José Roberto", "Mariana P.", "Lucas Henrique", "Bruna T.", "Rafael M.",
];

const products = [
  "Ozempic 2mg",
  "Mounjaro 2.5mg",
  "Saxenda 5 canetas",
  "Pholia Magra 500mg",
  "Orlistat 120mg",
  "Quitosana 120 caps",
  "Psyllium 200g",
];

export default function PurchaseNotifications() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: "", product: "" });

  function generateNotification() {
    const name = names[Math.floor(Math.random() * names.length)];
    const product = products[Math.floor(Math.random() * products.length)];

    setData({ name, product });
    setVisible(true);

    setTimeout(() => setVisible(false), 5000);
  }

  useEffect(() => {
    const interval = setInterval(() => generateNotification(), 15000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="
      fixed bottom-6 left-4 z-[9999]
      bg-white  border 
      px-4 py-3 rounded-xl animate-slide-up
      flex items-center gap-3 w-[260px]
    ">
      <img
        src='https://cdn-icons-png.flaticon.com/512/833/833472.png'
        className='w-10 h-10 rounded-full'
      />

      <div className="text-sm leading-tight">
        <strong>{data.name}</strong><br />
        acabou de comprar <strong>{data.product}</strong> 🎉
      </div>
    </div>
  );
}
