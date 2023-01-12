import * as PrismaClient from "@prisma/client";
import { z } from "zod";

export const RoleSchema = z.nativeEnum(PrismaClient.Role);
