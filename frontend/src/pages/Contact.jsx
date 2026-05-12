import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BlurBlob from '../components/BlurBlob';
import Button from '../components/Button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <BlurBlob className="w-100 h-100 top-20 -right-20 bg-secondary-container" />
      <BlurBlob className="w-75 h-75 bottom-40 left-0 bg-accent-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Get in Touch"
          title="Contact Us"
          description="Message us. We reply fast."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-surface-container rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">WhatsApp</h3>
                  <p className="text-secondary-text text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">Instagram</h3>
                  <p className="text-secondary-text text-sm">@sambx.forge</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">Email</h3>
                  <p className="text-secondary-text text-sm">forge@sambx.in</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {['4h reply', 'Mon–Sun', '8am–10pm'].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="px-4 h-10 rounded-full bg-surface-container flex items-center justify-center text-outline text-sm font-medium hover:bg-primary hover:text-white transition-material"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-surface-container rounded-3xl p-6 sm:p-8">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success/10 text-success text-sm font-medium px-4 py-3 rounded-2xl mb-6"
                >
                  Message sent successfully. We will get back to you soon.
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-secondary-text mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-secondary-text mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project inquiry"
                  className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-medium text-secondary-text mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 bg-background rounded-t-xl rounded-b-none text-sm text-foreground placeholder:text-outline border-b-2 border-transparent focus:border-primary focus:outline-none transition-material resize-none"
                />
              </div>

              <Button type="submit" size="lg" icon={Send} className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
