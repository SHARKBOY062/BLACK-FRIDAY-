import LogoImg from "../assets/logo.png";
import AnvisaImg from "../assets/anvisa.png";
import PagImg from "../assets/pag.png";

export default function Footer() {
  return (
    <footer className="bg-[#f8f8f8] text-black   mt-10 pt-10 pb-6">

      {/* BLOCO DE LINKS */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

        <div>
          <h3 className="font-semibold mb-3">Institucional</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Nossa História</li>
            <li>Nossas farmácias</li>
            <li>Sustentabilidade</li>
            <li>Ética e Compliance</li>
            <li>Trabalhe Conosco</li>
            <li>Imprensa</li>
            <li>Investidores</li>
            <li>Blog</li>
            <li>Mais Buscados</li>
            <li>Bulas de A a Z</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Serviços</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Programa Mais Saúde</li>
            <li>Farmacêutico Drogasil</li>
            <li>Serviços de Saúde</li>
            <li>Vacinação Corporativa</li>
            <li>Manipulação</li>
            <li>Univers</li>
            <li>Assinatura</li>
            <li>Seus Pontos stix</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Perfil</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Criar novo cadastro</li>
            <li>Alterar dados pessoais</li>
            <li>Editar endereços</li>
            <li>Acompanhar um pedido</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Atendimento</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Central de Atendimento</li>
            <li>Dúvidas por WhatsApp</li>
            <li>Como comprar</li>
            <li>Formas de pagamento</li>
            <li>Prazo de entrega</li>
            <li>Trocas e devoluções</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Segurança e Privacidade</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Proteção de dados</li>
            <li>Política de Privacidade</li>
            <li>Portal do Titular</li>
          </ul>
        </div>
      </div>

     {/* FORMAS DE PAGAMENTO */}
<div className="max-w-7xl mx-auto px-6 pb-10">
  <h3 className="font-semibold mb-1">Formas de pagamento</h3>

  <p className="text-sm text-gray-700 mb-4">
    Parcelamos em até <b>3x sem juros</b> nos cartões de crédito
  </p>

  <img src={PagImg} alt="Formas de Pagamento" className="h-10" />
</div>


      {/* LOGO + TEXTO LEGAL */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-start gap-6">
          <img src={LogoImg} alt="Drogasil" className="h-20 flex-shrink-0" />

          <p className="text-xs text-gray-600 leading-relaxed">
            Raia Drogasil SA | DROGASIL | CNPJ: 61.585.865/0240-93 |
            Av. Nsa. Sra. Assunção, 638 | Butantã | São Paulo (SP) |
            CEP 05359-001 | Para dúvidas, elogios e reclamações acesse nossa
            Central de Atendimento no Whatsapp | As informações contidas neste
            site não substituem o médico. Consulte sempre um profissional da saúde.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-xs text-gray-700">
            A Drogasil segue as determinações da
          </span>
          <img src={AnvisaImg} alt="ANVISA" className="h-8" />
        </div>

      </div>
    </footer>
  );
}
