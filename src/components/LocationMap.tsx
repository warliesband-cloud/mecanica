import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function LocationMap() {
  const mapIframeUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.833798018476!2d-43.462123024860404!3d-22.993138379194356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997ffc7984bc55%3A0xa8c19b2a0ac66bb3!2sMRC%20mec%C3%A2nica!5e0!3m2!1spt-BR!2sbr!4v1779397885083!5m2!1spt-BR!2sbr";

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-amber-500 shrink-0" />,
      title: 'Endereço Principal',
      text: 'Rua Palmeira, 65 - Vargem Pequena, Rio de Janeiro - CEP 20972-400'
    },
    {
      icon: <Phone className="w-5 h-5 text-amber-500 shrink-0" />,
      title: 'WhatsApp Técnico',
      text: '(21) 97043-4039'
    },
    {
      icon: <Mail className="w-5 h-5 text-amber-500 shrink-0" />,
      title: 'E-mail Comercial',
      text: 'contato@mrcmecanicadiesel.com.br'
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-500 shrink-0" />,
      title: 'Horário de Atendimento',
      text: 'Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00'
    }
  ];

  return (
    <section id="localizacao" className="py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Address particulars and service quality highlights */}
          <div className="lg:col-span-5 text-left flex flex-col gap-8">
            <div>
              <span className="text-amber-500 uppercase font-mono text-xs tracking-widest block mb-1.5 font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> LOCALIZAÇÃO E CONTATOS
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                Fácil Acesso em Vargem Pequena
              </h2>
              <p className="text-slate-400 mt-4 leading-relaxed font-sans text-sm">
                Nossa oficina está estrategicamente localizada em <strong className="text-slate-300">Vargem Pequena</strong>, com infraestrutura completa e pátio estruturado para receber caminhões, vans, embarcações e frotas leves ou pesadas com o maior conforto e segurança técnica do Rio de Janeiro.
              </p>
            </div>

            {/* List of details card */}
            <div className="flex flex-col gap-5 border-t border-slate-900 pt-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-805 h-fit rounded">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-display text-sm font-semibold uppercase tracking-wide">{info.title}</h4>
                    {info.title === 'WhatsApp Técnico' ? (
                      <a href="https://wa.me/5521970434039" className="text-slate-400 hover:text-amber-400 font-sans text-sm block mt-1 transition-colors leading-relaxed">
                        {info.text} <span className="text-xs text-emerald-500 font-bold ml-1 font-mono">(Clique para conversar)</span>
                      </a>
                    ) : (
                      <p className="text-slate-400 font-sans text-sm mt-1 leading-relaxed">{info.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Core driving safety detail */}
            <div className="bg-slate-905 p-5 border border-slate-900 rounded-lg text-xs leading-normal font-mono flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-slate-400">
                Pátio fechado com vigilância 24h e seguro completo para toda a frota enquanto o seu veículo estiver em manutenção preventiva ou reforma corretiva.
              </div>
            </div>
          </div>

          {/* Right Side: Google Maps embedded iframe and Quick Directions Overlay */}
          <div className="lg:col-span-7 w-full h-[400px] sm:h-[450px] relative rounded-xl overflow-hidden border border-slate-850 shadow-2xl bg-slate-900 group">
            <iframe
              title="Endereço da Oficina MRC no Rio de Janeiro"
              src={mapIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.65) invert(0.9) contrast(1.1) brightness(0.9)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 transition-all duration-550 group-hover:scale-[1.01]"
            />
            {/* Directions absolute anchor badge */}
            <div className="absolute bottom-4 right-4 bg-slate-950/90 border border-slate-800 backdrop-blur px-4 py-3 rounded-lg text-left hidden sm:flex items-center gap-4 shadow-xl z-10 font-mono">
              <div className="text-xs">
                <span className="text-slate-400 text-[10px] block uppercase">Como chegar ao pátio?</span>
                <span className="text-slate-100 font-bold">Rua Palmeira, 65 - Vargem Pequena</span>
              </div>
              <a
                href="https://maps.google.com/?q=Rua%20Palmeira%2065%2C%20Vargem%20Pequena%2C%20Rio%20de%20Janeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors uppercase tracking-widest flex items-center gap-1"
              >
                Traçar Rota
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
