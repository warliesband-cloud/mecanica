import { Wrench, Phone, MessageSquare, Shield, ChevronUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          
          {/* Column 1: Brand & Moto */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleScrollTop}>
              <div className="p-2 bg-brand-yellow font-mono font-black text-slate-950 rounded text-lg flex items-center gap-0.5">
                <Wrench className="w-4.5 h-4.5" />
                <span>MRC</span>
              </div>
              <span className="text-white font-display font-black text-base uppercase tracking-tight">Mecânica Diesel</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Especialistas em diagnóstico por imagem eletrônica e reparos corretivos complexos. Mantemos sua frota rodando com o menor tempo de pátio possível e máxima segurança.
            </p>
          </div>

          {/* Column 2: Quick scroll links */}
          <div>
            <h3 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">
              Seções do Site
            </h3>
            <div className="flex flex-col gap-3 text-xs">
              <button onClick={() => handleScrollTo('#especialidades')} className="text-left hover:text-amber-500 transition-colors">
                Especialização Técnica
              </button>
              <button onClick={() => handleScrollTo('#diagnostico')} className="text-left hover:text-amber-500 transition-colors">
                Simulador de Falhas ECU
              </button>
              <button onClick={() => handleScrollTo('#galeria')} className="text-left hover:text-amber-500 transition-colors">
                Galeria de Serviços
              </button>
              <button onClick={() => handleScrollTo('#agendamento')} className="text-left hover:text-amber-500 transition-colors">
                Reservar Horário
              </button>
              <button onClick={() => handleScrollTo('#localizacao')} className="text-left hover:text-amber-500 transition-colors">
                Endereço e Contatos
              </button>
            </div>
          </div>

          {/* Column 3: Maintenance links */}
          <div>
            <h3 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">
              Nossos Serviços
            </h3>
            <ul className="flex flex-col gap-3 text-xs">
              <li>Retífica Completa de Motores</li>
              <li>Diagnóstico por Scanner Digital</li>
              <li>Ajustes de Injeção Common Rail</li>
              <li>Calibração de Emissões Arla 32</li>
              <li>Revisão de Cuícas e Válvulas de Freio</li>
            </ul>
          </div>

          {/* Column 4: Immediate contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-6 border-b border-slate-900 pb-2">
              Central de Atendimento
            </h3>
            <div className="flex flex-col gap-3 text-xs font-mono">
              <a href="tel:21970434039" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" /> (21) 97043-4039
              </a>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" /> Atendimento via WhatsApp ativo
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Shield className="w-4 h-4 text-slate-500 shrink-0" /> Registro CNPJ: Sob Consulta
              </span>
            </div>
          </div>

        </div>

        {/* Divider and copyright area */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 MRC Mecânica Diesel - Do Leve ao Pesado. Todos os direitos reservados.</p>
          <button
            onClick={handleScrollTop}
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white rounded transition-colors flex items-center gap-1"
            title="Voltar ao início"
          >
            <ChevronUp className="w-4 h-4" /> Topo
          </button>
        </div>
      </div>
    </footer>
  );
}
