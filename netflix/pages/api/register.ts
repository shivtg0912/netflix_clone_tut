import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    try {
        const {email, name, password} = req.body;
        const existingUser = await prismadb.user.findUnique({ //
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(422).json({ error: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 12); //await used because bcrypt is an asynchronous function
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image:"",
                emailVerified: new Date()
            },
        });
        return res.status(201).json(user);
    } catch(error) {
        console.log(error);
        return res.status(400).end();
    }
}