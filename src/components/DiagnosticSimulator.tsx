import { useState, useEffect } from 'react';
import { DiagnosticSymptom } from '../types';
import { Code, Thermometer, Radio, Database, RefreshCw, Send, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const symptoms: DiagnosticSymptom[] = [
  {
    id: 's1',
    title: 'Fumaça Negra e Perda de Força com Carga',
    description: 'Caminhão solta fumaça preta sob aceleração moderada e perde torque ao subir aclives, com consumo excessivo de diesel.',
    category: 'engine',
    code: 'SPN 102 - FMI 18 (Pressão do Coletor de Admissão Abaixo do Normal)',
    possibleCauses: [
      'Mangueira do Intercooler rachada ou desconectada',
      'Geometria variável da turbina (VGT) emperrada',
      'Filtro de ar do motor altamente obstruído',
      'EGR obstruída com excesso de fuligem carbonizada'
    ],
    diagnosticTest: 'Medição da curva de pressão de sobrealimentação em aceleração sob carga total e teste mecânico estático de estanqueidade no trocador intercooler.',
    solution: 'Substituição das mangueiras reforçadas do intercooler ou descarbonização detalhada e reaperto do circuito pressurizado de admissão.',
    estimatedTime: '2 a 4 horas'
  },
  {
    id: 's2',
    title: 'Dificuldade na Partida e Falha em Marcha Lenta',
    description: 'Motor demora para pegar na primeira partida do dia e oscila rotação na marcha lenta, quase morrendo quando frio.',
    category: 'injection',
    code: 'SPN 157 - FMI 1 (Pressão do Common Rail Baixa dadas as Condições)',
    possibleCauses: [
      'Desgaste interno excessivo nas agulhas dos bicos injetores',
      'Válvula limitadora de pressão do Rail (PRV) com fuga de retorno',
      'Entrada de ar no circuito de baixa pressão de combustível',
      'Filtro separador de água (Racor) obstruído'
    ],
    diagnosticTest: 'Análise dinâmica do tempo de pressurização do Common Rail durante o arranque e teste volumétrico de retorno de retorno dos bicos injetores.',
    solution: 'Substituição das vedações internas das agulhas injetoras ou troca da válvula de alívio limitadora da régua de distribuição de combustível.',
    estimatedTime: '4 a 6 horas'
  },
  {
    id: 's3',
    title: 'Luz Arla 32 Acesa e Limitação de Torque (Derate)',
    description: 'Painel do caminhão avisa contagem regressiva para limitação severa de potência ativa (derate 60%) e reduz velocidade a 40km/h.',
    category: 'electrical',
    code: 'SPN 3516 - FMI 18 (Concentração de Arla 32 Abaixo da Especificada)',
    possibleCauses: [
      'Arla-32 com concentração incorreta ou adulterado',
      'Cristalização de uréia no bico dosador do injetor SCR',
      'Sensor NOx de entrada ou saída com erro de leitura estática',
      'Filtro de Arla-32 do módulo de dosagem entupido'
    ],
    diagnosticTest: 'Monitoramento dinâmico portátil de eficiência catalítica SCR por refratometria de fluído e teste de ciclo completo de injeção dosadora assistida.',
    solution: 'Limpeza química ultrassônica de bico injetor de Arla-32 cristalizado e recalibração dos sensores digitais de gás NOx.',
    estimatedTime: '3 a 5 horas'
  },
  {
    id: 's4',
    title: 'Motor Falhando (Cilindro Falhando) e Luz EPC / Injeção',
    description: 'Motor treme excessivamente, produzindo ruído metálico forte (batida de pino) e indicando falha de combustão cíclica unilateral.',
    category: 'transmission',
    code: 'SPN 651 - FMI 5 (Circuito do Injetor do Cilindro 1 com Alta Resistência)',
    possibleCauses: [
      'Bobina ou atuador piezoelétrico do injetor avariados',
      'Chicote elétrico dos bicos injetores quebrado sob o cabeçote',
      'Módulo de potência ECU com transistor driver queimado',
      'Fusível do circuito secundário de alimentação aberto'
    ],
    diagnosticTest: 'Varredura de osciloscópio multicanal na fiação sob o cabeçote e teste de resistência ohmica direta comparativa em temperatura de regime do motor.',
    solution: 'Substituição do chicote elétrico multiplexado dos injetores protegido por tampa de válvula ou reparo de bobinas do injetor afetado.',
    estimatedTime: '3 a 6 horas'
  }
];

export default function DiagnosticSimulator() {
  const [selectedId, setSelectedId] = useState<string>('s1');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const selectedSymptom = symptoms.find((s) => s.id === selectedId) || symptoms[0];

  const runScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setLogMessages([]);

    const messages = [
      'ESTABELECENDO COMUNICAÇÃO PROTOCOLO J1939...',
      'VARRENDO MÓDULO CONTROLADOR INTEGRADO DO MOTOR (ECU)...',
      'AFERINDO SENSORES DE TEMPERATURA E PRESSÃO DO COLETOR...',
      'TESTE DE ALIMENTAÇÃO DA BOMBA DOSADORA DE EMISSÕES...',
      'ANÁLISE DE RESISTÊNCIA DA CABLAGEM DOS INJETORES DIESEL...',
      'FALHAS IDENTIFICADAS - CARREGANDO CÓDIGO DA MEMÓRIA FLASH...'
    ];

    let currentMsgIndex = 0;
    const intervalTime = 400;

    const interval = setInterval(() => {
      if (currentMsgIndex < messages.length) {
        setLogMessages((prev) => [...prev, messages[currentMsgIndex]]);
        setScanProgress((prev) => Math.min(prev + 16.6, 100));
        currentMsgIndex++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanProgress(100);
      }
    }, intervalTime);
  };

  useEffect(() => {
    // Run initial scan to display
    runScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const getWhatsAppMessage = (symptom: DiagnosticSymptom) => {
    const text = `Olá MRC! Usei o simulador de diagnóstico e identifiquei que meu caminhão possui o seguinte sintoma:\n\n*Sintoma:* ${symptom.title}\n*Código Identificado:* ${symptom.code}\n*Duração Estimada:* ${symptom.estimatedTime}\n\nGostaria de agendar um diagnóstico real computadorizado na oficina.`;
    return `https://wa.me/5521970434039?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="diagnostico" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-950 relative overflow-hidden">
      {/* Background abstract accents */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 uppercase font-mono text-xs tracking-widest block mb-2 font-bold flex items-center justify-center gap-1.5">
            <Code className="w-4 h-4 text-amber-500" /> CENTRAL COMPUTADORIZADA DE SINTOMAS
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
            Seu Veículo Diesel Apresenta Algum Dsses Falhas?
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed font-sans text-sm sm:text-base">
            Selecione o sintoma que você observa no painel ou no funcionamento do seu caminhão leve ou pesado. Nosso scanner emulador irá detalhar o código de falha padrão ECU e sugerir as correções adequadas.
          </p>
        </div>

        {/* Content Columns: Symptom Selection / Electronic Scanner Interface */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Symptoms list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-left mb-2 pl-1">
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-wider font-semibold">Selecione uma irregularidade:</h3>
            </div>
            <div className="flex flex-col gap-3">
              {symptoms.map((symptom) => {
                const isSelected = symptom.id === selectedId;
                return (
                  <button
                    key={symptom.id}
                    onClick={() => {
                      if (!isScanning) setSelectedId(symptom.id);
                    }}
                    disabled={isScanning}
                    className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/5 translate-x-1'
                        : 'bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
                    } disabled:opacity-75 disabled:cursor-not-allowed`}
                  >
                    <div className={`p-2.5 rounded shrink-0 transition-colors ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}>
                      {symptom.category === 'engine' && <HelpCircle className="w-5 h-5" />}
                      {symptom.category === 'injection' && <Radio className="w-5 h-5" />}
                      {symptom.category === 'electrical' && <Thermometer className="w-5 h-5" />}
                      {symptom.category === 'transmission' && <Database className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-white">{symptom.title}</h4>
                      <p className="text-slate-400 text-xs mt-1.5 font-sans line-clamp-2 md:line-clamp-none">
                        {symptom.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Simulated CRT Tech Diagnostic Scanner Screen */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
              {/* Device Physical Top Bar */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse inline-block" />
                  <span className="text-amber-500 font-bold uppercase tracking-wide">Scanner MRC-V6 Pro (Versão 8.43)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="hidden sm:inline">VEL: 250kbps</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">J1939 LINK</span>
                </div>
              </div>

              {/* Digital Screen Module */}
              <div className="bg-slate-950 p-5 sm:p-6 font-mono text-left max-h-[500px] sm:max-h-[550px] overflow-y-auto relative min-h-[380px] flex flex-col justify-between">
                <div>
                  {/* CRT Screen Scan Line Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none" />

                  {isScanning ? (
                    /* Scanning Animation state */
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <RefreshCw className="w-12 h-12 text-amber-500 animate-spin" />
                      <div className="text-center">
                        <span className="text-amber-500 font-bold text-sm block">COLETANDO DADOS DO CHASSIS...</span>
                        <div className="w-48 bg-slate-900 border border-slate-800 h-2 mt-2.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                        </div>
                      </div>
                      <div className="text-slate-500 text-[11px] font-mono mt-4 flex flex-col gap-1 w-full max-w-md bg-slate-900/40 p-3 rounded border border-slate-900 text-left h-28 overflow-y-auto">
                        {logMessages.map((msg, i) => (
                          <div key={i} className="text-slate-400 truncate">&gt; {msg}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Scan Completed / Ready State */
                    <div className="flex flex-col gap-5">
                      {/* Fault Banner Area */}
                      <div className="bg-red-950/20 border border-red-500/30 p-4 rounded flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-red-400 font-bold uppercase block tracking-wider font-semibold">CÓDIGO DE FALHA ATIVO DE DUPLICIDADE</span>
                          <span className="text-white text-xs sm:text-sm font-bold block mt-0.5 leading-snug">
                            {selectedSymptom.code}
                          </span>
                        </div>
                      </div>

                      {/* Analysis Segment Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mt-2">
                        {/* Causes section */}
                        <div className="bg-slate-900/60 border border-slate-850 p-4 rounded">
                          <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold block border-b border-slate-800 pb-2 mb-2">
                            Causas Prováveis CODES
                          </span>
                          <ul className="flex flex-col gap-2.5">
                            {selectedSymptom.possibleCauses.map((cause, i) => (
                              <li key={i} className="text-[11px] sm:text-xs text-slate-300 leading-normal flex items-start gap-1.5">
                                <span className="text-amber-500 shrink-0">■</span>
                                <span>{cause}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Test action conducted */}
                        <div className="bg-slate-900/60 border border-slate-850 p-4 rounded">
                          <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold block border-b border-slate-800 pb-2 mb-2">
                            Ação de Teste Recomendada
                          </span>
                          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                            {selectedSymptom.diagnosticTest}
                          </p>
                        </div>
                      </div>

                      {/* Proposed Mechanical Repair Solution and Time Estimate */}
                      <div className="bg-slate-900/40 border border-slate-900 p-4 rounded mt-1 border-l-2 border-l-emerald-500">
                        <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-900">
                          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                            ⚙ RESUMO DA REPARAÇÃO SUGERIDA
                          </span>
                          <span className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                            ⏰ Tempo: {selectedSymptom.estimatedTime}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                          {selectedSymptom.solution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Simulated Screen Bottom Control Section */}
                {!isScanning && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-900 w-full justify-between items-center">
                    <button
                      onClick={runScan}
                      className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded hover:bg-slate-900"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-escanear ECU
                    </button>

                    <a
                      href={getWhatsAppMessage(selectedSymptom)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded transition-all max-sm:w-full text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/10"
                    >
                      <Send className="w-4 h-4 fill-current shrink-0" />
                      Enviar Diagnóstico via WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 justify-center text-xs text-slate-500 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              <span>Diagnósticos reais precisam de escaneamento direto por osciloscópio físico na oficina.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
