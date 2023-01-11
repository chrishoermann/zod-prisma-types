import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const QueryModeSchema = z.nativeEnum(PrismaClient.Prisma.QueryMode);
