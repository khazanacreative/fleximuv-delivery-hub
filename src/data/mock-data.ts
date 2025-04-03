
import { User, Driver, Order, Transaction, ServiceType } from '../types';

// Mock data for users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Bambang Supriatna',
    email: 'bambang@fleximuv.com',
    phone: '+6281234567890',
    role: 'admin',
    avatar: '/avatars/bambang.jpg',
    createdAt: new Date('2024-01-15'),
    balance: 15000000,
    status: 'active'
  },
  {
    id: '2',
    name: 'Hendra Wijaya',
    email: 'hendra@surabayaexpress.com',
    phone: '+6281234567891',
    role: 'partner',
    partnerType: 'fleet',
    hasDrivers: true,
    avatar: '/avatars/hendra.jpg',
    createdAt: new Date('2024-02-10'),
    balance: 5000000,
    status: 'active'
  },
  {
    id: '3',
    name: 'Siti Rahayu',
    email: 'siti@surabayamart.com',
    phone: '+6281234567892',
    role: 'partner',
    partnerType: 'business',
    hasDrivers: false,
    avatar: '/avatars/siti.jpg',
    createdAt: new Date('2024-03-05'),
    balance: 3500000,
    status: 'active'
  },
  {
    id: '4',
    name: 'Agus Santoso',
    email: 'agus@eastjavacourier.com',
    phone: '+6281234567893',
    role: 'partner',
    partnerType: 'courier',
    hasDrivers: true,
    avatar: '/avatars/agus.jpg',
    createdAt: new Date('2024-04-12'),
    balance: 12000000,
    status: 'active'
  },
  {
    id: '5',
    name: 'Budi Setiawan',
    email: 'budi@gmail.com',
    phone: '+6281234567894',
    role: 'driver',
    avatar: '/avatars/budi.jpg',
    createdAt: new Date('2024-05-20'),
    balance: 4500000,
    status: 'active'
  },
  {
    id: '6',
    name: 'Dewi Kartika',
    email: 'dewi@gmail.com',
    phone: '+6281234567895',
    role: 'customer',
    avatar: '/avatars/dewi.jpg',
    createdAt: new Date('2024-06-18'),
    balance: 1500000,
    status: 'active'
  },
  {
    id: '7',
    name: 'Dimas Prasetya',
    email: 'dimas@courier.com',
    phone: '+6281234567800',
    role: 'driver',
    avatar: '/avatars/dimas.jpg',
    createdAt: new Date('2024-06-15'),
    balance: 2800000,
    status: 'active'
  },
  {
    id: '8',
    name: 'Rini Wulandari',
    email: 'rini@fastcourier.id',
    phone: '+6281234567896',
    role: 'partner',
    partnerType: 'courier',
    hasDrivers: true,
    avatar: '/avatars/rini.jpg',
    createdAt: new Date('2024-07-05'),
    balance: 8500000,
    status: 'active'
  },
  {
    id: '9',
    name: 'Eko Purnomo',
    email: 'eko@malangdelivery.com',
    phone: '+6281234567897',
    role: 'partner',
    partnerType: 'fleet',
    hasDrivers: true,
    avatar: '/avatars/eko.jpg',
    createdAt: new Date('2024-07-15'),
    balance: 7200000,
    status: 'active'
  }
];

// Mock data for drivers
export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Budi Setiawan',
    phone: '+6281234567894',
    email: 'budi@gmail.com',
    partnerId: '2',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'L 1234 AB',
    status: 'available',
    completedOrders: 156,
    rating: 4.8,
    balance: 4500000,
    createdAt: new Date('2024-05-20'),
    currentLocation: 'Jl. Raya Darmo No. 45, Surabaya',
    licensePlate: 'L 1234 AB'
  },
  {
    id: '2',
    name: 'Wahyu Pratama',
    phone: '+6281234567896',
    email: 'wahyu@gmail.com',
    partnerId: '2',
    vehicleType: 'Car',
    vehicleNumber: 'L 5678 CD',
    status: 'busy',
    completedOrders: 89,
    rating: 4.5,
    balance: 3200000,
    createdAt: new Date('2024-07-10'),
    currentLocation: 'Jl. Mayjend Sungkono No. 89, Surabaya',
    licensePlate: 'L 5678 CD'
  },
  {
    id: '3',
    name: 'Rina Wati',
    phone: '+6281234567897',
    email: 'rina@gmail.com',
    partnerId: '3',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'L 9012 EF',
    status: 'available',
    completedOrders: 210,
    rating: 4.9,
    balance: 5200000,
    createdAt: new Date('2024-04-15'),
    currentLocation: 'Jl. Gubeng Kertajaya No. 12, Surabaya',
    licensePlate: 'L 9012 EF'
  },
  {
    id: '4',
    name: 'Hendra Gunawan',
    phone: '+6281234567898',
    email: 'hendra@gmail.com',
    partnerId: '3',
    vehicleType: 'Van',
    vehicleNumber: 'L 3456 GH',
    status: 'offline',
    completedOrders: 75,
    rating: 4.6,
    balance: 2800000,
    createdAt: new Date('2024-08-05'),
    currentLocation: 'Jl. Dharmahusada No. 140, Surabaya',
    licensePlate: 'L 3456 GH'
  },
  {
    id: '5',
    name: 'Dimas Prasetya',
    phone: '+6281234567800',
    email: 'dimas@courier.com',
    partnerId: '4',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'L 7890 IJ',
    status: 'available',
    completedOrders: 132,
    rating: 4.7,
    balance: 3800000,
    createdAt: new Date('2024-06-15'),
    currentLocation: 'Jl. Ahmad Yani No. 73, Surabaya',
    licensePlate: 'L 7890 IJ'
  },
  {
    id: '6',
    name: 'Agung Wicaksono',
    phone: '+6281234567899',
    email: 'agung@gmail.com',
    partnerId: '8',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'W 2345 KL',
    status: 'available',
    completedOrders: 98,
    rating: 4.5,
    balance: 2900000,
    createdAt: new Date('2024-07-18'),
    currentLocation: 'Jl. Sudirman No. 25, Malang',
    licensePlate: 'W 2345 KL'
  },
  {
    id: '7',
    name: 'Taufik Rahman',
    phone: '+6281234567900',
    email: 'taufik@gmail.com',
    partnerId: '9',
    vehicleType: 'Car',
    vehicleNumber: 'W 6789 MN',
    status: 'busy',
    completedOrders: 67,
    rating: 4.8,
    balance: 3100000,
    createdAt: new Date('2024-08-02'),
    currentLocation: 'Jl. Soekarno Hatta No. 55, Malang',
    licensePlate: 'W 6789 MN'
  }
];

// Mock data for orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Dewi Kartika',
    customerId: '6',
    partnerId: '2',
    driverId: '1',
    pickupAddress: 'Jl. Darmo Permai V No.12, Surabaya',
    deliveryAddress: 'Jl. Raya Gubeng No.45, Surabaya',
    status: 'completed',
    createdAt: new Date('2025-01-10T08:30:00'),
    completedAt: new Date('2025-01-10T09:45:00'),
    amount: 45000,
    serviceType: 'Food Delivery',
    customer: 'Dewi Kartika',
    date: new Date('2025-01-10T08:30:00'),
    items: ['Nasi Goreng', 'Soto Ayam'],
    driver: 'Budi Setiawan',
    paymentMethod: 'E-Wallet'
  },
  {
    id: 'ORD-002',
    customerName: 'Ahmad Yani',
    customerId: 'CUST-002',
    partnerId: '3',
    driverId: '3',
    pickupAddress: 'Jl. Basuki Rahmat No.8, Surabaya',
    deliveryAddress: 'Jl. Mayjen Sungkono No.89, Surabaya',
    status: 'in_progress',
    createdAt: new Date('2025-01-15T14:15:00'),
    amount: 68000,
    serviceType: 'Package Delivery',
    notes: 'Fragile items inside',
    customer: 'Ahmad Yani',
    date: new Date('2025-01-15T14:15:00'),
    items: ['Large package (3kg)'],
    driver: 'Rina Wati',
    paymentMethod: 'Cash'
  },
  {
    id: 'ORD-003',
    customerName: 'Anita Susanti',
    customerId: 'CUST-003',
    partnerId: '2',
    pickupAddress: 'Jl. Pahlawan No.5, Surabaya',
    deliveryAddress: 'Jl. Raya Kenjeran No.12, Surabaya',
    status: 'pending',
    createdAt: new Date('2025-01-18T17:20:00'),
    scheduledFor: new Date('2025-01-19T10:00:00'),
    amount: 52000,
    serviceType: 'Pharmacy Delivery',
    customer: 'Anita Susanti',
    date: new Date('2025-01-18T17:20:00'),
    items: ['Medicine', 'Medical supplies'],
    paymentMethod: 'E-Wallet'
  },
  {
    id: 'ORD-004',
    customerName: 'Suryadi Gunawan',
    customerId: 'CUST-004',
    partnerId: '4',
    driverId: '2',
    pickupAddress: 'Jl. Diponegoro No.25, Surabaya',
    deliveryAddress: 'Jl. Embong Malang No.50, Surabaya',
    status: 'accepted',
    createdAt: new Date('2025-01-20T19:45:00'),
    amount: 75000,
    serviceType: 'School Shuttle',
    notes: 'Pick up at 6:30 AM',
    customer: 'Suryadi Gunawan',
    date: new Date('2025-01-20T19:45:00'),
    items: ['School transportation'],
    driver: 'Wahyu Pratama',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'ORD-005',
    customerName: 'Dewi Kartika',
    customerId: '6',
    partnerId: '3',
    pickupAddress: 'Jl. Veteran No.15, Surabaya',
    deliveryAddress: 'Jl. Pemuda No.33, Surabaya',
    status: 'pending',
    createdAt: new Date('2025-01-22T08:10:00'),
    amount: 42000,
    serviceType: 'Document Delivery',
    customer: 'Dewi Kartika',
    date: new Date('2025-01-22T08:10:00'),
    items: ['Legal documents'],
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-006',
    customerName: 'Budi Santoso',
    customerId: 'CUST-006',
    partnerId: '8',
    driverId: '6',
    pickupAddress: 'Jl. Ijen No.10, Malang',
    deliveryAddress: 'Jl. Kawi No.24, Malang',
    status: 'completed',
    createdAt: new Date('2025-01-25T10:30:00'),
    completedAt: new Date('2025-01-25T11:45:00'),
    amount: 55000,
    serviceType: 'Food Delivery',
    customer: 'Budi Santoso',
    date: new Date('2025-01-25T10:30:00'),
    items: ['Bakso Malang', 'Es Jeruk'],
    driver: 'Agung Wicaksono',
    paymentMethod: 'E-Wallet'
  },
  {
    id: 'ORD-007',
    customerName: 'Ratna Sari',
    customerId: 'CUST-007',
    partnerId: '9',
    driverId: '7',
    pickupAddress: 'Jl. Semeru No.15, Malang',
    deliveryAddress: 'Jl. Bromo No.30, Malang',
    status: 'in_progress',
    createdAt: new Date('2025-01-28T13:15:00'),
    amount: 62000,
    serviceType: 'Grocery Delivery',
    customer: 'Ratna Sari',
    date: new Date('2025-01-28T13:15:00'),
    items: ['Grocery package (5kg)'],
    driver: 'Taufik Rahman',
    paymentMethod: 'Cash'
  }
];

// Mock data for transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    userId: '2',
    type: 'top_up',
    amount: 2000000,
    description: 'Top up saldo',
    status: 'completed',
    createdAt: new Date('2025-01-05T10:15:00')
  },
  {
    id: 'TRX-002',
    userId: '2',
    type: 'order_payment',
    amount: -45000,
    description: 'Pembayaran pesanan ORD-001',
    status: 'completed',
    createdAt: new Date('2025-01-10T09:46:00'),
    relatedOrderId: 'ORD-001'
  },
  {
    id: 'TRX-003',
    userId: '5',
    type: 'driver_payment',
    amount: 36000,
    description: 'Pembayaran penyelesaian pesanan ORD-001',
    status: 'completed',
    createdAt: new Date('2025-01-10T09:47:00'),
    relatedOrderId: 'ORD-001'
  },
  {
    id: 'TRX-004',
    userId: '3',
    type: 'top_up',
    amount: 1500000,
    description: 'Top up saldo bulanan',
    status: 'completed',
    createdAt: new Date('2025-01-15T14:30:00')
  },
  {
    id: 'TRX-005',
    userId: '6',
    type: 'top_up',
    amount: 100000,
    description: 'Pengisian saldo',
    status: 'completed',
    createdAt: new Date('2025-01-18T16:45:00')
  },
  {
    id: 'TRX-006',
    userId: '1',
    type: 'commission',
    amount: 9000,
    description: 'Komisi dari pesanan ORD-001',
    status: 'completed',
    createdAt: new Date('2025-01-10T09:48:00'),
    relatedOrderId: 'ORD-001'
  },
  {
    id: 'TRX-007',
    userId: '8',
    type: 'order_payment',
    amount: -55000,
    description: 'Pembayaran pesanan ORD-006',
    status: 'completed',
    createdAt: new Date('2025-01-25T11:46:00'),
    relatedOrderId: 'ORD-006'
  },
  {
    id: 'TRX-008',
    userId: '9',
    type: 'top_up',
    amount: 1000000,
    description: 'Top up saldo',
    status: 'completed',
    createdAt: new Date('2025-01-26T09:15:00')
  }
];

// Mock data for service types
export const mockServiceTypes: ServiceType[] = [
  {
    id: '1',
    name: 'Food Delivery',
    description: 'Layanan pengiriman makanan dan minuman',
    basePrice: 15000,
    pricePerKm: 3000,
    icon: 'utensils',
    isActive: true
  },
  {
    id: '2',
    name: 'Package Delivery',
    description: 'Layanan pengiriman paket standar',
    basePrice: 25000,
    pricePerKm: 5000,
    icon: 'box',
    isActive: true
  },
  {
    id: '3',
    name: 'Pharmacy Delivery',
    description: 'Pengiriman obat dan produk kesehatan',
    basePrice: 20000,
    pricePerKm: 4000,
    icon: 'pills',
    isActive: true
  },
  {
    id: '4',
    name: 'School Shuttle',
    description: 'Layanan antar jemput sekolah',
    basePrice: 30000,
    pricePerKm: 6000,
    icon: 'school',
    isActive: true
  },
  {
    id: '5',
    name: 'Document Delivery',
    description: 'Pengiriman dokumen penting',
    basePrice: 18000,
    pricePerKm: 3500,
    icon: 'file',
    isActive: true
  },
  {
    id: '6',
    name: 'Grocery Delivery',
    description: 'Pengiriman belanjaan dan kebutuhan sehari-hari',
    basePrice: 22000,
    pricePerKm: 4500,
    icon: 'shopping-cart',
    isActive: true
  },
  {
    id: '7',
    name: 'Ambulance Service',
    description: 'Transportasi medis darurat',
    basePrice: 50000,
    pricePerKm: 10000,
    icon: 'ambulance',
    isActive: true
  }
];
