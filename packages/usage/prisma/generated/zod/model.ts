import * as Prisma from "@prisma/client";
import { z } from "zod";
import * as Enum from "./enum";

/////////////////////////////////////////
// USER MODEL
/////////////////////////////////////////

export const UserCreateInputScalarType = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional(),
});

export const UserCreateInputScalarAndEnumType = UserCreateInputScalarType.extend({
  role: Enum.RoleType.optional(),
  enum: Enum.AnotherEnumType.optional(),
});

export const UserCreateInputType: z.ZodType<Prisma.Prisma.UserCreateInput> = UserCreateInputScalarType.extend({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1).max(100).optional(), role: Enum.RoleType.optional(),
  enum: Enum.AnotherEnumType.optional(),
  posts: z.lazy(() => PostType),
  profile: z.lazy(() => ProfileType).optional(),
});

/////////////////////////////////////////
// POST MODEL
/////////////////////////////////////////

export const PostCreateInputScalarType = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  authorId: z.string(),
});

export const PostCreateInputScalarAndEnumType = PostCreateInputScalarType.extend({
  anotherEnum: Enum.AnotherEnumType,
});

export const PostCreateInputType: z.ZodType<Prisma.Prisma.PostCreateInput> = PostCreateInputScalarType.extend({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional(),
  published: z.boolean().optional(),
  authorId: z.string(), anotherEnum: Enum.AnotherEnumType,
  author: z.lazy(() => UserType),
});

/////////////////////////////////////////
// PROFILE MODEL
/////////////////////////////////////////

export const ProfileCreateInputScalarType = z.object({
  id: z.number().optional(),
  bio: z.string(),
  userId: z.string(),
});

export const ProfileCreateInputScalarAndEnumType = ProfileCreateInputScalarType.extend({
  role: Enum.RoleType.optional(),
  second: Enum.SecondEnumType.optional(),
});

export const ProfileCreateInputType: z.ZodType<Prisma.Prisma.ProfileCreateInput> = ProfileCreateInputScalarType.extend({
  id: z.number().optional(),
  bio: z.string(),
  userId: z.string(), role: Enum.RoleType.optional(),
  second: Enum.SecondEnumType.optional(),
  user: z.lazy(() => UserType),
});
