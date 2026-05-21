import React, { useState } from 'react';
import { Wrench, Phone, CalendarCheck, MapPin, Camera, Clock, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function BentoHero() {
  const [formData, setFormData] = useState({
    nome: '',
    veiculo: '',
    servico: 'preventive'
  });
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    }
  };

  const serviceLabels: Record<string, string> = {
    preventive: 'Manutenção Preventiva',
    corrective: 'Reparo Corretivo',
    injection: 'Injeção e Eletrônica',
    heavy: 'Revisão Motor/Câmbio'
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('Por favor, preencha o seu nome.');
      return;
    }

    // Process submission and open WhatsApp
    const message = `Olá MRC! Solicitei agendamento pelo site:\n\n*Cliente:* ${formData.nome}\n*Veículo:* ${formData.veiculo || 'Não especificado'}\n*Serviço:* ${serviceLabels[formData.servico] || formData.servico}\n\nGostaria de confirmar o melhor horário.`;
    const whatsappUrl = `https://wa.me/5521970434039?text=${encodeURIComponent(message)}`;
    
    setJustSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setJustSubmitted(false);
    }, 800);
  };

  const handleScrollTo = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-[1200px] mx-auto bg-[#0c0c0e] rounded-3xl p-6 md:p-8 border border-slate-900 shadow-2xl">
        
        {/* Exact Logo and Header block match */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-900">
          <div className="text-left">
            <div className="flex items-center gap-2 xs:gap-3">
              <span className="text-2xl xs:text-3xl md:text-4xl font-black font-display tracking-tight text-amber-500 uppercase">
                Mrc
              </span>
              <span className="text-lg xs:text-xl md:text-2xl font-light text-slate-100 uppercase tracking-widest font-sans">
                Mecânica Diesel
              </span>
            </div>
            <p className="text-[9px] xs:text-[10px] sm:text-xs text-slate-400 font-mono tracking-wider uppercase font-semibold mt-1">
              Especialista do leve ao pesado • Performance & confiança
            </p>
          </div>

          <a 
            href="https://wa.me/5521970434039?text=Ol%C3%A1%20MRC%2C%20gostaria%20de%20solicitar%20um%20agendamento%20de%20servi%C3%A7o."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-black text-xs sm:text-sm rounded shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            Agendar via Whatsapp 
            <span className="font-mono text-slate-950/80 border-l border-slate-900/25 pl-2">21 97043-4039</span>
          </a>
        </div>

        {/* High-Impact Enterprise Brand Banner - Centered & Rounded professionally */}
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-900 shadow-2xl relative group">
          <img 
            src="/src/assets/images/mrc_company_banner_1779382247039.png" 
            alt="MRC Mecânica Diesel Banner" 
            className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
            referrerPolicy="no-referrer"
          />
          {/* Decorative subtle ambient neon glow boundary */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
        </div>

        {/* Dynamic Bento Grid Desktop/Mobile optimized precisely */}
        <div className="grid grid-cols-12 gap-3.5 md:gap-5 mt-6 items-stretch">
          
          {/* Box 1 (Top Left, Large): Technology & Specialization */}
          <div className="col-span-12 md:col-span-5 bg-[#141417] border border-slate-900 p-5 sm:p-7 md:p-8 rounded-2xl flex flex-col justify-between text-left relative overflow-hidden min-h-[300px] md:min-h-[380px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full" />
            
            <div>
              <span className="text-[10px] xs:text-xs font-mono font-bold tracking-widest text-amber-500 uppercase block mb-2 md:mb-3">
                Nossa Especialidade
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white leading-tight uppercase">
                Tecnologia de Ponta <br className="hidden sm:inline" />
                para sua Frota
              </h2>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-3 md:mt-4 font-sans">
                Contamos com scanners de diagnóstico avançado para todas as marcas nacionais e importadas. Especialistas em motores Cummins, MWM, Volvo e Scania.
              </p>
            </div>

            {/* Sub capsules buttons */}
            <div className="grid grid-cols-2 gap-2.5 mt-6 md:mt-8">
              <button 
                onClick={() => handleScrollTo('#especialidades')}
                className="p-3 bg-[#1b1b21] hover:bg-[#202028] border border-slate-900 hover:border-slate-800 rounded-xl transition-all text-left"
              >
                <span className="text-[10px] md:text-[11px] font-bold text-amber-500 font-mono block">01. Preventiva</span>
                <span className="text-[9px] md:text-[10px] text-slate-400 block font-sans uppercase tracking-tight mt-0.5 md:mt-1">Checklist 50 Pontos</span>
              </button>
              <button 
                onClick={() => handleScrollTo('#diagnostico')}
                className="p-3 bg-[#1b1b21] hover:bg-[#202028] border border-slate-900 hover:border-slate-800 rounded-xl transition-all text-left"
              >
                <span className="text-[10px] md:text-[11px] font-bold text-amber-500 font-mono block">02. Reparos</span>
                <span className="text-[9px] md:text-[10px] text-slate-400 block font-sans uppercase tracking-tight mt-0.5 md:mt-1">Alta Complexidade</span>
              </button>
            </div>
          </div>

          {/* Box 2 (Top Middle, Images Matrix Layout matches precisely) */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-3.5 md:gap-4">
            {/* Top row image matrix */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              
              {/* Box 2A: Motor Diesel Image Block */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-900 group cursor-pointer" onClick={() => handleScrollTo('#galeria')}>
                <img 
                  src="/src/assets/images/mrc_engine_repair_1779380541633.png" 
                  alt="Motor Diesel" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40" />
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span className="px-2.5 py-1 bg-slate-950/95 border border-slate-800 rounded font-mono text-[9px] md:text-[10px] text-white font-bold tracking-widest uppercase">
                    Motor Diesel
                  </span>
                </div>
              </div>

              {/* Box 2B: Transmissão Image Block */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-900 group cursor-pointer" onClick={() => handleScrollTo('#galeria')}>
                <img 
                  src="/src/assets/images/mrc_suspension_1779380563262.png" 
                  alt="Transmissão" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40" />
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  <span className="px-2.5 py-1 bg-slate-950/95 border border-slate-800 rounded font-mono text-[9px] md:text-[10px] text-white font-bold tracking-widest uppercase">
                    Transmissão
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Row long banner image */}
            <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[110px] md:min-h-[140px] border border-slate-900 group cursor-pointer" onClick={() => handleScrollTo('#galeria')}>
              <img 
                src="/src/assets/images/mrc_hero_diesel_1779380499996.png" 
                alt="Linha Pesada" 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-75 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/30" />
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <span className="px-3.5 py-1.5 bg-slate-950/95 border border-slate-800 rounded font-mono text-[10px] md:text-[11px] text-white font-bold tracking-widest uppercase">
                  Linha Pesada Scania/Volvo
                </span>
              </div>
            </div>
          </div>

          {/* Box 3 & 4 (Top Right, Stats & Portfolio) - Optimized to be a horizontal pair on mobile to avoid breaking bento grid */}
          <div className="col-span-12 md:col-span-2 flex flex-row md:flex-col gap-3.5 md:gap-4">
            
            {/* Box 3 (Huge amber statistic match) */}
            <div className="bg-amber-500 px-4 py-5 md:p-6 rounded-2xl flex flex-col justify-center items-center text-center flex-1 min-h-[110px] md:min-h-[180px] shadow-lg shadow-amber-500/10">
              <span className="text-3xl xs:text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tighter">
                15+
              </span>
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-slate-900 uppercase font-black mt-1 md:mt-2">
                Anos de Mercado
              </span>
            </div>

            {/* Box 4: Portfolio Link Card Match */}
            <button 
              onClick={() => handleScrollTo('#galeria')}
              className="bg-[#141417] border border-slate-900 px-4 py-5 md:p-6 rounded-2xl text-center hover:bg-[#1b1b20] transition-colors flex flex-col justify-center items-center flex-1 min-h-[110px] md:min-h-[140px]"
            >
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold block">
                Portfólio
              </span>
              <span className="text-[11px] md:text-xs text-white font-display font-bold uppercase mt-1.5 md:mt-2 block hover:underline">
                Ver fotos →
              </span>
            </button>

          </div>

          {/* Bottom Row - Agendamento Form, Location sat and schedule timings */}
          
          {/* Box 5 (Bottom Left, Agendamento Online Form match) */}
          <div className="col-span-12 md:col-span-4 bg-[#141417] border border-slate-900 p-5 sm:p-6 md:p-7 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <h3 className="font-display font-black text-white text-base md:text-lg uppercase mb-4 tracking-tight">
                Agendamento Online
              </h3>
              
              <form onSubmit={handleFormSubmit} onKeyDown={handleFormKeyDown} className="flex flex-col gap-3">
                <div>
                  <input 
                    type="text" 
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu Nome" 
                    className="w-full bg-[#1b1b1e] text-slate-200 text-xs px-3.5 py-3 rounded border border-slate-900 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input 
                    type="text" 
                    name="veiculo"
                    value={formData.veiculo}
                    onChange={handleInputChange}
                    placeholder="Veículo / Modelo" 
                    className="w-full bg-[#1b1b1e] text-slate-200 text-xs px-3.5 py-3 rounded border border-slate-900 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <select 
                    name="servico"
                    value={formData.servico}
                    onChange={handleInputChange}
                    className="w-full bg-[#1b1b1e] text-slate-200 text-xs px-3.5 py-3 rounded border border-slate-900 focus:border-amber-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="preventive">Manutenção Preventiva</option>
                    <option value="corrective">Reparo Corretivo</option>
                    <option value="injection">Injeção e Eletrônica</option>
                    <option value="heavy">Revisão Motor/Câmbio</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-slate-100 hover:bg-white text-slate-950 font-display font-black text-xs uppercase py-3 rounded transition-colors tracking-widest mt-1 shadow"
                >
                  {justSubmitted ? 'Processando...' : 'Solicitar Horário'}
                </button>
              </form>
            </div>
          </div>

          {/* Box 6 (Bottom Center, Onde Estamos Mock Map/Satellite Box Layout Match) */}
          <div 
            onClick={() => handleScrollTo('#localizacao')}
            className="col-span-12 sm:col-span-7 md:col-span-5 bg-[#141417] border border-slate-900 rounded-2xl relative overflow-hidden group cursor-pointer min-h-[160px] md:min-h-[220px] flex flex-col justify-end p-4 md:p-5 text-left"
          >
            {/* Visual satellite background map to match exact screenshot container */}
            <div className="absolute inset-0 z-0">
              <iframe
                title="Google Satellite Map Preview"
                src="https://maps.google.com/maps?q=Rua%20Palmeira%2065%2C%20Vargem%20Pequena%2C%20Rio%20de%20Janeiro&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-20 brightness-[0.4] contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            <div className="z-10 flex items-start gap-3 sm:gap-4">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0 border-[3px] sm:border-4 border-slate-950 animate-pulse text-slate-950">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#d8971f] uppercase block">
                  Onde Estamos
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white block mt-0.5 sm:mt-1 leading-snug">
                  Rua Palmeira, 65 - Vargem Pequena, Rio de Janeiro - CEP 20972-400
                </span>
              </div>
            </div>
          </div>

          {/* Box 7 (Bottom Right, Atendimento timings & emergency numbers precisely) */}
          <div className="col-span-12 sm:col-span-5 md:col-span-3 bg-[#141417] border border-slate-900 p-5 sm:p-6 rounded-2xl flex flex-col justify-between text-left min-h-[160px] md:min-h-[220px]">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold block mb-1.5 sm:mb-2">
                Horário de Atendimento
              </span>
              <div className="text-xs text-slate-300 font-sans flex flex-col gap-1">
                <span className="font-semibold text-white leading-normal">Seg - Sex: 08:00 às 18:00</span>
                <span className="font-semibold text-white leading-normal">Sáb: 08:00 às 12:00</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-900">
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold block mb-0.5">
                Plantão Emergencial
              </span>
              <a 
                href="tel:21970434039" 
                className="text-sm sm:text-base font-mono font-bold text-amber-500 hover:text-amber-400 block transition-colors mt-0.5"
              >
                (21) 97043-4039
              </a>
            </div>

            <p className="text-[9px] text-slate-600 italic font-sans leading-tight mt-2.5">
              * Atendimento 24h em campo para frotas credenciadas
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
