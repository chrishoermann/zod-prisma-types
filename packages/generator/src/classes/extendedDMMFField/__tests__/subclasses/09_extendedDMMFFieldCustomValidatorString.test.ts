import type DMMF from '@prisma/dmmf';
import { it, expect, describe } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from '../setup';
import { ExtendedDMMFFieldCustomValidatorString } from '../../09_extendedDMMFFieldCustomValidatorString';
import { GeneratorConfig } from '../../../../schemas/generatorConfigSchema';

/////////////////////////////////////////////
// TEST SUITE
/////////////////////////////////////////////

export function testExtendedDMMFFieldCustomValdiatorString<
  T extends ExtendedDMMFFieldCustomValidatorString,
>(
  classConstructor: new (
    model: DMMF.Field,
    generatorConfig: GeneratorConfig,
    modelName: string,
  ) => T,
) {
  const getField = (field?: Partial<DMMF.Field>) =>
    new classConstructor(
      { ...FIELD_BASE, ...field },
      DEFAULT_GENERATOR_CONFIG,
      'ModelName',
    );

  describe(`ExtendedDMMFFieldCustomValidatorString`, () => {
    it(`should load class with docs and custom validator`, async () => {
      const field = getField({
        isList: true,
        documentation:
          'some text in docs @zod.custom.use(z.string().min(2).max(4)).array(.length(2))',
      });
      expect(field.zodCustomValidatorString).toBe('z.string().min(2).max(4)');
    });

    it(`should load class with docs and custom omit validator`, async () => {
      const field = getField({
        documentation: 'some text in docs @zod.custom.omit(["model", "input"])',
      });
      expect(field.zodCustomValidatorString).toBeUndefined();
    });

    it(`should load class with docs and invalid validator for type string`, async () => {
      expect(() =>
        getField({
          documentation:
            'some text in docs @zod.custom.use(z.string().min(2).max(4)).array(.length(2)).wrong()',
        }),
      ).toThrowError(
        "[@zod generator error]: Validator 'wrong' is not valid for type 'String', for specified '@zod.[key] or for 'z.array.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
      );
    });

    it(`should load class with nested validator string`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          'some text in docs @zod.custom.use(z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))}))',
      });

      expect(field.zodCustomValidatorString).toBe(
        'z.object({contents: z.array(z.object({locale: z.string(), content: z.string()}))})',
      );
    });

    // Additional comprehensive test cases
    it(`should handle custom validator with refine and transform`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().refine(val => val.length > 0, { message: "Cannot be empty" }).transform(val => val.toUpperCase()))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().refine(val => val.length > 0, { message: "Cannot be empty" }).transform(val => val.toUpperCase())',
      );
    });

    it(`should handle custom validator with multiple refinements`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().refine(val => val.includes("@"), { message: "Must contain @" }).refine(val => val.endsWith(".com"), { message: "Must end with .com" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().refine(val => val.includes("@"), { message: "Must contain @" }).refine(val => val.endsWith(".com"), { message: "Must end with .com" })',
      );
    });

    it(`should handle custom validator with enum validation`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.enum(["admin", "user", "moderator"]).refine(val => val !== "admin" || someCondition, { message: "Admin access denied" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.enum(["admin", "user", "moderator"]).refine(val => val !== "admin" || someCondition, { message: "Admin access denied" })',
      );
    });

    it(`should handle custom validator with union types`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.union([z.string().email(), z.string().url()]).refine(val => val.length < 100, { message: "Too long" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.union([z.string().email(), z.string().url()]).refine(val => val.length < 100, { message: "Too long" })',
      );
    });

    it(`should handle custom validator with lazy loading`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.lazy(() => z.object({id: z.number(), name: z.string()})).refine(data => data.id > 0, { message: "Invalid ID" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.lazy(() => z.object({id: z.number(), name: z.string()})).refine(data => data.id > 0, { message: "Invalid ID" })',
      );
    });

    it(`should handle custom validator with array validation`, async () => {
      const field = getField({
        type: 'String',
        isList: true,
        documentation:
          '@zod.custom.use(z.array(z.string().min(1)).min(1).max(10).refine(arr => arr.every(item => item.trim().length > 0), { message: "No empty strings allowed" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.array(z.string().min(1)).min(1).max(10).refine(arr => arr.every(item => item.trim().length > 0), { message: "No empty strings allowed" })',
      );
    });

    it(`should handle custom validator with object validation`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.object({email: z.string().email(), age: z.number().min(18)}).refine(data => data.age >= 18, { message: "Must be 18 or older" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.object({email: z.string().email(), age: z.number().min(18)}).refine(data => data.age >= 18, { message: "Must be 18 or older" })',
      );
    });

    it(`should handle custom validator with optional fields`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.object({required: z.string(), optional: z.string().optional()}).strict())',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.object({required: z.string(), optional: z.string().optional()}).strict()',
      );
    });

    it(`should handle custom validator with nullable fields`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.object({name: z.string(), description: z.string().nullable()}).passthrough())',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.object({name: z.string(), description: z.string().nullable()}).passthrough()',
      );
    });

    it(`should handle custom validator with default values`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().default("guest").transform(val => val.toLowerCase()))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().default("guest").transform(val => val.toLowerCase())',
      );
    });

    it(`should handle custom validator with coerce`, async () => {
      const field = getField({
        type: 'Int',
        documentation:
          '@zod.custom.use(z.coerce.number().int().positive().max(100))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.coerce.number().int().positive().max(100)',
      );
    });

    it(`should handle custom validator with preprocess`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.preprocess(val => String(val).trim(), z.string().min(1)))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.preprocess(val => String(val).trim(), z.string().min(1))',
      );
    });

    it(`should handle custom validator with pipe`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().pipe(z.string().min(3).max(50)))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().pipe(z.string().min(3).max(50))',
      );
    });

    it(`should handle custom validator with superRefine`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().superRefine((val, ctx) => { if (val.length < 3) ctx.addIssue({code: "too_small", minimum: 3, type: "string"}); }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().superRefine((val, ctx) => { if (val.length < 3) ctx.addIssue({code: "too_small", minimum: 3, type: "string"}); })',
      );
    });

    it(`should handle custom validator with catch`, async () => {
      const field = getField({
        type: 'String',
        documentation: '@zod.custom.use(z.string().catch("default_value"))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().catch("default_value")',
      );
    });

    it(`should handle custom validator with brand`, async () => {
      const field = getField({
        type: 'String',
        documentation: '@zod.custom.use(z.string().brand<"UserId">())',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().brand<"UserId">()',
      );
    });

    it(`should handle custom validator with readonly`, async () => {
      const field = getField({
        type: 'String',
        documentation: '@zod.custom.use(z.string().readonly())',
      });
      expect(field.zodCustomValidatorString).toBe('z.string().readonly()');
    });

    it(`should handle custom validator with description`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().describe("User email address"))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().describe("User email address")',
      );
    });

    it(`should handle custom validator with examples`, async () => {
      const field = getField({
        type: 'String',
        documentation:
          '@zod.custom.use(z.string().examples(["user@example.com", "admin@test.org"]))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.string().examples(["user@example.com", "admin@test.org"])',
      );
    });

    it(`should handle complex nested custom validator`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.object({user: z.object({profile: z.object({settings: z.object({theme: z.enum(["light", "dark"]), notifications: z.boolean()})})})}).refine(data => data.user.profile.settings.notifications || data.user.profile.settings.theme === "dark", { message: "Dark theme requires notifications" }))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.object({user: z.object({profile: z.object({settings: z.object({theme: z.enum(["light", "dark"]), notifications: z.boolean()})})})}).refine(data => data.user.profile.settings.notifications || data.user.profile.settings.theme === "dark", { message: "Dark theme requires notifications" })',
      );
    });

    it(`should handle custom validator with omit and pick`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.object({id: z.number(), name: z.string(), password: z.string(), email: z.string()}).omit({password: true}).pick({id: true, name: true, email: true}))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.object({id: z.number(), name: z.string(), password: z.string(), email: z.string()}).omit({password: true}).pick({id: true, name: true, email: true})',
      );
    });

    it(`should handle custom validator with merge and extend`, async () => {
      const field = getField({
        type: 'Json',
        documentation:
          '@zod.custom.use(z.object({id: z.number()}).merge(z.object({name: z.string()})).extend({email: z.string().email()}))',
      });
      expect(field.zodCustomValidatorString).toBe(
        'z.object({id: z.number()}).merge(z.object({name: z.string()})).extend({email: z.string().email()})',
      );
    });
  });
}

/////////////////////////////////////////////
// TEST EXECUTION
/////////////////////////////////////////////

testExtendedDMMFFieldCustomValdiatorString(
  ExtendedDMMFFieldCustomValidatorString,
);
