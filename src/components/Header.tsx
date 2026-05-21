import { Wrench, Phone, CalendarCheck, Clock, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Simular Diagnóstico', href: '#diagnostico' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Agendar Horário', href: '#agendamento' },
    { label: 'Localização', href: '#localizacao' }
  ];

  const handleNavClick = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="bg-slate-950 text-slate-300 py-1.5 text-xs border-b border-slate-900 hidden md:block z-50 relative">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-yellow" /> Seg a Sex: 08:00 às 18:00 | Sáb: 08:00 às 12:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:21970434039" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-brand-yellow" /> (21) 97043-4039
            </a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-2 sm:py-3' : 'bg-transparent py-4 sm:py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3.5 md:gap-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-2 sm:p-2.5 bg-brand-yellow text-slate-950 rounded font-mono font-bold text-lg sm:text-xl tracking-tighter flex items-center gap-1 group-hover:bg-amber-400 transition-colors shadow-inner shadow-black/10 animate-[pulse_3s_infinite_ease-in-out]">
              <Wrench className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
              <span>MRC</span>
            </div>
            <div className="text-left">
              <h1 className="text-white font-display font-bold text-base sm:text-lg leading-tight tracking-tight uppercase">Mecânica Diesel</h1>
              <p className="text-[9px] sm:text-[10px] text-amber-500 font-mono tracking-wider font-semibold uppercase">Do leve ao pesado</p>
            </div>
          </div>

          {/* Navigation links - situated between the logo and CTA buttons */}
          <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 max-w-full md:max-w-screen-md">
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-2.5 py-1.5 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-tight sm:tracking-normal text-slate-300 hover:text-amber-500 hover:bg-slate-900/50 rounded transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('#agendamento')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-500 hover:text-amber-400 font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wide rounded border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Agendar
            </button>
            <a
              href="https://wa.me/5521970434039?text=Ol%C3%A1%21+Gostaria+de+fazer+um+or%C3%A7amento+para+meu+ve%C3%ADculo+diesel."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-wide rounded transition-colors shadow-lg shadow-emerald-950/20 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.28 1.48 4.73 1.481 5.425 0 9.85-4.388 9.854-9.785.002-2.615-1.011-5.074-2.853-6.918C16.48 2.087 14.032 1.077 11.53 1.077c-5.429 0-9.857 4.385-9.863 9.786-.002 1.763.479 3.483 1.393 4.965l-.344 1.258-.702 2.56 2.65-.694 1.31-.343z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
