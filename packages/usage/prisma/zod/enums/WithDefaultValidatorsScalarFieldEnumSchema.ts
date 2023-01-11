import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const WithDefaultValidatorsScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.WithDefaultValidatorsScalarFieldEnum);
