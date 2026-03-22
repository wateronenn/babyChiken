// app/layout.tsx
import NextAuthProvider from "@/provider/NextAuthProvider";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
export const metadata = {
  title: "My Next App",
  description: "Generated with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
         <NextAuthProvider session={session}>
          <TopMenu/>
          <div className="pt-[50px]">
            {children}
          </div>
         </NextAuthProvider>
        
      </body>
    </html>
  );
}