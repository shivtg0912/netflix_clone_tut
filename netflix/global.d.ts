import { PrismaClient } from '@prisma/client';
declare global { //this is done to prevent typescript from complaining about globalThis not being a valid property
    namespace globalThis {
        var prismadb: PrismaClient;
    }
}