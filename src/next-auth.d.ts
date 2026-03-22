import NextAuth from "next-auth";
import "next-auth/jwt";

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      username: string;
      email: string;
      firstname: string;
      lastname: string;
      tel: string;
      role: 'user' | 'admin';
      token: string;
    } & DefaultSession['user'];
  }

  interface User {
    _id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    tel: string;
    role: 'user' | 'admin';
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    tel: string;
    role: 'user' | 'admin';
    token: string;
  }
}