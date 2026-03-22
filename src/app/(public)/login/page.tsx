'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const res = await signIn('credentials', {
      identifier: form.Identifier.value,
      password: form.password.value,
      redirect: false,
    });

    if (res?.ok) router.push('/carRentals');
    else alert('Invalid credentials');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="Identifier" type="Identifier" placeholder="Email/Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}