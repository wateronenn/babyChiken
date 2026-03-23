'use client';
import { createUser } from '@/libs/function/user';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const repassword = formData.get('repassword') as string;
    console.log(password)
    console.log(repassword)
    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== repassword) {
      alert("Password and confirm password do not match");
      return;
    }
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
    <main className="bg-[var(--color-pastel-yellow)] min-h-screen w-full pt-[20px]">
      <h1 className="text-center text-5xl font-bold mt-8 text-[var(--color-second-purple)]"> Register </h1>
      <form onSubmit = {handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">Username</label>
          <input name="username"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">firstname</label>
          <input name="firstname"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">lastname</label>
          <input name="lastname"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">Email</label>
          <input name="email"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">tel</label>
          <input name="tel"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">password (must be at least 6 characters) </label>
          <input minLength={6} name="password"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[var(--color-second-purple)]">re-type password (must be match the password)</label>
          <input minLength={6} name="repassword"required className="w-full px-4 py-2 rounded-2xl bg-[var(--color-primary-purple)]/23 text-[var(--color-second-purple)] placeholder-white/70 border border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"/>
        </div>
        
        <button
          type="submit"
          className=" cursor-pointer mt-2 bg-[var(--color-primary-purple)] text-white py-2 rounded-2xl shadow-xl shadow-[var(--color-second-purple)] hover:bg-[var(--color-second-purple)]  hover:opacity-90 transition"
        >
          Register
        </button>
      </form>

    </main>
  )
}