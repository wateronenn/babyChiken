import { UserItem, UserResponse, LoginRequest, AuthResponse } from "../../../interface";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/rents';

export async function getOneUser(id: string, token: string): Promise<UserResponse> {
  const res = await fetch(`${BACKEND_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function getManyUsers(token: string): Promise<UserResponse[]> {
  const res = await fetch(`${BACKEND_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(data: UserItem): Promise<AuthResponse> {
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
  data: Partial<UserItem>,
  token: string
): Promise<UserResponse> {
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

export async function deleteUser(id: string, token: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete user');
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to login');
  return res.json();
}

export async function logout(token: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/auth/logout`, {
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