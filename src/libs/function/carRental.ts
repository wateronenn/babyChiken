import { CarRentalResponse, CarRentalItem  } from "../../../interface";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/carRentals';

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
  console.log("👉 CREATE API CALL")
  console.log("👉 URL:", BACKEND_URL)
  console.log("👉 PAYLOAD:", data)
  console.log("👉 TOKEN:", token)

  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  let json
  try {
    json = await res.json()
  } catch {
    json = null
  }

  console.log("👉 STATUS:", res.status)
  console.log("👉 RESPONSE:", json)

  if (!res.ok) {
    throw new Error(json?.message || "Failed to create car rental")
  }

  return json
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