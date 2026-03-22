import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { getMe } from "@/libs/function/user";
import EditProfileClient from "./EditProfileClient";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return <div>Please login</div>;
  }

  const profile = await getMe(session.user.token);

  return (
    <EditProfileClient
      user={profile.data}
      token={session.user.token}
    />
  );
}