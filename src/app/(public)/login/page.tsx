'use client';
import { getSession, signIn } from 'next-auth/react';
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
      const session = await getSession();
      alert('Login successful');
      if (session?.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/car-rentals');
      }
    }
    else alert('Invalid credentials');
  };

  return (
    <main className="bg-[var(--color-pastel-yellow)] min-h-screen w-full pt-[20px] ">
      <h1 className="text-center text-5xl font-bold mt-8 text-[var(--color-second-purple)]"> Login </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mx-auto mt-10 p-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-[var(--color-second-purple)] mb-3">Email/Username</label>
              <input name="Identifier" type="Identifier" required 
              className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition" />
            </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--color-second-purple)] mb-3">Password</label>
            <input minLength={6} name="password" type="password" required 
            className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition" />
          </div>
          <div className='flex justify-center '>
            <button type="submit" className="w-[15%] cursor-pointer mt-2 bg-[var(--color-primary-purple)] text-white py-2 rounded-2xl shadow-xl shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)]  hover:opacity-90 transition ">Login</button>
          </div>
          
          </form>
          <div className="flex flex-col gap-4 max-w-md mx-auto mt-10 p-6  text-center" >
            <h1 className='text-[var(--color-second-purple)] '>Don't have an account? Join us now!</h1>
            <button className="cursor-pointer text-[var(--color-second-purple)] font-bold underline" onClick={() => router.push('/register')}>Register</button>
          </div>
        
    </main>
    
  );
}