import { writeImportStatementOptions } from 'src/classes';
import { type ContentWriterOptions } from '../../types';

export const writeTransformJsonNull = ({
  fileWriter: { writer, writeImports },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
  } = dmmf.generatorConfig;

  // TODO: check how to get DbNUll and JsonNull from PrismaClient without importing the whole namespace

  if (useMultipleFiles && !getSingleFileContent) {
    const imports: writeImportStatementOptions[] = [];
    if (isPrismaClientGenerator) {
      imports.push({
        name: 'objectEnumValues',
        path: prismaLibraryPath,
        isTypeOnly: true,
      });
      imports.push({
        name: 'JsonValue',
        path: prismaLibraryPath,
        isTypeOnly: true,
      });
    } else {
      imports.push({ name: 'Prisma', path: prismaClientPath });
    }
    writeImports(imports);
  }

  const jsonValueTypeName = isPrismaClientGenerator
    ? 'JsonValue'
    : 'Prisma.JsonValue';

  const nullTypesTypeName = isPrismaClientGenerator
    ? 'typeof objectEnumValues.instances'
    : 'Prisma.NullTypes';

  writer
    .newLine()
    .write(`export type NullableJsonInput = `)
    .write(`${jsonValueTypeName} | `)
    .write(`null | `)
    .write(`'JsonNull' | `)
    .write(`'DbNull' | `)
    .write(`${nullTypesTypeName}.DbNull | `)
    .write(`${nullTypesTypeName}.JsonNull;`)
    .blankLine();

  writer
    .write(`export const transformJsonNull = (v?: NullableJsonInput) => `)
    .inlineBlock(() => {
      writer
        .writeLine(
          `if (!v || v === 'DbNull') return ${nullTypesTypeName}.DbNull;`,
        )
        .writeLine(
          `if (v === 'JsonNull') return ${nullTypesTypeName}.JsonNull;`,
        )
        .writeLine(`return v;`);
    })
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default transformJsonNull;`);
  }
};
