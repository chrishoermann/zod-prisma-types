const regex =
  /@zod(?<import>\.import\(\[(?<imports>[\w\s"@'${}/,;:.~*-]+)\]\))?\.(?<type>[\w]+){1}(?<customErrors>\([{][\s\S]*?[}]\))?(?<validatorPattern>[^@]*?)(?=@zod|$)/u;

const str =
  'some text in docs @zod.custom.omit(["model", "input"]) some text after';

console.log('String:', str);
console.log('Length:', str.length);

const match = str.match(regex);
if (match) {
  console.log('Match found at index:', match.index);
  console.log('Full match:', match[0]);
  console.log('Full match length:', match[0].length);

  const before = str.substring(0, match.index);
  const after = str.substring(match.index + match[0].length);

  console.log('Before:', before);
  console.log('After:', after);

  const replaced = str.replace(regex, '');
  console.log('After replace:', replaced);
  console.log('After replace length:', replaced.length);

  const trimmed = replaced.trim();
  console.log('After trim:', trimmed);
} else {
  console.log('No match');
}
