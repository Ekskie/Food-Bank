
export type UserRole = "admin" | "donor" | "volunteer" | "guest" | "beneficiary" | "partner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  lastLogin?: string;
  status: "active" | "inactive" | "suspended";
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  donorId: string;
  donorName: string;
  nutritionalInfo?: string;
  allergens?: string[];
  storageRequirements?: string;
  createdAt: string;
  status: "available" | "allocated" | "expired";
}

export interface Beneficiary {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  familySize: number;
  dietaryRestrictions?: string[];
  registeredDate: string;
  status: "active" | "inactive" | "pending";
  lastAssistanceDate?: string;
  notes?: string;
}
