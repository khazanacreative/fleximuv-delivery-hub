import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Truck, Users, MessageCircle, SmartphoneNfc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Share2 } from 'lucide-react';

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

      {/* Hero Section with new image */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.pixabay.com/photo/2022/02/25/04/11/traffic-7033509_1280.jpg" 
            alt="Urban traffic" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fleximov-500/30 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">
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
                  src="https://cdn.pixabay.com/photo/2022/02/25/04/11/traffic-7033509_1280.jpg" 
                  alt="Urban traffic scene" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section with Terms and Conditions */}
      <section className="py-16 bg-fleximov-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Multi-User Platform</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform serves different user roles with specific permissions and capabilities
            </p>
          </div>
          
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="fleet">Mitra Armada</TabsTrigger>
              <TabsTrigger value="business">Mitra Bisnis</TabsTrigger>
              <TabsTrigger value="courier">Kurir Mandiri</TabsTrigger>
            </TabsList>
            
            <TabsContent value="admin" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Administrator (Admin)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Administrator memiliki akses penuh ke platform untuk mengelola seluruh operasi.</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Hak dan Akses:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mengelola semua mitra dan kurir</li>
                      <li>Melihat semua pesanan dan transaksi</li>
                      <li>Mengakses laporan keuangan dan analitik</li>
                      <li>Melihat peta lokasi semua kurir secara real-time</li>
                      <li>Mengelola pengaturan sistem</li>
                      <li>Menentukan tarif dan komisi</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Syarat dan Ketentuan:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Wajib menjaga kerahasiaan data pengguna</li>
                      <li>Memastikan layanan tersedia 24/7</li>
                      <li>Bertanggung jawab atas keamanan platform</li>
                      <li>Tidak menyalahgunakan data untuk kepentingan pribadi</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-md text-blue-800 text-sm">
                    <p className="font-medium">Contoh Akun Admin:</p>
                    <p>Email: admin@fleximov.com | Password: password</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fleet" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mitra Armada (Fleet Partner)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Mitra Armada adalah bisnis yang memiliki layanan kurir/armada sendiri dan menggunakan platform ini untuk mengelolanya.</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Hak dan Akses:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mengelola armada kurir sendiri</li>
                      <li>Melihat pesanan dan statusnya</li>
                      <li>Memantau lokasi kurir secara real-time</li>
                      <li>Mengakses laporan keuangan dan pendapatan</li>
                      <li>Mengelola tarif pengiriman</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Syarat dan Ketentuan:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Membayar komisi 10% per transaksi ke platform</li>
                      <li>Menjamin kualitas layanan kurir</li>
                      <li>Memberikan pelatihan kepada kurir</li>
                      <li>Bertanggung jawab atas kehilangan/kerusakan barang</li>
                      <li>Wajib memiliki izin usaha yang sah</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-md text-green-800 text-sm">
                    <p className="font-medium">Contoh Akun Mitra Armada:</p>
                    <p>Email: fleet@partner.com | Password: password</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="business" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mitra Bisnis (Business Partner)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Mitra Bisnis adalah UMKM atau bisnis yang tidak memiliki layanan kurir sendiri dan menggunakan platform untuk mengelola pengiriman.</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Hak dan Akses:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Membuat pesanan pengiriman</li>
                      <li>Melihat status pesanan</li>
                      <li>Memantau lokasi kurir secara real-time</li>
                      <li>Mengakses laporan keuangan dasar</li>
                      <li>Menggunakan link pelacakan untuk pelanggan</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Syarat dan Ketentuan:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Membayar biaya pengiriman sesuai tarif</li>
                      <li>Memberikan informasi pengiriman yang akurat</li>
                      <li>Menyiapkan barang dengan pengemasan yang baik</li>
                      <li>Mematuhi regulasi barang yang dilarang</li>
                      <li>Biaya transaksi 5% per pesanan</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-md text-purple-800 text-sm">
                    <p className="font-medium">Contoh Akun Mitra Bisnis:</p>
                    <p>Email: business@partner.com | Password: password</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courier" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Kurir Mandiri (Independent Courier)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Kurir Mandiri adalah individu yang menawarkan jasa pengiriman melalui platform tanpa terikat dengan mitra armada tertentu.</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Hak dan Akses:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Menerima atau menolak pesanan pengiriman</li>
                      <li>Melihat detail pesanan</li>
                      <li>Memperbarui status pengiriman</li>
                      <li>Mengakses riwayat penghasilan</li>
                      <li>Melihat rute pengiriman</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Syarat dan Ketentuan:</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Membayar komisi 15% ke platform</li>
                      <li>Menyediakan kendaraan sendiri</li>
                      <li>Wajib memiliki SIM dan STNK yang valid</li>
                      <li>Menjaga kualitas layanan</li>
                      <li>Bertanggung jawab atas barang kiriman</li>
                      <li>Mengaktifkan GPS selama bertugas</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-amber-50 rounded-md text-amber-800 text-sm">
                    <p className="font-medium">Contoh Akun Kurir Mandiri:</p>
                    <p>Email: courier@fleximov.com | Password: password</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <h3 className="font-bold text-lg mb-2">Pelanggan Tamu (Guest)</h3>
            <p className="mb-4">Pelanggan dari mitra bisnis dapat melacak pesanan tanpa perlu login menggunakan link pelacakan khusus yang dibagikan oleh mitra.</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Akses Tamu:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Melihat status pesanan tertentu</li>
                <li>Memantau lokasi kurir secara real-time</li>
                <li>Melihat estimasi waktu pengiriman</li>
                <li>Tidak memerlukan registrasi atau login</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Map section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Live Tracking For All Users</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides real-time tracking of all deliveries with an easy-to-use interface
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Stay Updated With Live Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-fleximov-100 p-2 rounded-md text-fleximov-700">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Real-time Location Updates</h4>
                    <p className="text-muted-foreground">Track couriers in real-time on an interactive map</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-fleximov-100 p-2 rounded-md text-fleximov-700">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Courier Status Monitoring</h4>
                    <p className="text-muted-foreground">See courier availability and current delivery status</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-fleximov-100 p-2 rounded-md text-fleximov-700">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Shareable Tracking Links</h4>
                    <p className="text-muted-foreground">Easily share tracking information with customers</p>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/login">
                  <Button>Try Live Tracking Now</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1606166325683-e6deb697d301?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Live tracking map interface" 
                className="w-full h-auto"
              />
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
