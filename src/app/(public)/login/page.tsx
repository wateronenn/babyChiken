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

    if (res?.ok) {
      alert('Login successful');
      router.push('/car-rentals');
    }
    else alert('Invalid credentials');
  };

  return (
    <main>
        <div>
          <form onSubmit={handleSubmit}>
          <input name="Identifier" type="Identifier" placeholder="Email/Username" required />
          <input name="password" type="password" placeholder="Password" required />
          <button type="submit">Login</button>
          </form>
        </div>
        <h1>Don't have an account? Join us now!</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded" onClick={() => router.push('/register')}>Register</button>
    </main>
    
  );
}