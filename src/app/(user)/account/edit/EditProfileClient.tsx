'use client';
import { useState } from "react";
import { updateUser } from "@/libs/function/user";
import { useRouter } from "next/navigation";

export default function EditProfileClient({ user, token }: any) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    tel: user.tel,
    picture: user.picture || 'https://drive.google.com/file/d/1lB7fw5c1ZdP_Xb3TGQg4M2JGyfYP-y6O/view?usp=drive_link',  
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
    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
      <h1 className="text-xl mb-4">Edit Profile</h1>

      {form.picture && (
        <img
          src={form.picture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
      )}

      <input
        type="text"
        name="picture"
        value={form.picture}
        onChange={handleChange}
        placeholder="Google Drive Image Link"
      />

      <input
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="tel"
        value={form.tel}
        onChange={handleChange}
        placeholder="Phone"
      />

      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}