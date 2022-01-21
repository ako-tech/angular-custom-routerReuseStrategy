export interface Client {
  name: string;
  email: string;
  phone: string;
}

export interface QuotationItem {
  description: string;
  price: number;
}

export interface Quotation {
  id: number;
  client: Client;
  createdAt: string;
  lastModified: string;
  items: QuotationItem[];
  total: number;
}
