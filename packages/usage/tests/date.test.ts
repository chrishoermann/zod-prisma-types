import { DateModelSchema } from '../prisma/generated/zod';

it('should coerce a date string to Date', () => {
  const result = DateModelSchema.parse({
    id: 1,
    date: new Date(Date.now()).toISOString(),
    dateOpt: new Date(Date.now()).toISOString(),
  });

  expect(result.date).toBeTruthy();
  expect(result.date).toBeInstanceOf(Date);
  expect(result.dateOpt).toBeTruthy();
  expect(result.dateOpt).toBeInstanceOf(Date);
});

it('should coerce a Date instance to Date instance', () => {
  const result = DateModelSchema.parse({
    id: 1,
    date: new Date(Date.now()),
    dateOpt: new Date(Date.now()),
  });

  expect(result.date).toBeTruthy();
  expect(result.date).toBeInstanceOf(Date);
  expect(result.dateOpt).toBeTruthy();
  expect(result.dateOpt).toBeInstanceOf(Date);
});
