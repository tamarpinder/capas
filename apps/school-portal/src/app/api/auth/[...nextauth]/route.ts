import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type ExtendedUser } from '@/lib/auth';
import { getStudentByEmail } from '@/lib/mock-data';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "CAPAS Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@capas.edu.bs" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Mock authentication - in production, verify against database
        if (credentials.password === "capas123") {
          const user = getStudentByEmail(credentials.email);
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              firstName: user.firstName,
              lastName: user.lastName,
              program: user.program,
              year: user.year,
              gpa: user.gpa,
              avatar: user.avatar,
              studentId: user.studentId,
              island: user.island,
              enrolledCourses: user.enrolledCourses,
              achievements: user.achievements,
              role: user.role
            };
          }
        }

        return null;
      }
    })
  ],
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
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "capas-development-secret",
});

export { handler as GET, handler as POST };