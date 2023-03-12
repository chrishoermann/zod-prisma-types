import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';
import {
  UserCreateInputSchema,
  UserIncludeSchema,
  UserSelectSchema,
  UserUncheckedCreateInputSchema,
} from '../../prisma/generated/zod';

const client = new PrismaClient();

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

interface A {
  a: string;
  b: string;
}

interface B {
  a: string;
  c: string;
}

type C = Without<A, B> & B;

type CB = C & B;

const c: C = {
  a: 'a',
  c: 'c',
  b: undefined,
};

type D = Without<B, A>;

type XOR<T, U> = T extends object
  ? U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : U
  : T;

type CXor = XOR<A, B>;

type UserCreateWithout = Without<
  Prisma.UserCreateInput,
  Prisma.UserUncheckedCreateInput
>;

const mergedSchema = UserCreateInputSchema.and(UserUncheckedCreateInputSchema);

type user = z.infer<typeof mergedSchema>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

const union = z
  .union([UserCreateInputSchema, UserUncheckedCreateInputSchema])
  .superRefine((data) => {});

const parsedDAta = UserCreateArgsSchema.parse({
  email: 'mail@mail.com',
  name: 'name',
  role: ['USER'],
  enum: 'ONE',
  scalarList: ['a', 'b'],
});

client.user.create({
  data: parsedDAta,
});
