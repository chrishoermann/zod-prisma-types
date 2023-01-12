import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const SortOrderSchema = z.nativeEnum(PrismaClient.Prisma.SortOrder);
