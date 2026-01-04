import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Lightbulb, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            About SAMBX
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Pioneering the future of AI, computer vision, and smart hardware
            engineering
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What is SAMBX?
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                SAMBX is a technology innovation company specializing in
                artificial intelligence, computer vision, and smart hardware
                solutions. We bridge the gap between cutting-edge research and
                practical applications, delivering products and services that
                solve real-world problems.
              </p>
              <p className="text-muted-foreground text-lg mb-4">
                Our expertise spans from developing sophisticated AI algorithms
                for image processing to designing custom PCBs and embedded
                systems. We combine software intelligence with hardware
                capability to create integrated solutions that are greater than
                the sum of their parts.
              </p>
              <p className="text-muted-foreground text-lg">
                Whether it's building autonomous systems, creating smart IoT
                devices, or developing industrial vision solutions, we bring a
                unique blend of theoretical knowledge and practical engineering
                experience to every project.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 animate-glow" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mission</h3>
                <p className="text-muted-foreground">
                  To democratize access to advanced AI and hardware technology
                  by creating innovative, reliable, and accessible solutions
                  that empower businesses and individuals to achieve more.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Vision</h3>
                <p className="text-muted-foreground">
                  To become a leading force in intelligent hardware innovation,
                  where AI-powered devices seamlessly integrate into everyday
                  life, making technology more intuitive and impactful.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Values</h3>
                <p className="text-muted-foreground">
                  Innovation, quality, and customer success drive everything we
                  do. We believe in open collaboration, continuous learning,
                  and delivering solutions that exceed expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Founder
            </h2>
            <p className="text-muted-foreground text-lg">
              Driving innovation in AI and hardware engineering
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 aspect-square md:aspect-auto" />
              <div className="md:col-span-2 p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Aniket Singh
                </h3>
                <p className="text-primary font-mono mb-4">@aniketxai</p>
                <p className="text-muted-foreground mb-4">
                  Founder & Lead Engineer
                </p>
                <p className="text-muted-foreground mb-6">
                  Aniket is an AI/ML engineer with a passion for bridging the
                  gap between artificial intelligence and physical hardware. With
                  expertise spanning computer vision, embedded systems, and PCB
                  design, he leads SAMBX in creating innovative solutions that
                  combine software intelligence with hardware capability.
                </p>
                <p className="text-muted-foreground mb-6">
                  His work focuses on making advanced AI accessible through
                  edge computing solutions, developing custom hardware for
                  specific applications, and pushing the boundaries of what's
                  possible with intelligent systems.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              Technical skills that power innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">AI & Machine Learning</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Computer Vision & Image Processing</li>
                <li>• Deep Learning (CNN, YOLO, Transformers)</li>
                <li>• Edge AI & Model Optimization</li>
                <li>• Real-time Object Detection & Tracking</li>
                <li>• Neural Network Deployment</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Hardware Engineering</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Custom PCB Design & Layout</li>
                <li>• Embedded Systems Development</li>
                <li>• IoT Device Architecture</li>
                <li>• Sensor Integration</li>
                <li>• Power Electronics Design</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Software Development</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Firmware Development (C/C++, Python)</li>
                <li>• Web Application Development</li>
                <li>• Real-time Systems Programming</li>
                <li>• API Design & Integration</li>
                <li>• Database Architecture</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">System Integration</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Cloud & Edge Computing</li>
                <li>• Industrial Automation</li>
                <li>• Wireless Communication (WiFi, BLE, LoRa)</li>
                <li>• Data Acquisition & Processing</li>
                <li>• System Testing & Validation</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Ready to bring your next big idea to life? We're here to help you
            turn concepts into reality.
          </p>
          <Link href="/contact">
            <Button size="lg" className="text-lg">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
