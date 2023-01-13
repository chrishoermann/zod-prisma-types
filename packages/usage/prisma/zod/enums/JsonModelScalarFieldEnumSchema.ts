import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const JsonModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.JsonModelScalarFieldEnum);
