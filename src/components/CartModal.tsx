import { X, Minus, Plus, Copy } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

const fallbackImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/200px-No_image_available.svg.png";

// ORDER BUMP
const injections = [
  {
    name: "Ozempic Caneta 2mg/3ml",
    price: 635.94,
    image:
      "https://veja.abril.com.br/wp-content/uploads/2024/10/080_HL_TDURAND_2185873.jpg.jpg?quality=70&strip=info&resize=1080,565&crop=1",
  },
  {
    name: "Mounjaro 2.5mg",
    price: 794.94,
    image: "/src/assets/monjauro.png",
  },
];

const nootropics = [
  {
    name: "Pholia Magra 500mg",
    price: 40.45,
    image: "/src/assets/pholia.png",
  },
  {
    name: "Orlistat 120mg",
    price: 71.95,
    image: "https://diariodopara.com.br/wp-content/uploads/2022/10/Orlistat-1.webp",
  },
];

function getOrderBump(cart) {
  if (!cart.length) return nootropics[0];

  const last = cart[cart.length - 1].name.toLowerCase();

  if (
    last.includes("magra") ||
    last.includes("orlistat") ||
    last.includes("psyllium") ||
    last.includes("quitosana")
  )
    return injections[Math.floor(Math.random() * injections.length)];

  return nootropics[Math.floor(Math.random() * nootropics.length)];
}

export default function CartModal({ open, onClose }) {
  const { cart, addToCart, removeFromCart, clearCart, total } = useCart();
  const bump = getOrderBump(cart);

  // Cupom
  const [couponApplied, setCouponApplied] = useState(false);
  const couponDiscount = couponApplied ? 0.2 : 0; // 20% cupom
  const totalAfterCoupon = total * (1 - couponDiscount);

  // PIX dá 15% OFF
  const pixDiscount = 0.15;
  const totalPix = totalAfterCoupon * (1 - pixDiscount);

  // Steps
  const [step, setStep] = useState(0);

  // Timers
  const [timeLeft, setTimeLeft] = useState(600);

  // PIX modal
  const [pixOpen, setPixOpen] = useState(false);
  const [pixPayload, setPixPayload] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const [pixTimer, setPixTimer] = useState(600);
  const [pixConfirmAvailable, setPixConfirmAvailable] = useState(false);

  // FORM
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Masks
  const maskCPF = (v) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const maskPhone = (v) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

  const maskCEP = (v) =>
    v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");

  // CEP auto
  useEffect(() => {
    if (form.cep.length === 9) {
      fetch(`https://viacep.com.br/ws/${form.cep.replace("-", "")}/json/`)
        .then((r) => r.json())
        .then((d) => {
          if (!d.erro) {
            updateForm("endereco", d.logradouro);
            updateForm("bairro", d.bairro);
            updateForm("cidade", d.localidade);
            updateForm("estado", d.uf);
          }
        });
    }
  }, [form.cep]);

  // Timer carrinho
  useEffect(() => {
    if (!open) return;

    setTimeLeft(600);

    const i = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(i);
  }, [open]);

  // Timer PIX
  useEffect(() => {
    if (!pixOpen) return;

    setPixTimer(600);
    setPixConfirmAvailable(false);
    let elapsed = 0;

    const i = setInterval(() => {
      setPixTimer((t) => (t > 0 ? t - 1 : 0));
      elapsed++;
      if (elapsed >= 120) setPixConfirmAvailable(true);
    }, 1000);

    return () => clearInterval(i);
  }, [pixOpen]);

  // Fake API PIX
  async function generatePix() {
    const fake = {
      payload:
        "000201264444BR.GOV.BCB.PIX0114FAKEPIXKEY5204000053039865406100...",
      qrCodeImage:
        "https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=FAKEPIX",
    };

    setPixPayload(fake.payload);
    setQrCodeImage(fake.qrCodeImage);

    setPixOpen(true);
  }

  // MONTAR MENSAGEM WHATSAPP
  const messageWhatsapp = () => {
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} — ${item.quantity}x = R$ ${(item.price * item.quantity).toFixed(
            2
          )}`
      )
      .join("\n");

    return encodeURIComponent(
      `
🛒 *NOVO PEDIDO*

${itemsText}

———————————
📦 *Total final:* R$ ${totalAfterCoupon.toFixed(2)}
🏷 Cupom aplicado: ${couponApplied ? "SIM" : "NÃO"}
💳 Quero finalizar o pagamento pelo WhatsApp!

*Dados do cliente:*
Nome: ${form.nome}
CPF: ${form.cpf}
Telefone: ${form.telefone}
E-mail: ${form.email}
CEP: ${form.cep}
Endereço: ${form.endereco}, Nº ${form.numero}
Bairro: ${form.bairro}
Cidade: ${form.cidade} / ${form.estado}
`
    );
  };

  if (!open) return null;

  return (
    <>
      {/* ===================================== */}
      {/* MODAL PRINCIPAL */}
      {/* ===================================== */}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X className="w-6 h-6" />
          </button>

          {/* HEADER */}
          <div className="p-6">
            <h2 className="text-xl font-bold">Seu carrinho</h2>

            <p className="text-sm text-red-600 font-semibold">
              Seu pedido está reservado por:{" "}
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </p>
          </div>

          {/* LISTA */}
          <div className="max-h-[45vh] overflow-y-auto p-6 space-y-4">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center gap-4 pb-4">
                <img
                  src={item.image}
                  onError={(e) => (e.currentTarget.src = fallbackImg)}
                  className="w-16 h-16 object-contain"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => addToCart({ ...item, quantity: -1 })}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <span className="font-bold text-sm">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* ORDER BUMP */}
          <div className="bg-gray-100 p-6">
            <p className="font-bold mb-3">Adicione também:</p>

            <div className="flex items-center gap-4">
              <img
                src={bump.image}
                onError={(e) => (e.currentTarget.src = fallbackImg)}
                className="w-16 h-16 object-contain"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{bump.name}</p>
                <p className="font-bold text-red-600">
                  R$ {bump.price.toFixed(2)}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      name: bump.name,
                      price: bump.price,
                      quantity: 1,
                      image: bump.image,
                    })
                  }
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs"
                >
                  Incluir no pedido
                </button>
              </div>
            </div>
          </div>

          {/* CUPOM */}
          <div className="p-6">
            {!couponApplied ? (
              <button
                onClick={() => setCouponApplied(true)}
                className="w-full bg-red-600 text-white py-3 rounded-xl font-bold mb-4"
              >
                Aplicar cupom BLACKDROGASIL (20% OFF)
              </button>
            ) : (
              <p className="text-green-600 font-bold mb-4 text-center">
                Cupom BLACKDROGASIL aplicado! –20%
              </p>
            )}

            {/* TOTAL */}
            <p className="font-bold mb-4">
              Total:{" "}
              <span className="text-red-600 text-lg">
                R$ {totalAfterCoupon.toFixed(2)}
              </span>
            </p>

            {/* LIMPAR */}
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full py-3 rounded-xl font-bold bg-gray-200 text-gray-800 mb-4 hover:bg-gray-300 transition"
              >
                Limpar carrinho
              </button>
            )}

            {/* BOTÃO CHECKOUT */}
            <button
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-xl font-bold text-lg bg-green-700 text-white hover:bg-green-800 transition mb-4"
            >
              Finalizar compra
            </button>

            {/* BOTÃO WHATSAPP VISÍVEL AQUI TAMBÉM */}
            <a
              href={`https://wa.me/5511999999999?text=${messageWhatsapp()}`}
              target="_blank"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#1ebe5d] transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                className="w-6 h-6"
              />
              Finalizar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ====================== STEPS ====================== */}

      {step > 0 && step <= 3 && !pixOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setStep(0)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={22} />
            </button>

            {/* ETAPAS */}
            <div className="flex justify-center gap-3 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
                    step >= s ? "bg-red-600" : "bg-gray-400"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* ETAPA 1 – Dados pessoais */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center text-red-600">
                  Dados pessoais
                </h2>

                <input
                  value={form.nome}
                  onChange={(e) => updateForm("nome", e.target.value)}
                  placeholder="Nome completo"
                  className="w-full border rounded-lg p-2"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={form.cpf}
                    onChange={(e) => updateForm("cpf", maskCPF(e.target.value))}
                    placeholder="CPF"
                    className="border rounded-lg p-2"
                  />

                  <input
                    value={form.telefone}
                    onChange={(e) =>
                      updateForm("telefone", maskPhone(e.target.value))
                    }
                    placeholder="Telefone"
                    className="border rounded-lg p-2"
                  />
                </div>

                <input
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="E-mail"
                />

                <button
                  disabled={
                    !form.nome || !form.cpf || !form.telefone || !form.email
                  }
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl font-bold text-white bg-red-600 disabled:bg-gray-300 mt-4"
                >
                  Continuar
                </button>
              </div>
            )}

            {/* ETAPA 2 – Endereço */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center text-red-600">
                  Endereço
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={form.cep}
                    onChange={(e) => updateForm("cep", maskCEP(e.target.value))}
                    placeholder="CEP"
                    className="border rounded-lg p-2"
                  />

                  <input
                    value={form.numero}
                    onChange={(e) => updateForm("numero", e.target.value)}
                    placeholder="Número"
                    className="border rounded-lg p-2"
                  />
                </div>

                <input
                  value={form.endereco}
                  onChange={(e) => updateForm("endereco", e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Endereço"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={form.complemento}
                    onChange={(e) =>
                      updateForm("complemento", e.target.value)
                    }
                    placeholder="Complemento"
                    className="border rounded-lg p-2"
                  />

                  <input
                    value={form.bairro}
                    onChange={(e) => updateForm("bairro", e.target.value)}
                    placeholder="Bairro"
                    className="border rounded-lg p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={form.cidade}
                    onChange={(e) => updateForm("cidade", e.target.value)}
                    placeholder="Cidade"
                    className="border rounded-lg p-2"
                  />

                  <input
                    value={form.estado}
                    onChange={(e) => updateForm("estado", e.target.value)}
                    placeholder="Estado"
                    className="border rounded-lg p-2"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-lg border font-medium"
                  >
                    Voltar
                  </button>

                  <button
                    disabled={
                      !form.cep ||
                      !form.endereco ||
                      !form.numero ||
                      !form.bairro ||
                      !form.cidade ||
                      !form.estado
                    }
                    onClick={() => setStep(3)}
                    className="px-6 py-2 rounded-lg font-bold text-white bg-red-600 disabled:bg-gray-300"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3 – PIX */}
            {step === 3 && (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-bold text-red-600">
                  Finalizar pagamento
                </h2>

                <p className="text-gray-600">
                  Escolha uma forma de pagamento abaixo:
                </p>

                {/* PIX */}
                <button
                  onClick={async () => {
                    setStep(0);
                    await generatePix();
                  }}
                  className="w-full py-3 bg-green-700 text-white rounded-xl font-bold text-lg"
                >
                  💸 Pagar no PIX (15% OFF)
                </button>

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/5511999999999?text=${messageWhatsapp()}`}
                  target="_blank"
                  className="w-full mt-3 flex items-center justify-center gap-3 bg-[#25D366] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#1ebe5d]"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    className="w-6 h-6"
                  />
                  Finalizar pelo WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================== PIX POPUP ====================== */}

      {pixOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setPixOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X size={26} />
            </button>

            <h2 className="text-2xl font-bold text-center">
              Pagamento via PIX
            </h2>

            <p className="text-center text-green-600 font-semibold mb-4">
              Você ganhou 15% de desconto pagando no PIX!
            </p>

            <img
              src={qrCodeImage}
              className="w-52 h-52 mx-auto mb-4"
            />

            <p className="text-sm font-medium mb-1">Código copia e cola:</p>

            <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-3">
              <textarea
                readOnly
                value={pixPayload}
                className="flex-1 bg-transparent text-sm resize-none outline-none"
                rows={3}
              />

              <button
                onClick={() => navigator.clipboard.writeText(pixPayload)}
                className="bg-black text-white p-2 rounded-lg"
              >
                <Copy size={16} />
              </button>
            </div>

            <p className="font-bold text-xl text-center mb-4">
              Total no PIX: R$ {totalPix.toFixed(2)}
            </p>

            {pixConfirmAvailable ? (
              <a
                target="_blank"
                href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                  `PAGAMENTO REALIZADO!\n\nValor pago: R$ ${totalPix.toFixed(
                    2
                  )}`
                )}`}
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-lg text-center"
              >
                Já realizei o pagamento ✔
              </a>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white py-3 rounded-xl font-bold text-lg cursor-not-allowed"
              >
                Aguarde 2 minutos…
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
