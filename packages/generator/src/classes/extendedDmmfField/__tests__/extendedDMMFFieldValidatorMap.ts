import { it, expect } from 'vitest';

import { DEFAULT_GENERATOR_CONFIG, FIELD_BASE } from './setup';
import { ExtendedDMMFFieldValidatorString } from '../extendedDMMFFieldValidatorString';

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class without docs`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(field).toBeDefined();
  expect(field?.['validatorMatch']).toBeUndefined();
  expect(field?.['validatorType']).toBeUndefined();
  expect(field?.['validatorCustomError']).toBeUndefined();
  expect(field?.['validatorPattern']).toBeUndefined();
  expect(field?.zodCustomErrors).toBeUndefined();
});

it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class and pass valid data to validator map`, async () => {
  const field = new ExtendedDMMFFieldValidatorString(
    { ...FIELD_BASE },
    DEFAULT_GENERATOR_CONFIG,
    'ModelName',
  );

  expect(
    field?.validatorMap['bigint']({ key: 'array', pattern: '.length(2)' }),
  ).toBe(true);
});

// it(`should load a scalar DMMF.field ExtendedDMMFFieldValidatorString class with docs and invalid validator for type`, async () => {
//   expect(
//     () =>
//       new ExtendedDMMFFieldValidatorString(
//         {
//           ...FIELD_BASE,
//           documentation:
//             '@zod.string.lt(2).gt(4).invalid({ required_error: "error" })',
//         },
//         DEFAULT_GENERATOR_CONFIG,
//         'ModelName',
//       ),
//   ).toThrowError(
//     "[@zod generator error]: Validator 'lt' is not valid for type 'String' or for specified '@zod.[key]'. [Error Location]: Model: 'ModelName', Field: 'test'.",
//   );
// });
