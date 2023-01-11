import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const MYValueSchema = z.nativeEnum(PrismaClient.MYValue);
