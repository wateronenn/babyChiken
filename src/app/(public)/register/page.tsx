'use client';
import { createUser } from '@/libs/function/user';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    await createUser({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      tel: form.tel.value,
    });
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