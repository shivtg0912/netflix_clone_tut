import {PrismaClient} from '@prisma/client';
const client = global.prismadb || new PrismaClient(); // we save prisma in a global file to prevent hot reload from creating new connections
if(process.env.NODE_ENV === 'production') global.prismadb = client;
export default client;