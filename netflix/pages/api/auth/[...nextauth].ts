import NextAuth from 'next-auth';
import { compare } from 'bcrypt';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismadb from '@/lib/prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and Password are required');
                }
                const user = await prismadb.user.findUnique({  // findUnique is a Prisma method that finds a single record that matches the unique key
                    where: {
                        email: credentials.email
                    }
                });
                if(!user || !user.hashedPassword) { //this checks if the user exists and if the user has a password
                    throw new Error("Email doesn't exist");
                }
                const isValid = await compare(
                    credentials.password, user.hashedPassword
                ); //this checks if the password is correct
                if(!isValid) {
                    throw new Error('Password is incorrect');
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth/'
    },
    debug: process.env.NODE_ENV === 'development', //this is used to enable debug mode
    adapter: PrismaAdapter(prismadb),
    session: { //this is used to set the session options
        strategy: 'jwt',
    },
    jwt: { //this is used to set the jwt options
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET //this is used to set the secret
});