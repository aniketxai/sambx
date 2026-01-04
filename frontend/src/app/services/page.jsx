import ServiceCard from '@/components/service-card';
import { services } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive technology solutions from concept to deployment
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground text-lg">
              A systematic approach to delivering excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description:
                  'Understanding your requirements, challenges, and goals through detailed consultation.',
              },
              {
                step: '02',
                title: 'Design',
                description:
                  'Creating comprehensive technical specifications and system architecture.',
              },
              {
                step: '03',
                title: 'Development',
                description:
                  'Iterative development with regular updates and testing throughout the process.',
              },
              {
                step: '04',
                title: 'Deployment',
                description:
                  'Seamless integration, testing, and launch with ongoing support and optimization.',
              },
            ].map((phase, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="text-4xl font-bold text-primary/20 mb-4">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose SAMBX?
            </h2>
            <p className="text-muted-foreground text-lg">
              Expertise that makes the difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Deep Technical Expertise',
                description:
                  'Years of experience in AI, computer vision, and hardware engineering combined with a passion for innovation.',
              },
              {
                title: 'End-to-End Solutions',
                description:
                  'From initial concept to final deployment, we handle every aspect of your project with attention to detail.',
              },
              {
                title: 'Custom Approach',
                description:
                  'No two projects are the same. We tailor our solutions to your specific needs and constraints.',
              },
              {
                title: 'Cutting-Edge Technology',
                description:
                  'We stay at the forefront of technology trends, bringing the latest innovations to your projects.',
              },
              {
                title: 'Quality Assurance',
                description:
                  'Rigorous testing and validation processes ensure reliable, production-ready solutions.',
              },
              {
                title: 'Ongoing Support',
                description:
                  "Our relationship doesn't end at deployment. We provide continued support and optimization.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Let's discuss how we can help you achieve your goals with
            cutting-edge technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg group">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-lg">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
