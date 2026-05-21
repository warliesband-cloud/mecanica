import { useState } from 'react';
import { GalleryItem } from '../types';
import { Camera, Check, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Retífica e Reforma Completa de Motor Cummins ISM 11',
    description: 'Brunimento de camisa de cilindros, substituição de pistões, bielas, casquilhos e brunidores no bloco. Recuperação da taxa de compressão original de fábrica e parametrização eletrônica de torque.',
    category: 'complex',
    image: '/mrc_engine_repair_1779380541633.png',
    truckType: 'Caminhão Pesado Core (Scania / Volvo)'
  },
  {
    id: 'g2',
    title: 'Substituição Completa de Bolsas de Ar e Molas Clássicas',
    description: 'Substituição das câmaras pneumáticas de ar traseiras e embuchamentos de PU do eixo de tração, com alinhamento a laser computadorizado e calibração de válvulas distribuidoras de freio de carreta.',
    category: 'suspension',
    image: '/mrc_suspension_1779380563262.png',
    truckType: 'Cavalo Mecânico Trucado 6x4'
  },
  {
    id: 'g3',
    title: 'Mapeamento Completo de Sensores Arla-32 & NOx',
    description: 'Diagnóstico computadorizado avançado por osciloscópio multicanal na rede CAN-bus do catalisador SCR. Limpeza química de injetor de uréia cristalizado com ultrassom e troca de sensor NOx duplo.',
    category: 'diagnostic',
    image: '/mrc_diagnostic_1779380521458.png',
    truckType: 'M-Benz Axor / Actros'
  },
  {
    id: 'g4',
    title: 'Manutenção Preventiva Geral de Caixa Automatizada I-Shift',
    description: 'Substituição preventiva do dumper amortecedor, atuador pneumático de embreagem e lubrificante sintético específico de alto rendimento. Calibração de engate fino via computador de bordo.',
    category: 'preventive',
    image: '/mrc_hero_diesel_1779380499996.png',
    truckType: 'Volvo FH 540 Pesado'
  }
];

export default function ServiceGallery() {
  const [filter, setFilter] = useState<'all' | 'preventive' | 'complex' | 'diagnostic' | 'suspension'>('all');

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const filterButtons = [
    { value: 'all', label: 'Todos os Serviços' },
    { value: 'preventive', label: 'Preventiva Express' },
    { value: 'complex', label: 'Motores & Câmbios' },
    { value: 'diagnostic', label: 'Diagnósticos Injeção' },
    { value: 'suspension', label: 'Freios & Suspensão' }
  ] as const;

  return (
    <section id="galeria" className="py-24 bg-slate-950 border-t border-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-10 w-[200px] h-[200px] rounded-full bg-slate-800/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Gallery Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="text-left max-w-2xl">
            <span className="text-amber-500 uppercase font-mono text-xs tracking-widest block mb-2 font-bold flex items-center gap-2">
              <Camera className="w-4 h-4" /> TRABALHOS RECENTES NA MRC
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
              Galeria de Serviços Realizados
            </h2>
            <p className="text-slate-400 mt-2 font-sans text-sm">
              Conheça alguns dos consertos estruturais, preventivos e diagnósticos finalizados em nosso pátio. Qualidade artesanal com precisão técnica mecânica pesada.
            </p>
          </div>

          {/* Desktop/Tablet Buttons */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2.5 rounded text-xs font-mono font-bold tracking-wider transition-all border ${
                  filter === btn.value
                    ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Gallery List Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={item.id}
                className="bg-slate-900 rounded-xl border border-slate-800/80 overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="relative group overflow-hidden bg-slate-950 aspect-[16/10]">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-slate-950/80 border border-slate-800 backdrop-blur px-3 py-1 rounded text-[10px] font-mono font-bold text-amber-500 uppercase">
                    {item.truckType}
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-65 pointer-events-none" />
                </div>

                {/* Info box content */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                      {item.category === 'preventive' && 'Manutenção Preventiva'}
                      {item.category === 'complex' && 'Reparos Estruturais Complexos'}
                      {item.category === 'diagnostic' && 'Injeção Eletrônica e Scanner'}
                      {item.category === 'suspension' && 'Molas, Freios e Suspensão'}
                    </span>
                    <h3 className="text-white font-display font-bold text-lg leading-snug mt-1.5 group-hover:text-amber-400">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-850 flex items-center justify-between text-xs font-mono text-slate-500 mt-auto">
                    <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                      <Check className="w-4 h-4" /> SERVIÇO CONCLUÍDO
                    </span>
                    <span>GARANTIA MRC</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
