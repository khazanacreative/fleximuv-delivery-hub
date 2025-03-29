
// User Roles
export type UserRole = 'admin' | 'partner' | 'driver' | 'customer';

// Partner Types
export type PartnerType = 'general' | 'courier' | 'business';

// User
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  balance: number;
  partnerType?: PartnerType;
  status: 'active' | 'inactive' | 'suspended';
}

// Order Status
export type OrderStatus = 
  | 'pending' 
  | 'accepted' 
  | 'assigned' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

// Order
export interface Order {
  id: string;
  customerName: string;
  customerId: string;
  partnerId: string;
  driverId?: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: OrderStatus;
  createdAt: Date;
  scheduledFor?: Date;
  completedAt?: Date;
  amount: number;
  serviceType: string;
  notes?: string;
  // Add missing properties needed for Orders.tsx
  customer?: string; // For backward compatibility with existing code
  date?: Date; // For backward compatibility
  items?: string[]; // For backward compatibility
  driver?: string; // For backward compatibility
}

// Driver
export interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  partnerId: string;
  vehicleType: string;
  vehicleNumber?: string;
  status: 'available' | 'busy' | 'offline';
  completedOrders: number;
  rating: number;
  balance: number;
  createdAt: Date;
  // Add missing properties needed for Drivers.tsx
  currentLocation?: string;
  licensePlate?: string;
}

// Transaction
export interface Transaction {
  id: string;
  userId: string;
  type: 'top_up' | 'order_payment' | 'driver_payment' | 'refund' | 'commission';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  relatedOrderId?: string;
}

// Service Type
export interface ServiceType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  pricePerKm?: number;
  icon: string;
  isActive: boolean;
}
