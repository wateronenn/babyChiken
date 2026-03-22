const BACKEND_URL = process.env.BACKEND_URL + '/api/v1/auth';
import {User} from 'next-auth'
import { AuthResponse } from "../../../interface";

export async function getMe(id: string, token: string) {
  const res = await fetch(`${BACKEND_URL}/me/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}
export async function createUser(data: User) {
  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to register user');
  return res.json();
}

export async function updateUser(
  id: string,
  data: Partial<User>,
  token: string
){
  const res = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function deleteUser(id: string, token: string){
  const res = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete user');
}

export async function login(userIdentifier:string,userPassword:string) {
  const response = await fetch(`${BACKEND_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: userIdentifier, password: userPassword } ),
  });
  if (!response.ok) {
        const errorBody = await response.json().catch(() => response.text());
        console.error("Login failed:", response.status, errorBody); 
        throw new Error(`Failed to login: ${response.status} - ${JSON.stringify(errorBody)}`);
    }
    return await response.json()
}

export async function logout(token: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/logout`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to logout');
}

export async function resetPassword(
  token: string,
  newPassword: string,
  resetToken: string
): Promise<AuthResponse> {
  const res = await fetch(`${BACKEND_URL}/auth/resetpassword/${resetToken}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password: newPassword }),
  });
  if (!res.ok) throw new Error('Failed to reset password');
  return res.json();
}