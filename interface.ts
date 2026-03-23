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
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel?: string;
  region: string;
  car?: string[];
  picture?: string;
  pricePerDay?: Number
  rentedUser?: Number
  rents?: RentResponse[];
}

// ==================== Rent ====================
export interface RentJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RentResponse[]
}

export interface RentItem {
  startDate: Date | string;
  endDate: Date | string;
  carRental: string;
  car: string;
}

export interface RentResponse {
  _id: string;
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
  role: 'user' | 'admin';
  picture?: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  tel: string;
  firstname: string;
  lastname: string;
  role: 'user' | 'admin';
  createdAt: string;

}


export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}