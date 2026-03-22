'use client';
import { createUser } from '@/libs/function/user';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createUser({
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      tel: formData.get('tel') as string,
      role: 'user',
    });
    alert('Registration successful, Please login now');
    router.push('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required />
      <input name="firstname" placeholder="Firstname" required />
      <input name="lastname" placeholder="Lastname" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="tel" placeholder="Phone" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}