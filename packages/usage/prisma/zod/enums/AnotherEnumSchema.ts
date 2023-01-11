import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const AnotherEnumSchema = z.nativeEnum(PrismaClient.AnotherEnum);
