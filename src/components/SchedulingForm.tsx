import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, User, Phone, Truck, Layers, MessageSquare, Check, RefreshCw, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SchedulingForm() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    truckModel: '',
    licensePlate: '',
    serviceType: 'preventive' as Appointment['serviceType'],
    date: '',
    timeSlot: '08:00 - 10:00',
    notes: ''
  });
  const [justScheduled, setJustScheduled] = useState<Appointment | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mrc_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing appointments', err);
      }
    }
  }, []);

  const saveAppointments = (newAppts: Appointment[]) => {
    setAppointments(newAppts);
    localStorage.setItem('mrc_appointments', JSON.stringify(newAppts));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone || !formData.date) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newAppt: Appointment = {
      id: 'appt_' + Math.random().toString(36).substr(2, 9),
      clientName: formData.clientName,
      phone: formData.phone,
      truckModel: formData.truckModel,
      licensePlate: formData.licensePlate.toUpperCase(),
      serviceType: formData.serviceType,
      date: formData.date,
      timeSlot: formData.timeSlot,
      notes: formData.notes,
      status: 'pending' as const
    };

    const updated = [newAppt, ...appointments];
    saveAppointments(updated);
    setJustScheduled(newAppt);

    // Reset Form except standard contact info for recurring convenience
    setFormData((prev) => ({
      ...prev,
      truckModel: '',
      licensePlate: '',
      serviceType: 'preventive',
      date: '',
      notes: ''
    }));
  };

  const deleteAppointment = (id: string) => {
    const filtered = appointments.filter((appt) => appt.id !== id);
    saveAppointments(filtered);
    if (justScheduled?.id === id) {
      setJustScheduled(null);
    }
  };

  const serviceLabels: Record<Appointment['serviceType'], string> = {
    preventive: 'Manutenção Preventiva',
    corrective: 'Reparo Corretivo Complexo',
    diagnostic: 'Diagnóstico Eletrônico',
    'heavy-engine': 'Revisão de Motor / Câmbio',
    'suspension-brakes': 'Suspensão, Direção e Freios'
  };

  const formatWhatsAppLink = (appt: Appointment) => {
    const formattedDate = appt.date.split('-').reverse().join('/');
    const message = `Olá MRC! Acabei de fazer um agendamento online pelo site:\n\n*Cliente:* ${appt.clientName}\n*Telefone:* ${appt.phone}\n*Veículo:* ${appt.truckModel || 'Não especificado'} ${appt.licensePlate ? `(Placa: ${appt.licensePlate})` : ''}\n*Serviço:* ${serviceLabels[appt.serviceType]}\n*Horário:* Dia ${formattedDate} às ${appt.timeSlot}\n${appt.notes ? `*Observações:* ${appt.notes}` : ''}\n\nGostaria de confirmar minha vaga. Obrigado!`;
    return `https://wa.me/5521970434039?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="agendamento" className="py-24 bg-slate-900 border-t border-slate-950 relative overflow-hidden">
      <div className="absolute top-[20%] right-[1%] w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side Info Bullet List */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6">
            <div>
              <span className="text-amber-500 uppercase font-mono text-xs tracking-widest block mb-1 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> COMPROMISSO DE AGILIDADE
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                Agendamento de Serviços Online
              </h2>
              <p className="text-slate-400 mt-4 leading-relaxed font-sans text-sm sm:text-base">
                Fazer o agendamento prévio acelera sua triagem. Estacionando o truck no horário reservado, iniciamos a leitura de scanner em até 15 minutos.
              </p>
            </div>

            <div className="flex flex-col gap-4 font-sans text-sm">
              <div className="p-4 bg-slate-950/60 border border-slate-805/40 rounded-lg flex gap-3.5">
                <div className="h-9 w-9 bg-slate-900 border border-slate-800 text-amber-500 shrink-0 flex items-center justify-center font-bold text-sm rounded font-mono">1</div>
                <div>
                  <h4 className="text-white font-semibold">Informe os Sintomas do Caminhão</h4>
                  <p className="text-slate-400 text-xs mt-1">Preencha os dados do condutor e do caminhão no painel ao lado para registrar sua entrada.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-805/40 rounded-lg flex gap-3.5">
                <div className="h-9 w-9 bg-slate-900 border border-slate-800 text-amber-500 shrink-0 flex items-center justify-center font-bold text-sm rounded font-mono">2</div>
                <div>
                  <h4 className="text-white font-semibold">Selecione seu Dia e Horário</h4>
                  <p className="text-slate-400 text-xs mt-1">Escolha a data mais propícia para descarregar ou parar a rota e agende o horário express.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-805/40 rounded-lg flex gap-3.5 border-l-2 border-l-emerald-500">
                <div className="h-9 w-9 bg-slate-900 border border-slate-800 text-emerald-400 shrink-0 flex items-center justify-center font-bold text-sm rounded font-mono">3</div>
                <div>
                  <h4 className="text-white font-semibold flex items-center gap-1.5">
                    Envie Direto para o WhatsApp
                  </h4>
                  <p className="text-slate-400 text-xs mt-1">Logo após enviar pelo site recebemos suas informações. Clique em "Enviar para o WhatsApp" para nossa equipe confirmar na hora.</p>
                </div>
              </div>
            </div>

            {/* List of custom local storage bookings */}
            {appointments.length > 0 && (
              <div className="mt-8 border-t border-slate-800/80 pt-8">
                <h3 className="font-display font-bold text-white text-base mb-4 uppercase flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-500" /> Seus Agendamentos de Entrada
                </h3>
                <div className="flex flex-col gap-4 max-h-[290px] overflow-y-auto pr-2">
                  <AnimatePresence>
                    {appointments.map((appt) => (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        key={appt.id}
                        className="bg-slate-950/90 border border-slate-850 p-4 rounded-lg flex flex-col justify-between gap-3 text-xs font-sans relative hover:border-slate-700 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-mono font-bold bg-slate-900 border border-slate-805 px-2 py-0.5 rounded text-amber-500 uppercase">
                              {serviceLabels[appt.serviceType]}
                            </span>
                            <h4 className="text-white font-bold mt-2 font-display text-sm">{appt.truckModel || 'Veículo não informado'}</h4>
                            <p className="text-slate-400 mt-1">Placa: {appt.licensePlate || 'NÃO INFORMADA'}</p>
                            <p className="text-slate-400 mt-0.5">Agendado em: {appt.date.split('-').reverse().join('/')} às {appt.timeSlot}</p>
                          </div>
                          <button
                            onClick={() => deleteAppointment(appt.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded transition-all"
                            title="Remover Agendamento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex gap-2 mt-2 w-full pt-2.5 border-t border-slate-900">
                          <a
                            href={formatWhatsAppLink(appt)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white font-bold text-[11px] rounded text-center transition-all flex items-center justify-center gap-1.5"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.28 1.48 4.73 1.481 5.425 0 9.85-4.388 9.854-9.785.002-2.615-1.011-5.074-2.853-6.918C16.48 2.087 14.032 1.077 11.53 1.077c-5.429 0-9.857 4.385-9.863 9.786-.002 1.763.479 3.483 1.393 4.965l-.344 1.258-.702 2.56 2.65-.694 1.31-.343z" />
                            </svg>
                            Confirmar via WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Interlocking HTML Form Layout */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-slate-950 p-6 sm:p-8 rounded-xl border border-slate-800 shadow-2xl relative">
              {/* Dynamic Notification Banner for successful slot submissions */}
              <AnimatePresence>
                {justScheduled && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex flex-col sm:flex-row gap-4 items-center sm:justify-between text-left shrink-0 z-10"
                  >
                    <div>
                      <span className="text-emerald-400 font-bold font-mono text-xs flex items-center gap-1">
                        <Check className="w-4 h-4 shrink-0" /> CARGO AGENDADO COM SUCESSO!
                      </span>
                      <p className="text-slate-300 text-xs mt-1 font-sans">
                        Seu horário do dia {justScheduled.date.split('-').reverse().join('/')} às {justScheduled.timeSlot} foi bloqueado.
                      </p>
                    </div>
                    <a
                      href={formatWhatsAppLink(justScheduled)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono rounded inline-flex items-center gap-1.5 shrink-0 transition-colors uppercase shadow"
                    >
                      Solicitar Aprovação
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="flex flex-col gap-6 text-left">
                <div className="grid sm:grid-cols-2 gap-5">
                  
                  {/* Client Name Input */}
                  <div>
                    <label htmlFor="clientName" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      Nome do Motorista ou Frota <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        required
                        value={formData.clientName}
                        onChange={handleInputChange}
                        placeholder="Ex: João da Silva / Transportes Dutra"
                        className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded py-2.5 px-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      WhatsApp para Contato <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (21) 97043-4039"
                        className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded py-2.5 px-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Truck Model Input */}
                  <div>
                    <label htmlFor="truckModel" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      Modelo do Caminhão / Van
                    </label>
                    <div className="relative">
                      <Truck className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        id="truckModel"
                        name="truckModel"
                        value={formData.truckModel}
                        onChange={handleInputChange}
                        placeholder="Ex: Scania R440 / Sprinter 515"
                        className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded py-2.5 px-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* License Plate Input */}
                  <div>
                    <label htmlFor="licensePlate" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      Placa do Veículo (Opcional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-[11px] font-mono text-slate-500 font-bold uppercase">PL</span>
                      <input
                        type="text"
                        id="licensePlate"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        placeholder="Ex: ABC1D23"
                        className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded py-2.5 px-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Type Selection */}
                <div>
                  <label htmlFor="serviceType" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                    Especialidade Principal Desejada
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded py-3 px-3.5 text-sm text-white outline-none transition-all font-sans appearance-none"
                    >
                      <option value="preventive">Manutenção Preventiva Básica / Troca Express</option>
                      <option value="corrective">Reparo Corretivo Estrutural</option>
                      <option value="diagnostic">Rastreamento Diagnóstico Eletrônico Computadorizado</option>
                      <option value="heavy-engine">Retífica Parcial ou Completa de Motor Diesel / Câmbio</option>
                      <option value="suspension-brakes">Revisão de Freio a Ar, Válvulas APU e Suspensão</option>
                    </select>
                    <div className="absolute right-3.5 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Appointment Date Selection */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      Data Escolhida <span className="text-amber-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded py-2.5 px-3.5 text-sm text-white outline-none transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Appointment Time Slot Selection */}
                  <div>
                    <label htmlFor="timeSlot" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                      Período de Atendimento
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 rounded py-3 px-3.5 text-sm text-white outline-none transition-all font-sans appearance-none"
                      >
                        <option value="08:00 - 10:00">Início da manhã (08:00 - 10:00)</option>
                        <option value="10:00 - 12:00">Final da manhã (10:00 - 12:00)</option>
                        <option value="13:30 - 15:30">Início da tarde (13:30 - 15:30)</option>
                        <option value="15:30 - 17:30">Fim de tarde (15:30 - 17:30)</option>
                      </select>
                      <div className="absolute right-3.5 top-4 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
                    </div>
                  </div>
                </div>

                {/* Additional notes/symptoms details */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                    Descreva os Problemas ou Peças que já possui (Opcional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Ex: Trepidação sob frenagem carregado, fumaça excessiva, luz de injeção ligando após aquecer..."
                      className="pl-9 w-full bg-slate-900 border border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded py-2.5 px-3.5 text-sm text-white placeholder-slate-600 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base rounded shadow-xl hover:shadow-amber-500/15 transition-all flex items-center justify-center gap-2 uppercase tracking-wide font-mono"
                >
                  <Calendar className="w-5 h-5 shrink-0" />
                  Agendar vaga online express
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
