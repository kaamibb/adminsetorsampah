import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import Admin from "@/models/Admin";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const admin = await Admin.findOne({ email: credentials.email });
          if (admin) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              admin.password
            );
            if (isPasswordCorrect) {
              return admin;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ admin, account }: { admin: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        await connect();
        try {
          const existingAdmin = await Admin.findOne({ email: Admin.email });
          if (!existingAdmin) {
            const newAdmin = new Admin({
              email: Admin.email,
            });

            await newAdmin.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving admin", err);
          return false;
        }
      }
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
