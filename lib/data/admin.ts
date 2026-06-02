export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  payment: "UPI" | "Card" | "COD";
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  orders: number;
  spent: number;
  joined: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
}

export interface AdminDelivery {
  id: string;
  order: string;
  partner: string;
  area: string;
  slot: string;
  status: "Assigned" | "Picked Up" | "In Transit" | "Delivered";
}

export const seedOrders: AdminOrder[] = [
  { id: "FH-92831", customer: "Aarav Sharma", email: "aarav@mail.com", date: "01 Jun 2026", items: 6, total: 1248, status: "Processing", payment: "UPI" },
  { id: "FH-92830", customer: "Priya Nair", email: "priya@mail.com", date: "01 Jun 2026", items: 4, total: 879, status: "Shipped", payment: "Card" },
  { id: "FH-92829", customer: "Rohan Mehta", email: "rohan@mail.com", date: "31 May 2026", items: 11, total: 2399, status: "Delivered", payment: "UPI" },
  { id: "FH-92828", customer: "Sneha Reddy", email: "sneha@mail.com", date: "31 May 2026", items: 2, total: 540, status: "Pending", payment: "COD" },
  { id: "FH-92827", customer: "Vikram Singh", email: "vikram@mail.com", date: "30 May 2026", items: 8, total: 1899, status: "Delivered", payment: "Card" },
  { id: "FH-92826", customer: "Ananya Das", email: "ananya@mail.com", date: "30 May 2026", items: 3, total: 699, status: "Cancelled", payment: "UPI" },
  { id: "FH-92825", customer: "Karan Patel", email: "karan@mail.com", date: "29 May 2026", items: 5, total: 1120, status: "Delivered", payment: "UPI" },
  { id: "FH-92824", customer: "Fatima Khan", email: "fatima@mail.com", date: "29 May 2026", items: 7, total: 1560, status: "Shipped", payment: "Card" },
  { id: "FH-92823", customer: "Meera Joshi", email: "meera@mail.com", date: "28 May 2026", items: 1, total: 249, status: "Delivered", payment: "COD" },
  { id: "FH-92822", customer: "Aditya Rao", email: "aditya@mail.com", date: "28 May 2026", items: 9, total: 2040, status: "Processing", payment: "UPI" },
];

export const seedCustomers: AdminCustomer[] = [
  { id: "C-1001", name: "Aarav Sharma", email: "aarav@mail.com", avatar: "https://i.pravatar.cc/80?img=15", orders: 28, spent: 34280, joined: "Jan 2024", tier: "Platinum" },
  { id: "C-1002", name: "Priya Nair", email: "priya@mail.com", avatar: "https://i.pravatar.cc/80?img=32", orders: 19, spent: 21540, joined: "Mar 2024", tier: "Gold" },
  { id: "C-1003", name: "Rohan Mehta", email: "rohan@mail.com", avatar: "https://i.pravatar.cc/80?img=12", orders: 41, spent: 58900, joined: "Nov 2023", tier: "Platinum" },
  { id: "C-1004", name: "Sneha Reddy", email: "sneha@mail.com", avatar: "https://i.pravatar.cc/80?img=45", orders: 7, spent: 6420, joined: "Feb 2026", tier: "Silver" },
  { id: "C-1005", name: "Vikram Singh", email: "vikram@mail.com", avatar: "https://i.pravatar.cc/80?img=68", orders: 33, spent: 47210, joined: "Aug 2023", tier: "Gold" },
  { id: "C-1006", name: "Ananya Das", email: "ananya@mail.com", avatar: "https://i.pravatar.cc/80?img=47", orders: 3, spent: 1980, joined: "Apr 2026", tier: "Bronze" },
  { id: "C-1007", name: "Karan Patel", email: "karan@mail.com", avatar: "https://i.pravatar.cc/80?img=14", orders: 15, spent: 16750, joined: "Jun 2024", tier: "Silver" },
  { id: "C-1008", name: "Fatima Khan", email: "fatima@mail.com", avatar: "https://i.pravatar.cc/80?img=44", orders: 22, spent: 28640, joined: "Dec 2023", tier: "Gold" },
];

export const seedDeliveries: AdminDelivery[] = [
  { id: "D-501", order: "FH-92831", partner: "Suresh K.", area: "Bandra West", slot: "Today 6–8 PM", status: "In Transit" },
  { id: "D-502", order: "FH-92830", partner: "Imran S.", area: "Andheri East", slot: "Today 8–10 PM", status: "Picked Up" },
  { id: "D-503", order: "FH-92828", partner: "Ravi P.", area: "Powai", slot: "Tomorrow 8–10 AM", status: "Assigned" },
  { id: "D-504", order: "FH-92822", partner: "Deepak M.", area: "Juhu", slot: "Today 6–8 PM", status: "In Transit" },
  { id: "D-505", order: "FH-92827", partner: "Anil T.", area: "Worli", slot: "Delivered", status: "Delivered" },
];

export const salesByMonth = [
  { month: "Jan", revenue: 482000 },
  { month: "Feb", revenue: 531000 },
  { month: "Mar", revenue: 498000 },
  { month: "Apr", revenue: 612000 },
  { month: "May", revenue: 705000 },
  { month: "Jun", revenue: 842690 },
];

export const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const statusStyles: Record<OrderStatus, string> = {
  Delivered: "bg-success/15 text-success",
  Shipped: "bg-sky-500/15 text-sky-600",
  Processing: "bg-primary/15 text-primary",
  Pending: "bg-amber-500/15 text-amber-600",
  Cancelled: "bg-destructive/15 text-destructive",
};
