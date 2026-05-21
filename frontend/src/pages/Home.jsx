import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer, Zap, Cog, Navigation, PenTool, Box, ChevronDown, Star, Quote } from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import BlurBlob from '../components/BlurBlob';
import api from '../api';
import { useState, useRef, useEffect } from 'react';

const iconMap = { Printer, Zap, Cog, Navigation, PenTool, Box };

export default function Home() {
  const [homeData, setHomeData] = useState({ featuredProducts: [], services: [], testimonials: [], faqs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.fetchHomeData()
      .then(data => {
        if (active) {
          setHomeData({
            featuredProducts: data.featuredProducts || [],
            services: data.services || [],
            testimonials: data.testimonials || [],
            faqs: data.faqs || [],
          });
        }
      })
      .catch(() => {
        if (active) {
          setHomeData({ featuredProducts: [], services: [], testimonials: [], faqs: [] });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  return (
    <div className="overflow-hidden bg-background text-foreground">
      <HeroSection />
      <SimpleCapabilities />
      <FeaturedProducts products={homeData.featuredProducts} loading={loading} />
      <ServicesSection services={homeData.services} />
      <WorkflowSection />
      <WhyChooseUs />
      <TestimonialsSection testimonials={homeData.testimonials} />
      <FAQSection faqs={homeData.faqs} />
      <CTABanner />
      <BrandClosing />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-8 sm:pt-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(229,232,235,0.08),transparent_30%)]" />
      <div className="absolute inset-0 bg-grid opacity-[0.32]" />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(229, 232, 235, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(229, 232, 235, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-surface-bright/90 bg-primary/15 border border-primary/40 px-4 py-2 rounded-full mb-6">
              Powered by SAMBX
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display leading-[0.95] tracking-tight mb-6 max-w-3xl text-balance"
          >
            Precision Manufacturing for the Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-lg sm:text-xl text-secondary-text leading-relaxed max-w-2xl mb-8"
          >
            Advanced 3D printing, rapid prototyping, robotics components, and intelligent engineering solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link to="/contact">
              <Button size="lg" icon={ArrowRight}>
                Get Custom Quote
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                Shop Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SimpleCapabilities() {
  const capabilities = [
    'PLA',
    'PETG',
    'ABS',
    'TPU',
    'Bambu Lab printers',
    'Pan India Shipping',
    '48hr Turnaround',
    '0.05mm Precision',
    'Engineer Founded',
    'Quality Guaranteed',
  ];

  const scrollerRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (el.scrollWidth <= el.clientWidth) return;

    let rafId = null;
    let last = performance.now();
    let direction = 1; // 1 = forward, -1 = backward
    const speed = 0.03; // px per ms (~30px/s)

    function step(now) {
      const dt = now - last;
      last = now;
      if (!isPausedRef.current) {
        el.scrollLeft += direction * speed * dt;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) direction = -1;
        if (el.scrollLeft <= 0) direction = 1;
      }
      rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    const pause = () => {
      isPausedRef.current = true;
    };
    const resume = () => {
      isPausedRef.current = false;
      last = performance.now();
    };

    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerdown', pause);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('pointerleave', resume);
    el.addEventListener('touchend', resume);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('pointerleave', resume);
      el.removeEventListener('touchend', resume);
    };
  }, [scrollerRef]);

  return (
    <section className="relative py-3 sm:py-4">
      {/* Full-width thin lines at top and bottom */}
      <div className="absolute left-0 right-0 top-0 h-px bg-white/6" />
      <div className="absolute left-0 right-0 bottom-0 h-px bg-white/6" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div
            ref={scrollerRef}
            role="list"
            aria-label="Capabilities"
            className="overflow-x-auto -mx-4 px-4 hide-scrollbar"
          >
            <div className="flex items-center justify-start gap-6 py-2 text-sm text-secondary-text whitespace-nowrap min-w-max">
              {capabilities.map(item => (
                <div key={item} role="listitem" className="inline-flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,106,0,0.65)]" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandClosing() {
  return (
    <section className="pb-16 pt-4 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:pt-8">
          <div className="accent-line mb-2" />
          <p className="text-sm uppercase tracking-[0.3em] text-outline">@sambx.forge</p>
          <h2 className="text-2xl sm:text-3xl font-semibold font-display text-foreground">
            Follow @sambx.forge
          </h2>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ products, loading }) {
  return (
    <section className="pt-8 pb-20 relative">
      <BlurBlob className="w-100 h-100 top-0 right-0 bg-secondary-container" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Featured"
          title="Precision-Crafted Products"
          description="Top picks."
        />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-surface-container h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/products">
            <Button variant="outline" icon={ArrowRight}>
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ services }) {
  return (
    <section className="py-20 bg-surface-container relative">
      <BlurBlob className="w-75 h-75 bottom-0 left-10 bg-accent-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Categories"
          title="What We Print"
          description="Shop by use."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Cog;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-surface-container rounded-3xl p-6 hover:shadow-xl transition-material group"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-material">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{service.title}</h3>
                <p className="text-secondary-text text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map(f => (
                    <span key={f} className="text-xs bg-surface-container px-3 py-1 rounded-full text-secondary-text">
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// function WorkflowSection() {
//   const steps = [
//     { num: '01', title: 'Upload', desc: 'Send STL or idea.' },
//     { num: '02', title: 'Quote', desc: 'Get pricing fast.' },
//     { num: '03', title: 'Pay', desc: 'UPI, card, or COD.' },
//     { num: '04', title: 'Print', desc: 'We make it.' },
//     { num: '05', title: 'Ship', desc: 'Tracked delivery.' },
//   ];

//   return (
//     <section className="py-20 relative">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           label="Process"
//           title="How it Works"
//           description="Five quick steps."
//         />
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//           {steps.map((step, i) => (
//             <motion.div
//               key={step.num}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: i * 0.1 }}
//               className="bg-surface-container rounded-3xl p-6 hover:shadow-md transition-material relative"
//             >
//               <div className="relative min-h-35">
//                 <span className="hidden lg:block absolute -left-6 -top-6 text-[96px] font-bold font-display text-surface-muted opacity-10 pointer-events-none select-none">{step.num}</span>
//                 <h3 className="font-semibold text-foreground text-lg mt-2 mb-2">{step.title}</h3>
//                 <p className="text-secondary-text text-sm leading-relaxed">{step.desc}</p>
//               </div>
//               {i < steps.length - 1 && (
//                 <div className="hidden lg:block absolute top-6 -right-3 w-6">
//                   <ArrowRight size={16} className="text-surface-muted" />
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

function WhyChooseUs() {
  const reasons = [
    { title: 'Bambu Lab printers', desc: '0.05mm precision.' },
    { title: 'Pan India Delivery', desc: 'Tracked shipping.' },
    { title: 'All Materials', desc: 'PLA, PETG, ABS, TPU.' },
    { title: '48hr Turnaround', desc: 'Fast dispatch.' },
    { title: 'Engineer Founded', desc: 'Built by an engineer.' },
    { title: 'Quality Guaranteed', desc: 'Checked twice.' },
  ];

  return (
    <section className="py-20 bg-surface-container relative">
      <BlurBlob className="w-87.5 h-87.5 top-10 right-20 bg-primary" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Why Us"
          title="Why Customers Choose SAMBX Forge"
          description="Short and reliable."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-surface-container rounded-3xl p-6 hover:shadow-md transition-material"
            >
              <h3 className="font-semibold text-foreground text-lg mb-2">{r.title}</h3>
              <p className="text-secondary-text text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Testimonials"
          title="What Customers Say"
          description="A few words from customers."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-surface-container rounded-3xl p-6"
            >
              <Quote size={24} className="text-primary mb-4 opacity-40" />
              <p className="text-foreground text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-outline">{t.role}, {t.company}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="fill-warning text-warning" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 bg-surface-container relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title="Common Questions"
          description="Quick answers."
        />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="bg-surface-container rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span className="font-medium text-foreground text-sm pr-4">{faq.question}</span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-outline shrink-0"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-secondary-text text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20 relative">
      <BlurBlob className="w-125 h-125 top-0 left-1/4 bg-primary" />
      <BlurBlob className="w-75 h-75 bottom-0 right-10 bg-accent-glow" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary rounded-4xl p-10 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-transparent opacity-80" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display mb-4">
              Get a Quote
            </h2>
            <p className="text-white/80 text-base mb-8 max-w-lg mx-auto">
              Send your file. Get a quote.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products">
                <Button variant="secondary" size="lg" icon={ArrowRight}>
                  Submit Quote Request
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border border-white/30 hover:bg-white/10"
                >
                  Chat Directly on WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
