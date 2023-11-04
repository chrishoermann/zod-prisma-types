import { DateModelSchema } from '../prisma/generated/zod';
import { client } from './trpc/client';
import { getServer } from './trpc/server';
import { it, expect, describe, beforeAll, afterAll } from 'vitest';

///////////////////////////////////////
// SETUP
///////////////////////////////////////

const httpServer = getServer();

beforeAll(() => {
  httpServer.listen(2022);
});

afterAll(() => {
  httpServer.server.close();
});

///////////////////////////////////////
// BASIC TESTS
///////////////////////////////////////

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

it('should not coerce an invalid date string to Date instance', () => {
  expect(() => {
    DateModelSchema.parse({
      id: 1,
      date: 'invalid date string',
      dateOpt: new Date(Date.now()),
    });
  }).toThrowError();
});

///////////////////////////////////////
// TRPC TESTS
///////////////////////////////////////

it('should be able to pass a date instance via trpc with DateModelSchema', async () => {
  const data = {
    id: 1,
    date: new Date(Date.now()),
    dateOpt: new Date(Date.now()),
  };

  const result = await client.date.query(data);

  expect(result.dateIsDateInput).toBe(true);
  expect(result.dateOptIsDateInput).toBe(true);
});
