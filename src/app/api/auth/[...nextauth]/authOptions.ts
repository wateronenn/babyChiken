import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '../../../../libs/function/user';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
  name: 'Credentials',
  credentials: {
    identifier: { label: 'Email or Username', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    console.log("CREDENTIALS:", credentials);
    if (!credentials) return null;

    
    try {
      const data = await login(credentials.identifier, credentials.password);
      console.log("LOGIN RESPONSE:", data);
    } catch (err) {
      console.log("❌ LOGIN ERROR:", err);
      return null;
}
const data = await login(credentials.identifier,credentials.password);
    console.log("LOGIN RESPONSE:", data);
    if (data.success) {
      return {
        ...data.user,
        token: data.token,
      };
    }

    return null;
},
}),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
        session.user = token as any
        return session;
    },
  },

  pages: {
    signIn: '/login', 
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};