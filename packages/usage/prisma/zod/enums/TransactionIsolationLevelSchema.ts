import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const TransactionIsolationLevelSchema = z.nativeEnum(PrismaClient.Prisma.TransactionIsolationLevel);
