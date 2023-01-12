import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const MODELWithUpperCaseScalarFieldEnumSchema = z.nativeEnum(PrismaClient.Prisma.MODELWithUpperCaseScalarFieldEnum);
