import { it, expect, describe } from 'vitest';
import { RemoveUndefined as ru } from '../prisma/generated/zod/inputTypeSchemas'; // Adjust the import path to where `ru` is defined

///////////////////////////////////////
// TEST CASES
///////////////////////////////////////

describe('ru function - Recursive Removal of Undefined', () => {
  it('should remove top-level undefined values', () => {
    const input = {
      name: 'John',
      age: undefined,
      isStudent: false,
    };

    const result = ru(input);

    expect(result).toEqual({
      name: 'John',
      isStudent: false,
    });
  });

  // it('should remove nested undefined values', () => {
  //   const input = {
  //     name: 'John',
  //     address: {
  //       city: 'New York',
  //       zip: undefined,
  //     },
  //     hobbies: ['reading', undefined, 'coding'],
  //   };

  //   const result = ru(input);

  //   expect(result).toEqual({
  //     name: 'John',
  //     address: {
  //       city: 'New York',
  //     },
  //     hobbies: ['reading', 'coding'],
  //   });
  // });

  it('should handle arrays with nested objects', () => {
    const input = {
      name: 'John',
      scores: [
        { math: 90, science: undefined },
        { math: undefined, science: 85 },
      ],
    };

    const result = ru(input);

    expect(result).toEqual({
      name: 'John',
      scores: [{ math: 90 }, { science: 85 }],
    });
  });

  it('should preserve null values', () => {
    const input = {
      name: 'John',
      age: null,
      address: {
        city: null,
        zip: undefined,
      },
    };

    const result = ru(input);

    expect(result).toEqual({
      name: 'John',
      age: null,
      address: {
        city: null,
      },
    });
  });

  it('should handle empty objects', () => {
    const input = {
      name: 'John',
      emptyObj: {},
      nestedEmptyObj: {
        innerEmptyObj: {},
      },
    };

    const result = ru(input);

    expect(result).toEqual({
      name: 'John',
      emptyObj: {},
      nestedEmptyObj: {
        innerEmptyObj: {},
      },
    });
  });

  it('should handle deeply nested objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
              undefinedValue: undefined,
            },
          },
        },
      },
    };

    const result = ru(input);

    expect(result).toEqual({
      level1: {
        level2: {
          level3: {
            level4: {
              value: 'deep',
            },
          },
        },
      },
    });
  });

  // it('should handle arrays with null and undefined values', () => {
  //   const input = {
  //     arr: [1, undefined, null, 2, { key: 'value', undefinedKey: undefined }],
  //   };

  //   const result = ru(input);

  //   expect(result).toEqual({
  //     arr: [1, null, 2, { key: 'value' }],
  //   });
  // });

  it('should handle mixed types', () => {
    const input = {
      name: 'John',
      age: 30,
      isStudent: false,
      address: {
        city: 'New York',
        zip: undefined,
      },
      scores: [
        { math: 90, science: undefined },
        { math: undefined, science: 85 },
      ],
      nullValue: null,
      undefinedValue: undefined,
    };

    const result = ru(input);

    expect(result).toEqual({
      name: 'John',
      age: 30,
      isStudent: false,
      address: {
        city: 'New York',
      },
      scores: [{ math: 90 }, { science: 85 }],
      nullValue: null,
    });
  });
});
