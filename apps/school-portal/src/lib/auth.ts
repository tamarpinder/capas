import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getStudentByEmail } from "./mock-data";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "CAPAS Demo Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo authentication - in production, this would connect to your database
        if (credentials?.email && credentials?.password === "capas123") {
          const student = getStudentByEmail(credentials.email);
          if (student) {
            return {
              id: student.id,
              email: student.email,
              name: student.name,
              firstName: student.firstName,
              lastName: student.lastName,
              program: student.program,
              year: student.year,
              gpa: student.gpa,
              avatar: student.avatar,
              studentId: student.studentId,
              island: student.island,
              enrolledCourses: student.enrolledCourses,
              achievements: student.achievements,
              role: student.role
            };
          }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.program = user.program;
        token.year = user.year;
        token.gpa = user.gpa;
        token.avatar = user.avatar;
        token.studentId = user.studentId;
        token.island = user.island;
        token.enrolledCourses = user.enrolledCourses;
        token.achievements = user.achievements;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
          program: token.program,
          year: token.year,
          gpa: token.gpa,
          avatar: token.avatar,
          studentId: token.studentId,
          island: token.island,
          enrolledCourses: token.enrolledCourses,
          achievements: token.achievements,
          role: token.role
        } as ExtendedUser;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
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