import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const AnotherEnumSchema = z.nativeEnum(PrismaClient.AnotherEnum);
