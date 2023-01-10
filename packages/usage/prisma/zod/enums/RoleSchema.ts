import { z } from "zod";
import * as PrismaClient from "@prisma/client";

export const RoleSchema = z.nativeEnum(PrismaClient.Role);
