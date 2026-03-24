import { json } from "stream/consumers";
import { RentResponse, RentItem, RentJson } from "../../../interface";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/rents';

export async function getOneRent(id: string, token: string): Promise<RentResponse> {
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch rent');
  const json = await res.json();
  return json.data;
}

export async function getManyRents(token: string): Promise<RentJson> {
  const res = await fetch(BACKEND_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch rents');
  return res.json();
}

export async function createRent(
  data: RentItem,
  token: string
): Promise<RentResponse> {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  const res = await fetch(`${BASE_URL}/carRentals/${data.carRental}/rents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const json = await res.json()
  if (!res.ok) throw new Error(json.message);
  return json.data;
}

export async function updateRent(
  id: string,
  data: Partial<RentItem>,
  token: string
): Promise<RentResponse> {
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
   if (!res.ok) {
      console.error("Logout failed:", res.status, await res.text());
      throw new Error('Failed to logout');
    }
  return res.json();
}

export async function deleteRent(id: string, token: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete rent');
}