const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/auth';
///console.log("Backend URL:", BACKEND_URL);
import {User} from 'next-auth'
import { AuthResponse } from "../../../interface";
import { UserItem } from "../../../interface";

export async function getMe(token: string) {
  const res = await fetch(`${BACKEND_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}
export async function createUser(data: UserItem) {
  const res = await fetch(`${BACKEND_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
      console.error("Logout failed:", res.status, await res.text());
      throw new Error('Failed to logout');
    }
  return res.json();
}

export async function updateUser(
  id: string,
  data: Partial<User>,
  token: string
){
  const res = await fetch(`${BACKEND_URL}/updateUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
      console.error("Update user failed:", res.status, await res.text());
      throw new Error('Failed to update user');
    }
    
  return res.json();
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
  if (!res.ok) 
    {
      console.error("Logout failed:", res.status, await res.text());
      throw new Error('Failed to logout');
    }
}

export async function resetPassword(
  token: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<AuthResponse> {
  const res = await fetch(`${BACKEND_URL}/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      currentPassword: currentPassword, 
      newPassword : newPassword,
      rePassword: confirmPassword
    }),
  });
  if (!res.ok) {
    {
      console.error("Reset password failed:", res.status, await res.text());
      throw new Error('Failed to reset password');
    }
  }
  return res.json();
}