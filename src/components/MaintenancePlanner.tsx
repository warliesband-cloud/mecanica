import { useState } from 'react';
import { Calendar, CheckSquare, Sparkles, Filter, Wrench, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface MaintenanceChecklist {
  title: string;
  items: { task: string; urgency: 'urgente' | 'preventivo' | 'inspecao'; interval: string }[];
  summary: string;
}

const planTemplates: Record<string, Record<string, MaintenanceChecklist>> = {
  leve: {
    baixo: {
      title: 'Plano Slim Leve (Até 50.000 km) - Vans e Pickups',
      summary: 'Recomendado para veículos comerciais leves de circulação urbana e entregas rápidas diárias com baixa quilometragem relativa.',
      items: [
        { task: 'Substituição do lubrificante mineral/sintético diesel e filtro de óleo', urgency: 'urgente', interval: 'A cada 10.000 km' },
        { task: 'Substituição do filtro de combustível primário e secundário', urgency: 'urgente', interval: 'A cada 10.000 km' },
        { task: 'Inspeção visual de vazamentos nas mangueiras da turbina', urgency: 'inspecao', interval: 'Preventiva' },
        { task: 'Drenagem de água do filtro separador Racor', urgency: 'preventivo', interval: 'Mensal ou a cada 5.000 km' },
        { task: 'Rodízio de pneus e lubrificação geral dos cardans de tração', urgency: 'preventivo', interval: 'A cada 10.000 km' }
      ]
    },
    medio: {
      title: 'Plano Intermediário Leve (50.000 a 150.000 km)',
      summary: 'Intervalo ideal para monitorar fadiga precoce de componentes de injeção direta de alta pressão urbana.',
      items: [
        { task: 'Limpeza térmica química da válvula EGR e coletor de admissão', urgency: 'preventivo', interval: 'A cada 40.000 km' },
        { task: 'Substituição do jogo de correia dentada/acessórios e tensores', urgency: 'urgente', interval: 'A cada 60.000 km' },
        { task: 'Regulagem mecânica de folga de válvulas do cabeçote', urgency: 'preventivo', interval: 'A cada 50.000 km' },
        { task: 'Teste de retorno volumétrico computadorizado dos bicos injetores', urgency: 'inspecao', interval: 'A cada 50.000 km' },
        { task: 'Substituição das pastilhas e discos de freios hidráulicos pneumáticos', urgency: 'urgente', interval: 'Fadiga por desgaste' }
      ]
    },
    alto: {
      title: 'Plano Overhaul Comercial Leve (+150.000 km)',
      summary: 'Inspeções profundas para restaurar compressão estequiométrica original de propulsão diesel.',
      items: [
        { task: 'Revisão profunda da turbina de geometria variável (VGT)', urgency: 'urgente', interval: 'Inspeção Completa' },
        { task: 'Substituição preventiva das correntes de sincronismo de comando', urgency: 'urgente', interval: 'A cada 120.000 km' },
        { task: 'Descarbonização física total do filtro DPF de gases de escape', urgency: 'preventivo', interval: 'A cada 80.000 km' },
        { task: 'Troca do óleo de transmissão mecânica e do eixo diferencial traseiro', urgency: 'urgente', interval: 'Regulamento rígido' }
      ]
    }
  },
  pesado: {
    baixo: {
      title: 'Plano Frota Pesada Inicial (Até 100.000 km) - Cavalos Mecânicos',
      summary: 'Preserva a durabilidade crítica de motores de alta cilindrada (11L a 13L) de viagens logísticas rodoviárias de longo curso.',
      items: [
        { task: 'Troca de lubrificante pesado de alta estabilidade e filtros triplos', urgency: 'urgente', interval: 'A cada 20.000 km (Uso Severo)' },
        { task: 'Substituição de cartucho do secador de ar do sistema pneumático (APU)', urgency: 'urgente', interval: 'A cada 40.000 km' },
        { task: 'Verificação do nível e densidade fluido estabilizador Arla-32', urgency: 'inspecao', interval: 'A cada viagem' },
        { task: 'Lubrificação forçada de eixos de tração de manga de eixo e quinta roda', urgency: 'preventivo', interval: 'A cada 5.000 km' }
      ]
    },
    medio: {
      title: 'Plano Master Rodoviário (100.000 a 300.000 km)',
      summary: 'Manutenções estratégicas que evitam interrupções catastróficas em rodovia de carga indivisível.',
      items: [
        { task: 'Regulagem das folgas de válvulas e freio motor eletrônico (VEB/Jake)', urgency: 'preventivo', interval: 'A cada 100.000 km' },
        { task: 'Substituição do aditivo arrefecedor de tecnologia carboxílica', urgency: 'urgente', interval: 'Anual ou a cada 150.000 km' },
        { task: 'Aferição de desgaste das bronzinas de biela por coleta de óleo de cárter', urgency: 'inspecao', interval: 'A cada 100.000 km' },
        { task: 'Substituição total de correias do compressor e alternador de carga', urgency: 'urgente', interval: 'A cada 80.000 km' }
      ]
    },
    alto: {
      title: 'Plano Extremo Linha Pesada (+300.000 km)',
      summary: 'Foco em longevidade do motor diesel de até 1 milhão de km sem quebras.',
      items: [
        { task: 'Revisão e limpeza de bicos injetores eletrônicos Bosch / Cummins', urgency: 'urgente', interval: 'Aferição Estrita' },
        { task: 'Substituição preventiva da bomba d\'água principal e termostatos', urgency: 'urgente', interval: 'A cada 250.000 km' },
        { task: 'Remoção química e lavagem térmica reversa de DPF carbonizado', urgency: 'preventivo', interval: 'A cada 150.000 km' },
        { task: 'Ajuste de rolamentos de rodas pesadas dianteiras e traseiras', urgency: 'inspecao', interval: 'A cada 120.000 km' }
      ]
    }
  }
};

export default function MaintenancePlanner() {
  const [vehicleType, setVehicleType] = useState<'leve' | 'pesado'>('pesado');
  const [mileageTier, setMileageTier] = useState<'baixo' | 'medio' | 'alto'>('medio');

  const activePlan = planTemplates[vehicleType][mileageTier];

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(215,150,20,0.02)_0%,transparent_70%) pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text details */}
          <div className="lg:col-span-4 text-left">
            <span className="text-amber-500 uppercase font-mono text-xs tracking-widest block mb-2 font-bold flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-500" /> CUIDADO PREVENTIVO INTELIGENTE
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
              Calculadora de Manutenção Preventiva
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed font-sans text-sm">
              Um caminhão parado gera faturamento zero. Prevenir é dez vezes mais barato do que socorrer na rodovia. 
            </p>
            <p className="text-slate-400 mt-3 leading-relaxed font-sans text-sm">
              Selecione as especificações do seu veículo ao lado para descobrir quais intervenções técnicas imediatas são recomendadas pela engenharia diesel.
            </p>

            <div className="mt-8 p-4 bg-slate-950/80 border border-slate-800 rounded-lg flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
              <div className="text-xs">
                <span className="text-white font-bold font-mono block uppercase">Arla 32 & Aditivos</span>
                <span className="text-slate-400 mt-1 block">A quebra mecânica do filtro DPF por falta de manutenção de arrefecimento pode reduzir a vida útil do turbo compressor em até 70%.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction form and template display */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Configuration selection card */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 shadow-lg text-left">
              <div className="grid sm:grid-cols-2 gap-6 pb-6 border-b border-slate-800/60">
                {/* Vehicle Choice */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 font-bold">Tipo de Frota Diesel</label>
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setVehicleType('leve')}
                      className={`flex-1 py-3 px-4 rounded text-xs font-bold font-mono tracking-wider transition-all border ${
                        vehicleType === 'leve'
                          ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-705'
                      }`}
                    >
                      🚒 LEVE / VAN / PICKUP
                    </button>
                    <button
                      onClick={() => setVehicleType('pesado')}
                      className={`flex-1 py-3 px-4 rounded text-xs font-bold font-mono tracking-wider transition-all border ${
                        vehicleType === 'pesado'
                          ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-705'
                      }`}
                    >
                      🚛 PESADO / CARRETA
                    </button>
                  </div>
                </div>

                {/* Mileage choice */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 font-bold">Quilometragem Atualizada</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMileageTier('baixo')}
                      className={`flex-1 py-3 rounded text-xs font-bold font-mono transition-colors border ${
                        mileageTier === 'baixo'
                          ? 'bg-slate-900 border-amber-500 text-white font-bold'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {vehicleType === 'leve' ? 'Até 50k km' : 'Até 100k km'}
                    </button>
                    <button
                      onClick={() => setMileageTier('medio')}
                      className={`flex-1 py-3 rounded text-xs font-bold font-mono transition-colors border ${
                        mileageTier === 'medio'
                          ? 'bg-slate-900 border-amber-500 text-white font-bold'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {vehicleType === 'leve' ? '50k - 150k' : '100k - 300k'}
                    </button>
                    <button
                      onClick={() => setMileageTier('alto')}
                      className={`flex-1 py-3 rounded text-xs font-bold font-mono transition-colors border ${
                        mileageTier === 'alto'
                          ? 'bg-slate-900 border-amber-500 text-white font-bold'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {vehicleType === 'leve' ? '+150k km' : '+300k km'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checklist rendering area */}
              <div className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <h3 className="font-display font-bold text-white text-base sm:text-lg tracking-tight uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                    {activePlan.title}
                  </h3>
                  <span className="bg-amber-950/60 text-amber-400 border border-amber-500/35 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider">
                    RECOMENDAÇÃO MRC
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm font-sans mb-6 leading-relaxed bg-slate-900/30 p-4 rounded-lg border border-slate-900">
                  {activePlan.summary}
                </p>

                <div className="flex flex-col gap-3">
                  {activePlan.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-900/80 border border-slate-850 rounded flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-start gap-3 text-left">
                        <div className="mt-0.5">
                          {item.urgency === 'urgente' && <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />}
                          {item.urgency === 'preventivo' && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />}
                          {item.urgency === 'inspecao' && <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />}
                        </div>
                        <div>
                          <p className="text-white font-sans font-medium line-clamp-2 sm:line-clamp-none">{item.task}</p>
                          <span className="text-[10px] uppercase font-mono font-bold mt-1 inline-block text-slate-500">Classificação técnica: {item.urgency}</span>
                        </div>
                      </div>
                      <span className="bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[10px] px-2.5 py-1 rounded shrink-0 uppercase tracking-widest font-semibold">
                        {item.interval}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Integration Trigger CTA */}
                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-800 gap-4">
                  <div className="text-left">
                    <span className="text-white font-bold text-xs">Identificou itens pendentes no seu veículo?</span>
                    <span className="text-slate-400 text-xs block mt-1">Nossos técnicos estão prontos para efetuar a troca expressa de fluidos e inspeção geral.</span>
                  </div>
                  <a
                    href={`https://wa.me/5521970434039?text=Ol%C3%A1+MRC%2C+gostaria+de+realizar+a+manuten%C3%A7%C3%A5o+preventiva+do+meu+caminh%C3%A3o+com+base+no+plano+pesado+ou+leve.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider font-mono rounded inline-flex items-center gap-1.5 transition-colors uppercase shrink-0"
                  >
                    <Calendar className="w-4 h-4" /> Solicitar este plano
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
