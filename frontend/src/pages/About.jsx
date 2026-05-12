import { motion } from 'framer-motion';
import { Cpu, Layers, Rocket, Target } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BlurBlob from '../components/BlurBlob';

export default function About() {
  const values = [
    { icon: Target, title: 'Precision', desc: '0.15mm detail.' },
    { icon: Rocket, title: 'Speed', desc: '48hr average.' },
    { icon: Layers, title: 'Quality', desc: 'Pro-grade hardware.' },
    { icon: Cpu, title: 'Innovation', desc: 'AI × Hardware × Manufacturing.' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <BlurBlob className="w-125 h-125 top-0 -left-40 bg-primary" />
      <BlurBlob className="w-100 h-100 bottom-20 right-0 bg-secondary-container" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Our Story"
          title="Built by Makers, For Makers."
          description="Precision printing."
        />

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface-container rounded-3xl p-8 sm:p-12 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-foreground font-display mb-4">The Forge Story</h3>
              <p className="text-secondary-text leading-relaxed mb-4">
                SAMBX Forge started in 2025 after a HealthHackathon win showed how hard it is to get quality 3D prints in India.
              </p>
              <p className="text-secondary-text leading-relaxed mb-4">
                We built a simple answer: fast, precise, affordable printing.
              </p>
              <p className="text-secondary-text leading-relaxed">
                With Bambu Lab printers and an engineering mindset, we ship across India.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {[
                  { num: '0.05mm', label: 'Layer' },
                  { num: '500mm/s', label: 'Speed' },
                  { num: '180mm', label: 'Build' },
                  { num: '4', label: 'Materials' },
                ].map(stat => (
                  <div key={stat.label} className="bg-background rounded-2xl p-5 text-center">
                    <p className="text-2xl font-bold text-primary font-display">{stat.num}</p>
                    <p className="text-xs text-outline mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Philosophy */}
        <SectionHeading
          label="Philosophy"
          title="Founder & Values"
          description="A few core values."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-surface-container rounded-3xl p-6 hover:shadow-md transition-material group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-material">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-secondary-text text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-transparent" />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white font-display mb-4">SAMBX Ecosystem</h3>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
              SAMBX Forge is one part of SAMBX — AI × Hardware × Manufacturing from VIT Bhopal.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
