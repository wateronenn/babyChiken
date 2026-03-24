'use client';
import { useState } from "react";
import { updateUser } from "@/libs/function/user";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProfileClient({ user, token }: any) {
  const router = useRouter();

  const [form, setForm] = useState({
    username : user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email : user.email,
    tel: user.tel,
    picture:
      "/img/profile.jpg",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateUser(user._id, form, token);
      alert("Profile updated!");
      router.push("/account");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <main className="bg-[var(--color-pastel-yellow)] min-h-screen w-full pt-[20px]">
      
      <h1 className="pt-8 text-center text-5xl font-bold mt-8 text-[var(--color-second-purple)]">
        Edit Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-primary-blue)] flex flex-row gap-6 w-[70%] mx-auto mt-10 p-6 rounded-2xl"
      >
        
        {/* LEFT: Profile Image */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src={form.picture}
            alt="profile picture"
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          
          <h1 className="text-xl font-bold text-[var(--color-second-purple)]">
            {user.username}
          </h1>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--color-second-purple)]">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl bg-[rgba(182,177,252,0.5)] text-[var(--color-second-purple)] border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
            />
          </div>
            <label className="text-sm text-[var(--color-second-purple)]">
              Firstname
            </label>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl bg-[rgba(182,177,252,0.5)] text-[var(--color-second-purple)] border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--color-second-purple)]">
              Lastname
            </label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl bg-[rgba(182,177,252,0.5)] text-[var(--color-second-purple)] border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--color-second-purple)]">
              Phone
            </label>
            <input
              name="tel"
              value={form.tel}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl bg-[rgba(182,177,252,0.7)] text-[var(--color-second-purple)] border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--color-second-purple)]">
              Email
            </label>
            <input
              name="tel"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-2xl bg-[rgba(182,177,252,0.7)] text-[var(--color-second-purple)] border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-second-purple)] transition"
            />
          </div>


          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => router.push("/account")}
              className="cursor-pointer bg-[var(--color-primary-red)] text-white px-6 py-2 rounded-2xl hover:bg-[var(--color-second-red)] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-[var(--color-primary-purple)] text-white px-6 py-2 rounded-2xl shadow-md hover:bg-[var(--color-second-purple)] transition"
            >
              Save
            </button>
          </div>

        </div>
      </form>
    </main>
  );
}