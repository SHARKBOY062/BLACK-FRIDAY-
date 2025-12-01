import { Tag } from "lucide-react";

export default function BlackFridayFloat({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-5 right-5
        bg-black text-white font-bold
        px-5 py-3 rounded-2xl
         
        flex items-center gap-2
        animate-pulse
        z-50
      "
    >
      <Tag className="w-5 h-5 text-red-500" />
      BLACK FRIDAY
    </button>
  );
}
