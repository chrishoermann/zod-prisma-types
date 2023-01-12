import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const MYValueSchema = z.nativeEnum(PrismaClient.MYValue);
