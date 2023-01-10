import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const SecondEnumSchema = z.nativeEnum(PrismaClient.SecondEnum);
