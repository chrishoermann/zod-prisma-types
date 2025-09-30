import { type ContentWriterOptions } from '../../types';
import { getConfig } from '../../config';

// maybe needs some comments what the code is doing and
// in which scenario it is meant to be used

export const writeRemoveUndefined = ({
  fileWriter: { writer },
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles } = getConfig();

  writer
    .newLine()
    .writeLine(`type UnknownRecord = Record<PropertyKey, unknown>;`)
    .blankLine();

  writer
    .writeLine(`type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};`)
    .blankLine();

  writer
    .writeLine(`type RemoveUndefined<T extends UnknownRecord> = {`)
    .writeLine(`  [K in keyof T]: Exclude<T[K], undefined>;`)
    .writeLine(`};`)
    .blankLine();

  writer
    .writeLine(
      `type MappedValues<T extends object, KS extends readonly (keyof T)[]> = {`,
    )
    .writeLine(`  [K in keyof KS]: T[KS[K] & keyof T];`)
    .writeLine(`};`)
    .blankLine();

  writer
    .writeLine(
      `type MappedEntries<T extends object, KS extends readonly (keyof T)[]> = {`,
    )
    .writeLine(`  [K in keyof KS]: [KS[K] & keyof T, T[KS[K] & keyof T]];`)
    .writeLine(`};`)
    .blankLine();

  writer
    .writeLine(
      `function get<T extends object>(obj: T, op: 'keys'): (keyof T)[];`,
    )
    .writeLine(
      `function get<T extends object>(obj: T, op: 'values'): T[keyof T][];`,
    )
    .writeLine(
      `function get<T extends object>(obj: T, op: 'entries'): [keyof T, T[keyof T]][];`,
    )
    .writeLine(
      `function get<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .writeLine(`  obj: T,`)
    .writeLine(`  op: 'keys',`)
    .writeLine(`  keys: KS,`)
    .writeLine(`): KS;`)
    .writeLine(
      `function get<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .writeLine(`  obj: T,`)
    .writeLine(`  op: 'values',`)
    .writeLine(`  keys: KS,`)
    .writeLine(`): MappedValues<T, KS>;`)
    .writeLine(
      `function get<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .writeLine(`  obj: T,`)
    .writeLine(`  op: 'entries',`)
    .writeLine(`  keys: KS,`)
    .writeLine(`): MappedEntries<T, KS>;`)
    .write(
      `function get<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .write(`  obj: T, op: 'entries' | 'keys' | 'values', keys?: KS,`)
    .write(`) `)
    .inlineBlock(() => {
      writer
        .writeLine(`if (keys)`)
        .inlineBlock(() => {
          writer
            .writeLine(`switch (op) {`)
            .writeLine(`  case 'keys':`)
            .writeLine(`    return keys;`)
            .writeLine(`  case 'values':`)
            .writeLine(`    return keys.map((k) => obj[k]);`)
            .writeLine(`  case 'entries':`)
            .writeLine(`    return keys.map((k) => [k, obj[k]]);`)
            .writeLine(`  default:`)
            .writeLine(`    throw new Error(\`Invalid operation: \${op}\`);`)
            .writeLine(`}`);
        })
        .writeLine(`else return Object[op](obj);`);
    })
    .write(`;`)
    .blankLine();

  writer
    .writeLine(`function keys<T extends object>(obj: T): (keyof T)[];`)
    .writeLine(
      `function keys<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .writeLine(`  obj: T,`)
    .writeLine(`  keys: KS,`)
    .writeLine(`): KS;`)
    .write(
      `function keys<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .write(`  obj: T, keys?: KS,`)
    .write(`) `)
    .inlineBlock(() => {
      writer.writeLine(
        `return obj ? (keys ? get(obj, 'keys', keys) : get(obj, 'keys')) : [];`,
      );
    })
    .write(`;`)
    .blankLine();

  writer
    .writeLine(
      `function entries<T extends object>(obj: T): [keyof T, T[keyof T]][];`,
    )
    .writeLine(
      `function entries<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .writeLine(`  obj: T,`)
    .writeLine(`  keys: KS,`)
    .writeLine(`): MappedEntries<T, KS>;`)
    .write(
      `function entries<T extends object, const KS extends readonly (keyof T)[]>(`,
    )
    .write(`  obj: T, keys?: KS,`)
    .write(`) `)
    .inlineBlock(() => {
      writer.writeLine(
        `return obj ? (keys ? get(obj, 'entries', keys) : get(obj, 'entries')) : [];`,
      );
    })
    .write(`;`)
    .blankLine();

  writer
    .write(
      `export const ru = <T extends UnknownRecord>(obj: T): Simplify<RemoveUndefined<T>> => `,
    )
    .inlineBlock(() => {
      writer
        .write(
          `return entries(obj).reduce<RemoveUndefined<T>>((acc, [key, value]) => `,
        )
        .inlineBlock(() => {
          writer
            .writeLine(`if (value !== undefined) `)
            .inlineBlock(() => {
              writer
                .writeLine(`if (`)
                .writeLine(`  typeof value === 'object' &&`)
                .writeLine(`  value !== null &&`)
                .writeLine(`  !Array.isArray(value) &&`)
                .writeLine(`  keys(value).length > 0`)
                .writeLine(`) `)
                .inlineBlock(() => {
                  writer.writeLine(
                    `acc[key] = ru(value as any) as RemoveUndefined<T>[typeof key];`,
                  );
                })
                .write(` else `)
                .inlineBlock(() => {
                  writer.writeLine(
                    `acc[key] = value as RemoveUndefined<T>[typeof key];`,
                  );
                });
            })
            .writeLine(`return acc;`);
        })
        .write(`, {} as RemoveUndefined<T>);`);
    })
    .write(`;`)
    .blankLine();

  if (useMultipleFiles && !getSingleFileContent) {
    writer
      .blankLine()
      .writeLine(`export default ru;`)
      .writeLine(`export { ru as RemoveUndefined };`);
  }
};
