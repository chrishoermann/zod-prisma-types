import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const NonDefaultModelScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.NonDefaultModelScalarFieldEnum);
