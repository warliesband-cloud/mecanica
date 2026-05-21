/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import BentoHero from './components/BentoHero';
import TechnicalSpecs from './components/TechnicalSpecs';
import DiagnosticSimulator from './components/DiagnosticSimulator';
import MaintenancePlanner from './components/MaintenancePlanner';
import ServiceGallery from './components/ServiceGallery';
import SchedulingForm from './components/SchedulingForm';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import { motion } from 'motion/react';
import { Shield, Wrench, AlertCircle } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-100 font-sans leading-normal overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* Upper urgent banner for road towing/support */}
      <div className="bg-red-600 text-white font-mono text-center text-[11px] font-bold py-2.5 px-4 hidden sm:flex items-center justify-center gap-2 border-b border-red-700 relative z-50">
        <AlertCircle className="w-3.5 h-3.5 animate-bounce shrink-0" />
        <span>PRECISA DE RETIRO EM RODOVIA OU DIAGNÓSTICO DE EMERGÊNCIA?</span>
        <a 
          href="https://wa.me/5521970434039?text=Urgente%21+Meu+ve%C3%ADculo+parou+e+preciso+de+socorro+em+pista." 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-amber-300 ml-1.5 transition-colors"
        >
          ACESSE SOCORRO RODOVÍRIO IMEDIATO VIA WHATSAPP →
        </a>
      </div>

      {/* Header and navigation layer */}
      <Header />

      {/* Main website layouts */}
      <main>
        {/* Animated slide transitions for visual flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Bento Grid Header Layout matching user screenshot */}
          <BentoHero />
          
          {/* Technical specialization & Diagnostic scanners section */}
          <TechnicalSpecs />

          {/* Interactive OBD-II System Diagnostic Emulation */}
          <DiagnosticSimulator />

          {/* Core Interactive Preventative Maintenance Planner */}
          <MaintenancePlanner />

          {/* Dynamic Filterable Work Portfolio / Service Gallery */}
          <ServiceGallery />

          {/* Interactive online booking scheduler */}
          <SchedulingForm />

          {/* Google Iframe Map coordinates location and hours */}
          <LocationMap />
        </motion.div>
      </main>

      {/* Footer and final contact points */}
      <Footer />
    </div>
  );
}
