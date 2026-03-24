export type Category = 'distortion' | 'fuzz' | 'chorus' | 'reverb' | 'delay' | 'overdrive';

export interface LocalizedString {
  ko: string;
  en: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number; // KRW
  category: Category;
  images: string[];
  specs: { label: LocalizedString; value: LocalizedString }[];
  inStock: boolean;
  featured: boolean;
}

export interface Review {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  comment: LocalizedString;
  avatar: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  items: CartItem[];
  shipping: ShippingInfo;
  total: number;
}

export interface ShippingInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface PaymentSession {
  id: string;
  url: string;
}

export interface PaymentResult {
  success: boolean;
  orderId: string;
}

export interface PaymentProvider {
  createSession(order: Order): Promise<PaymentSession>;
  verifyPayment(sessionId: string): Promise<PaymentResult>;
}
