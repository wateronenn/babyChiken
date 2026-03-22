import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { getMe } from "@/libs/function/user";
import UserProfileClient from "./UserProfileClient";

export default async function UserProfile() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.token) {
    return <div>Please login</div>;
  }

  const profile = await getMe(session.user.token);

  return (
    <UserProfileClient
      profile={profile}
      token={session.user.token}
    />
  );
}