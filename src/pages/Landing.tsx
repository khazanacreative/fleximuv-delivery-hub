
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Truck, Users, MessageCircle, SmartphoneNfc } from 'lucide-react';
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
              Simplified <span className="text-fleximov-500">UMKM</span> Delivery Management
            </h1>
            <p className="text-xl text-muted-foreground">
              Helping small and medium enterprises manage orders and deliveries without changing your existing workflow.
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
            <div className="relative bg-white border rounded-lg shadow-lg p-4">
              <div className="aspect-[4/3] rounded-md flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526367790999-0150d0a71472?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                  alt="Delivery driver in Surabaya" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why UMKM Choose Fleximov</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Keep Using WhatsApp",
                description: "Continue using WhatsApp as your primary communication tool while gaining delivery management features.",
                icon: <MessageCircle className="h-10 w-10 text-fleximov-500" />
              },
              {
                title: "Simple Order Management",
                description: "Easily manage orders, assign drivers, and track deliveries without complex technical knowledge.",
                icon: <Package className="h-10 w-10 text-fleximov-500" />
              },
              {
                title: "Flexible Driver Options",
                description: "Use your own drivers or request drivers from our network when you need extra delivery capacity.",
                icon: <Truck className="h-10 w-10 text-fleximov-500" />
              }
            ].map((feature, i) => (
              <div key={i} className="border rounded-lg p-6 hover:shadow-md transition-shadow text-left">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-fleximov-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">For Every User's Needs</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Fleximov is designed for every participant in the delivery ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                role: "UMKM Owner",
                description: "Manage your orders and deliveries in one place while keeping your existing WhatsApp workflow.",
                benefits: [
                  "Track all orders in real-time",
                  "Access delivery driver network",
                  "Simple financial reporting",
                  "No technical expertise required"
                ]
              },
              {
                role: "Admin Staff",
                description: "Organize and track orders efficiently without juggling multiple platforms.",
                benefits: [
                  "Bulk order management",
                  "Easy driver assignments",
                  "Customer communication logs",
                  "Delivery status updates"
                ]
              },
              {
                role: "Delivery Driver",
                description: "Get clear delivery instructions and optimize your routes for maximum efficiency.",
                benefits: [
                  "Clear delivery instructions",
                  "Route optimization",
                  "Delivery history tracking",
                  "Seamless payment processing"
                ]
              },
              {
                role: "Customer",
                description: "Track your orders in real-time and communicate easily with both merchant and driver.",
                benefits: [
                  "Real-time order tracking",
                  "Delivery notifications",
                  "Easy communication channels",
                  "Order history and receipts"
                ]
              }
            ].map((userRole, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border text-left">
                <h3 className="text-xl font-semibold mb-3">{userRole.role}</h3>
                <p className="text-muted-foreground mb-4">{userRole.description}</p>
                <h4 className="font-medium mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {userRole.benefits.map((benefit, j) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <span className="text-fleximov-500 text-lg leading-none">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UMKM Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Made for UMKM Business Needs</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform integrates with your existing workflows to make delivery management easier.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Keep Using WhatsApp",
                description: "Continue communicating with customers and drivers through WhatsApp while managing everything in one place."
              },
              {
                title: "No Technical Expertise Required",
                description: "Simple, intuitive interface designed for business owners, not tech experts."
              },
              {
                title: "Pay-as-You-Go",
                description: "Affordable pricing model that grows with your business needs."
              },
              {
                title: "Digitize Without Disruption",
                description: "Gradually transition to digital management while maintaining your familiar processes."
              },
              {
                title: "Multi-Service Support",
                description: "From pharmacy deliveries to school shuttles and UMKM services - we support various delivery types."
              },
              {
                title: "Access to Driver Network",
                description: "Request additional drivers during peak times without maintaining a large permanent team."
              }
            ].map((benefit, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border text-left">
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-fleximov-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What UMKM Owners Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Bambang Suprapto",
                role: "Owner, Apotek Sehat Jaya",
                testimonial: "With Fleximov, we still use WhatsApp to talk to customers, but now we have a system to track orders and deliveries. It's simple but powerful."
              },
              {
                name: "Dewi Kartika",
                role: "Manager, Pasar Turi Delivery",
                testimonial: "The ability to request additional drivers during busy periods has helped us scale our business without the overhead of hiring full-time staff."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white border rounded-lg p-6 shadow-sm text-left">
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
          <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Delivery Operations?</h2>
          <p className="text-fleximov-100 max-w-2xl mx-auto mb-8">
            Join small and medium businesses who are using Fleximov Delivery Hub to manage orders and deliveries while maintaining their familiar workflows.
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
            <div className="md:w-1/3 text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-fleximov-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">FM</span>
                </div>
                <span className="font-semibold text-white">Fleximov</span>
              </div>
              <p className="text-sm">
                The complete delivery management platform designed for UMKM business needs, integrating with your existing workflows.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
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
