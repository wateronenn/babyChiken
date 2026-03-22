// ==================== CarRental ====================
export interface CarRentalItem {
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel?: string;
  region: string;
  car?: string[];
  picture?: string;
}

export interface CarRentalResponse {
  id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel?: string;
  region: string;
  car?: string[];
  picture?: string;
  rents?: RentResponse[];
}

// ==================== Rent ====================
export interface RentItem {
  startDate: Date | string;
  endDate: Date | string;
  carRental: string;
  car: string;
}

export interface RentResponse {
  id: string;
  startDate: string;
  endDate: string;
  user: string | UserResponse;       // string if not populated, UserResponse if populated
  carRental: string | CarRentalResponse; // string if not populated, CarRentalResponse if populated
  car: string;
  createAt: string;
}

// ==================== User ====================
export interface UserItem {
  username: string;
  email: string;
  tel: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  tel: string;
  firstname: string;
  lastname: string;
  role: 'user' | 'admin';
  createdAt: string;

}


export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
}