import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const UserScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.UserScalarFieldEnum);
