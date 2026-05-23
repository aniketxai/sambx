import { motion } from 'framer-motion';
import { Printer, Zap, Cog, Navigation, PenTool, Box, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BlurBlob from '../components/BlurBlob';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { services } from '../data/products';

const iconMap = { Printer, Zap, Cog, Navigation, PenTool, Box };

export default function Services() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <BlurBlob className="w-56 h-56 sm:w-96 sm:h-96 -top-20 right-0 bg-secondary-container" />
      <BlurBlob className="w-36 h-36 sm:w-56 sm:h-56 bottom-40 -left-20 bg-accent-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="What We Do"
          title="Engineering Services"
          description="Quick services."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Cog;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-surface-container rounded-3xl p-8 hover:shadow-lg transition-material group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-material" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-material">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-foreground text-xl mb-3">{service.title}</h3>
                  <p className="text-secondary-text text-sm leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {service.features.map(f => (
                      <span key={f} className="text-xs bg-background px-3 py-1.5 rounded-full text-secondary-text">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button variant="ghost" size="sm" icon={ArrowRight}>
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process section */}
        <SectionHeading
          label="Our Process"
          title="How We Work"
          description="Simple steps."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Consult', desc: 'Share your idea.' },
            { step: '2', title: 'Build', desc: 'We prep the file.' },
            { step: '3', title: 'Deliver', desc: 'Printed and shipped.' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface-container rounded-3xl p-8 text-center"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-4">
                {item.step}
              </span>
              <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
              <p className="text-secondary-text text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
