import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type ExtendedUser } from '@/lib/auth';

// Mock student data
const mockStudents = [
  {
    id: "STU001",
    email: "kiana.johnson@capas.edu.bs",
    name: "Kiana Johnson",
    firstName: "Kiana",
    lastName: "Johnson",
    program: "Digital Arts",
    year: 2,
    gpa: 3.7,
    avatar: "/avatars/student1.jpg",
    enrolledCourses: ["art201", "mus301", "eng201"],
    achievements: ["Dean's List 2023", "Creative Arts Award"],
    island: "New Providence",
    role: "student"
  },
  {
    id: "STU002",
    email: "marcus.thompson@capas.edu.bs",
    name: "Marcus Thompson",
    firstName: "Marcus",
    lastName: "Thompson",
    program: "Computer Science",
    year: 1,
    gpa: 3.5,
    avatar: "/avatars/student2.jpg",
    enrolledCourses: ["cs101", "mar102"],
    achievements: ["Programming Competition Winner"],
    island: "Grand Bahama",
    role: "student"
  },
  {
    id: "ADMIN001",
    email: "admin@capas.edu.bs",
    name: "Dr. Patricia Glinton-Meicholas",
    firstName: "Patricia",
    lastName: "Glinton-Meicholas",
    program: "Administration",
    year: null,
    gpa: null,
    avatar: "/avatars/admin1.jpg",
    enrolledCourses: [],
    achievements: ["Founder", "Educational Leader"],
    island: "New Providence",
    role: "admin"
  }
];

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
        const user = mockStudents.find(student => 
          student.email === credentials.email
        );

        if (user && credentials.password === "capas123") {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.avatar,
            program: user.program,
            year: user.year,
            gpa: user.gpa,
            island: user.island
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.studentData = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.studentData) {
        session.user = token.studentData as ExtendedUser;
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