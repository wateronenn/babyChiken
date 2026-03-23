import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import UserProfile from "./@userProfile/page"
import { logout } from "@/libs/function/user";
export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const userProfile = await UserProfile();
  return (
    <main>
        {userProfile}
        
    </main>
    
    
  )
}