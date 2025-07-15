import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "CAPAS Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This would normally connect to your database
        if (credentials?.email && credentials?.password === "capas123") {
          return {
            id: "1",
            email: credentials.email,
            name: "Test Student",
            role: "student"
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "capas-development-secret",
};

export interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  program: string;
  year: number | null;
  gpa: number | null;
  avatar: string;
  enrolledCourses: string[];
  achievements: string[];
  island: string;
  role: "student" | "instructor" | "admin";
}