import { generatorHandler } from '@prisma/generator-helper';

generatorHandler({
  onManifest() {
    return {
      defaultOutput: 'node_modules/@types/zod-prisma',
      prettyName: 'Zod Prisma Types',
    };
  },
  async onGenerate(options) {
    console.log('Generating Zod Prisma Types...', JSON.stringify(options, undefined, 2));

    const { dmmf } = options;
    const { datamodel } = dmmf;
    const { models } = datamodel;

    const output = models
      .map((model) => {
        const { name, fields } = model;
        const fieldsString = fields
          .map((field) => {
            const { name, type, isRequired } = field;
            const typeString = isRequired ? type : `${type} | undefined`;
            return `${name}: ${typeString}`;
          })
          .join(';\n');

        return `export interface ${name} {\n${fieldsString}\n}`;
      })
      .join('\r\n');

    return {
      prettyName: 'Zod Prisma Types',
      content: output,
    };
  },
});
