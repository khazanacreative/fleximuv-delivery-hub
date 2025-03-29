
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-fleximov-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">FM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">Fleximov</span>
              <span className="text-xs text-muted-foreground -mt-1">Delivery Hub</span>
            </div>
          </div>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-fleximov-50 to-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Delivery Management <span className="text-fleximov-500">Simplified</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A complete delivery management platform for businesses of all sizes in Surabaya and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-fleximov-500/10 rounded-lg transform rotate-3"></div>
            <div className="relative bg-white border rounded-lg shadow-lg p-8">
              <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                <Package size={80} className="text-fleximov-500/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Fleximov?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Multiple User Roles",
                description: "Specialized features for admins, partners, drivers, and customers.",
                icon: <Users className="h-10 w-10 text-fleximov-500" />
              },
              {
                title: "Flexible Delivery Options",
                description: "Support for various delivery types including pharmacy, school shuttles, and UMKM services.",
                icon: <Truck className="h-10 w-10 text-fleximov-500" />
              },
              {
                title: "Secure & Reliable",
                description: "Enterprise-level security with real-time tracking and management.",
                icon: <Shield className="h-10 w-10 text-fleximov-500" />
              }
            ].map((feature, i) => (
              <div key={i} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-fleximov-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Trusted by Businesses in Surabaya</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Bambang Suprapto",
                role: "Owner, Apotek Sehat Jaya",
                testimonial: "Fleximov has transformed our pharmacy delivery operations. Our customers are happier and we're saving on logistics costs."
              },
              {
                name: "Dewi Kartika",
                role: "Manager, Pasar Turi Delivery",
                testimonial: "The driver management system has made it so much easier to coordinate our fleet. We've increased our daily deliveries by 40%."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white border rounded-lg p-6 shadow-sm">
                <p className="italic mb-4">"{testimonial.testimonial}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fleximov-200 flex items-center justify-center">
                    <span className="text-fleximov-700 font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-fleximov-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Delivery Operations?</h2>
          <p className="text-fleximov-100 max-w-2xl mx-auto mb-8">
            Join businesses across Surabaya who are using Fleximov Delivery Hub to streamline their delivery management.
          </p>
          <Link to="/login">
            <Button size="lg" variant="outline" className="bg-white text-fleximov-600 hover:bg-fleximov-50">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-fleximov-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FM</span>
                </div>
                <span className="font-semibold text-white">Fleximov</span>
              </div>
              <p className="text-sm">
                The complete delivery management platform for your business needs in Surabaya and beyond.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-3">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Solutions</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Fleximov Delivery Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
