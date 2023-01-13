import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);
