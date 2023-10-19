import { it, expect, describe } from 'vitest';

import {
  getNestedValidatorList,
  getSplitIndices,
} from '../getNestedValidatorList';

describe(`getSplitIndices`, () => {
  it('returns the starting index for an empty string', () => {
    const input = '';
    const result = getSplitIndices(input);
    expect(result).toEqual([0]);
  });

  it('returns correct split indices without any parenthesis', () => {
    const input = 'hello.world.';
    const result = getSplitIndices(input);
    expect(result).toEqual([0, 5]);
  });

  it('ignores split points inside parenthesis', () => {
    const input = 'hello.(world.inner).planet.';
    const result = getSplitIndices(input);
    expect(result).toEqual([0, 19]);
  });

  it('handles multiple split points and nested parenthesis', () => {
    const input = 'a.b.(c.d.e.(f.g)).h.i.';
    const result = getSplitIndices(input);
    expect(result).toEqual([0, 1, 17, 19]);
  });

  it('returns correct split indices for words not ending with dot', () => {
    const input = 'hello.world';
    const result = getSplitIndices(input);
    expect(result).toEqual([0]);
  });

  it('returns correct indices when only parenthesis present', () => {
    const input = '(hello)';
    const result = getSplitIndices(input);
    expect(result).toEqual([0]);
  });

  it('handles unbalanced parenthesis', () => {
    const input = 'a.b.(c.d';
    const result = getSplitIndices(input);
    expect(result).toEqual([0, 1]);
  });
});

describe(`getNestedValidatorList`, () => {
  it('should return a list of nested validators', () => {
    expect(
      getNestedValidatorList(
        '.import(["import { myFunction } from "../../../../utils/myFunction";"]).refine(v => v.title.length > 0).transform(...some stuff).strict()',
      ),
    ).toEqual([
      '.import(["import { myFunction } from "../../../../utils/myFunction";"])',
      '.refine(v => v.title.length > 0)',
      '.transform(...some stuff)',
      '.strict()',
    ]);
  });

  it('should return a list of nested validators with nested parentheses', () => {
    expect(
      getNestedValidatorList(
        '.refine(v => v.title.length > 0 && (v.title.length < 10 || v.title.length > 20))',
      ),
    ).toEqual([
      '.refine(v => v.title.length > 0 && (v.title.length < 10 || v.title.length > 20))',
    ]);
  });
  it('correctly extracts validators from a complex pattern', () => {
    const input =
      '.import(["some path"]).refine(v => v > 0).transform(...args).strict()';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual([
      '.import(["some path"])',
      '.refine(v => v > 0)',
      '.transform(...args)',
      '.strict()',
    ]);
  });

  it('correctly handles nested parenthesis', () => {
    const input = '.method(arg1, arg2, (a, b) => a + b).anotherMethod()';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual([
      '.method(arg1, arg2, (a, b) => a + b)',
      '.anotherMethod()',
    ]);
  });

  it('correctly handles input with no dots', () => {
    const input = 'methodWithoutDot()';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual(['methodWithoutDot()']);
  });

  it('correctly handles input with only dots', () => {
    const input = '...';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual(['...']);
  });

  it('correctly handles empty string', () => {
    const input = '';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual(['']);
  });

  it('fails for strings with multiple spaces', () => {
    const input = '.method1()  .method2()   .method3()';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual(['.method1()', '.method2()', '.method3()']);
  });

  it('fails for strings with unbalanced parenthesis', () => {
    const input = '.method1(arg1, arg2, (a, b => a + b).method2()';
    const validators = getNestedValidatorList(input);
    expect(validators).toEqual([
      '.method1(arg1, arg2, (a, b => a + b).method2()',
    ]);
  });
});
