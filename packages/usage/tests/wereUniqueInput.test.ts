import { ZodError } from 'zod';
import { UserWhereUniqueInputSchema } from '../prisma/generated/zod';

it('should accept the first of the two input values', () => {
  const paresd = UserWhereUniqueInputSchema.parse({ id: 'idstring' });
  expect(paresd).toEqual({ id: 'idstring', email: undefined });
});

it('should accept the second of the two input values', () => {
  const paresd = UserWhereUniqueInputSchema.parse({ email: 'email@mail.com' });
  expect(paresd).toEqual({ email: 'email@mail.com', id: undefined });
});

it('should throw an error when no input value is provided', () => {
  try {
    UserWhereUniqueInputSchema.parse({
      email: undefined,
    });
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
it('should throw an error when no input value is provided', () => {
  try {
    UserWhereUniqueInputSchema.parse({
      email: undefined,
      id: undefined,
    });
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
