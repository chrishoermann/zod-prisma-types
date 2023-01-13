import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const SecondEnumSchema = z.nativeEnum(PrismaClient.SecondEnum);
