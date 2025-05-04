import {PrismaClient} from "../generated/prisma/index.js";

const glogalForPrisma = globalThis;

export const db = glogalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production")glogalForPrisma.prisma = db;