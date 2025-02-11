import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import prismadb from '@/lib/prismadb';
export default NextAuth({
    providers: [
        Credentials ({
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
                if(!credentials?.email || !credentials?.password) { //this checks if the email and password are provided
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
        signIn: '/auth/',
    },
    debug: process.env.NODE_ENV === 'development', //this is used to enable debug mode
    session: { //this is used to set the session options
        strategy: 'jwt',
    },
    jwt: { //this is used to set the jwt options
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET //this is used to set the secret
});