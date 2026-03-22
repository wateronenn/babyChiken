import { CarRentalResponse, CarRentalItem  } from "../../../interface";
const BACKEND_URL = process.env.BACKEND_URL + '/api/v1/carRentals';

export async function getCarRentals(): Promise<CarRentalResponse[]> {
    const response = await fetch(BACKEND_URL);  
    
    if(!response.ok) {
        throw new Error('Failed to fetch car rentals');
    }
    return response.json();
}

export async function getCarRentalById(id: string): Promise<CarRentalResponse> {
    const response = await fetch(`${BACKEND_URL}/${id}`);
       if(!response.ok) {
        throw new Error('Failed to fetch car rental');
    }
    return response.json();
}

export async function createCarRental(
  data: CarRentalItem,
  token: string
): Promise<CarRentalResponse> {
  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create car rental');
  return res.json();
}

export async function updateCarRental(
  id: string,
  data: Partial<CarRentalItem>,
  token: string
): Promise<CarRentalResponse> {
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update car rental');
  return res.json();
}

export async function deleteCarRental(id: string, token: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete car rental');
}