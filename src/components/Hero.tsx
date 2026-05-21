import { Shield, ArrowRight, Activity, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '15+', label: 'Anos de Experiência' },
    { value: '100%', label: 'Foco em Motores Diesel' },
    { value: 'Leve → Pesado', label: 'Suporte a Toda Frota' },
    { value: 'Top Scanner', label: 'Escaners de Alta Precisão' }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden pt-20">
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/mrc_hero_diesel_1779380499996.png"
          alt="Oficina Mecânica Diesel MRC"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 z-10 w-full relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-amber-500 font-mono text-xs font-semibold px-3 py-1.5 rounded-full w-fit backdrop-blur-sm shadow-md"
            >
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>TECNOLOGIA DE PONTA E ESPECIALISTAS EM DIESEL</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-[1.1] tracking-tight uppercase"
            >
              Do leve ao pesado, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                sua força na estrada.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg max-w-xl leading-relaxed font-sans"
            >
              Na <strong className="text-white font-semibold">MRC</strong>, somos especialistas em motores e sistemas diesel de caminhões, cavalos mecânicos, vans e utilitários. Executamos desde diagnósticos eletrônicos ultramodernos até reformas complexas de motores, sempre com precisão máxima.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <button
                onClick={() => handleScrollTo('#agendamento')}
                className="group px-6 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base rounded shadow-xl hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                Agendamento Online
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/5521970434039?text=Ol%C3%A1%21+Preciso+de+um+suporte+mec%C3%A2nico+ou+or%C3%A7amento+para+meu+caminh%C3%A3o."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 fill-emerald-500" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.28 1.48 4.73 1.481 5.425 0 9.85-4.388 9.854-9.785.002-2.615-1.011-5.074-2.853-6.918C16.48 2.087 14.032 1.077 11.53 1.077c-5.429 0-9.857 4.385-9.863 9.786-.002 1.763.479 3.483 1.393 4.965l-.344 1.258-.702 2.56 2.65-.694 1.31-.343z" />
                </svg>
                Orçamento no WhatsApp
              </a>
            </motion.div>

            {/* Safety Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-6 mt-4 text-xs font-mono text-slate-400 border-t border-slate-900 pt-6"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Atendimento Qualificado</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-500" />
                <span>Rastreamento Computadorizado de Falhas</span>
              </div>
            </motion.div>
          </div>

          {/* Side Technical Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 bg-slate-900/60 border border-slate-800 p-6 rounded-lg backdrop-blur-md relative hidden md:block"
          >
            <div className="absolute top-0 right-0 p-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-l border-slate-800">
              SYS STATUS: ONLINE
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-4 uppercase text-left">Foco em Soluções Diesel</h3>
            <div className="flex flex-col gap-3 text-left text-sm font-sans">
              <div className="flex justify-between items-center py-2 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Leves e Utilitários</span>
                <span className="text-slate-100 font-semibold font-mono">Vans, HR, Amarok, Hilux, Transit...</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Pesados e Caminhões</span>
                <span className="text-slate-100 font-semibold font-mono">Skania, Mercedes, Volvo, Iveco...</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Injeção Eletrônica</span>
                <span className="text-emerald-500 font-semibold font-mono">Common Rail de Alta Pressão</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Arla 32 e Emissões</span>
                <span className="text-amber-500 font-semibold font-mono font-mono">Reparo DPF, SCR e Valvulas EGR</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Parado na Estrada?</span>
                <a href="https://wa.me/5521970434039?text=Socorro%21+Meu+caminh%C3%A3o+parou+na+pista+e+preciso+de+apoio." target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold border border-red-500/30 px-2.5 py-1 rounded bg-red-950/20 hover:bg-red-950/40 transition-colors uppercase text-xs">
                  SUPORTE URGENTE
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pb-6 border-t border-slate-900 pt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center group border-r border-slate-900/60 last:border-r-0"
            >
              <div className="font-display font-black text-white text-2xl lg:text-3xl tracking-tight group-hover:text-amber-500 transition-colors">
                {stat.value}
              </div>
              <div className="font-sans text-xs text-slate-400 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
