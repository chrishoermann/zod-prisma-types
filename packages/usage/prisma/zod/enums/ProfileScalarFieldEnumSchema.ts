import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const ProfileScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.ProfileScalarFieldEnum);
