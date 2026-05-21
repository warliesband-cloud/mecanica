import { CheckCircle2, Cpu, Zap, Beaker, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

export default function TechnicalSpecs() {
  const specs = [
    {
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      title: 'Diagnóstico Computadorizado Avançado',
      description: 'Varredura completa em tempo real utilizando os escaners multimarcas mais modernos do mercado. Identificamos códigos de falha (DTCs), falhas intermitentes de injeção e parâmetros de sensores instantaneamente.'
    },
    {
      icon: <Beaker className="w-6 h-6 text-amber-500" />,
      title: 'Common Rail & Unidades Injetoras',
      description: 'Bancadas de teste com calibração digital de alta resolução para testar bicos injetores, bombas de alta pressão e válvulas reguladoras dos principais sistemas de injeção diesel.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Tratamento de Emissões (Arla 32)',
      description: 'Especialistas no diagnóstico do sistema Arla 32, sensores NOx, bomba de uréia e filtros de partículas (DPF / SCR), garantindo o caminhão operando sem perda de potência ou consumo elevado.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: 'Regulagem Integrada da Transmissão',
      description: 'Diagnóstico e calibração de câmbios automatizados e embreagens eletrônicas, reduzindo trancos e mitigando desgaste mecânico prematuro de caixas pesadas.'
    }
  ];

  const highlights = [
    'Técnicos certificados de altíssimo nível com treinamento diesel contínuo.',
    'Uso de peças homologadas e certificadas com garantia total de aplicação.',
    'Scanners industriais dedicados compatíveis com Volvo, Scania, Mercedes-Benz, Iveco e Cummins.',
    'Análise microscópica de contaminação e desgaste de fluidos do sistema hidráulico.'
  ];

  return (
    <section id="especialidades" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle details background grid lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16">
          <span className="text-amber-500 uppercase font-mono text-xs tracking-widest block mb-2 font-bold flex items-center gap-2">
            <HeartPulse className="w-4 h-4" /> ALTA TECNOLOGIA APLICADA
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
            Especialistas em Diagnóstico Computadorizado e Mecânica Pesada
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed font-sans">
            Motores diesel modernos operam com altíssima pressão e sofisticados módulos de controle eletrônico. Na MRC, combinamos equipamentos de aferição espacial com o conhecimento prático pesado para entregar de manutenções de rotina a reparos extremos.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Interactive Details and List Info */}
          <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-6">
              {specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 rounded-lg group transition-all text-left"
                >
                  <div className="p-2.5 bg-slate-900 border border-slate-800 group-hover:bg-slate-850 group-hover:border-amber-500/30 rounded w-fit mb-4 transition-all">
                    {spec.icon}
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{spec.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">{spec.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick bullets check badge style */}
            <div className="bg-slate-950/40 border border-slate-850 p-6 rounded-lg text-left">
              <h4 className="font-display font-bold text-amber-500 text-sm uppercase tracking-wider mb-4">Diferenciais que nos tornam referência</h4>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {highlights.map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-sans leading-normal">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Picture demonstrating advanced diagnostic equipment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-4 relative"
          >
            {/* Embedded custom high-voltage design indicators */}
            <div className="absolute top-4 left-4 z-10 bg-slate-950/90 border border-slate-800 backdrop-blur px-3 py-1.5 rounded-md font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              ECU LINK ACTIVE
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-800 aspect-square shadow-2xl bg-slate-950">
              <img
                src="/src/assets/images/mrc_diagnostic_1779380521458.png"
                alt="Scanner de Diagnóstico Eletrônico Cummins de alta performance"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="bg-slate-950/90 border border-slate-850 p-4 rounded-lg flex items-center gap-4 text-left font-mono">
              <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center p-2 bg-slate-900 border border-slate-800 text-amber-500 font-bold rounded">
                OBD
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-sans">Padrão de Conexão</span>
                <span className="text-white font-semibold">SAE J1939 / OBD-II Pesados</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
