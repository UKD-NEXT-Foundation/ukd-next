import { readFile } from 'node:fs/promises';

const URL_FOR_CREATE_CLASSROOM = 'http://localhost:8000/api/v0/classrooms';
const TABLE_PATH = './MigrateMocksData/classroom/Аудиторний_фонд_станом-на_13.12.2023.csv';

function parseKey(key: string) {
  switch (key.trim()) {
    case '':
      return null;
    case 'Аудиторія':
      return 'name';
    case 'Кількість місць':
      return 'numberOfSeats';
    case 'Тип':
      return 'typeFor';
    case 'проектор':
      return 'availableRequirement.projector';
    case 'Благо':
      return 'availableRequirement.blago';
    case 'тільки екран':
      return 'availableRequirement.screen';
    case 'ел. дошка':
      return 'availableRequirement.interactiveWhiteboard';
    case 'Закріплено за':
      return 'attributedTo';
    default:
      return key;
  }
}

function parseValue(value: string) {
  switch (value.trim()) {
    case '':
      return null;
    case '+':
      return true;
    default:
      return value;
  }
}

interface IParseTableResult {
  name: string;
  numberOfSeats: string;
  typeFor: string;
  'availableRequirement.projector': true | null;
  'availableRequirement.blago': true | null;
  'availableRequirement.screen': true | null;
  'availableRequirement.interactiveWhiteboard': true | null;
  attributedTo: string | null;
}

async function parseCsvTable(rawTableData: string): Promise<IParseTableResult[]> {
  const rawLines = rawTableData.split('\r\n');

  const result = [];
  let headers = [];

  for (let index = 0; index < rawLines.length; index++) {
    const line = rawLines[index].split(',');

    if (index === 0) {
      headers = line;
      continue;
    }

    const obj = {};

    for (const lineIndex in line) {
      const key = parseKey(headers[lineIndex]);
      const value = parseValue(line[lineIndex]);

      if (key !== null && !obj[key]) obj[key] = value;
    }

    result.push(obj);
  }

  return result.filter((obj) => Object.keys(obj).length);
}

async function makeRequset(payload: IParseTableResult) {
  const body = {
    name: payload.name,
    numberOfSeats: Number(payload.numberOfSeats),
    availableRequirements: {},
    description: `Тип: ${payload.typeFor}, Закріплено за: ${payload.attributedTo}`,
  };

  body.availableRequirements['projector'] = payload['availableRequirement.projector'] === true;
  body.availableRequirements['screen'] = payload['availableRequirement.screen'] === true;
  body.availableRequirements['interactiveWhiteboard'] = payload['availableRequirement.interactiveWhiteboard'] === true;
  body.availableRequirements['blago'] = payload['availableRequirement.blago'] === true;
  body.availableRequirements['computers'] = payload.typeFor.trim() === 'Комп. клас';

  const request = await fetch(URL_FOR_CREATE_CLASSROOM, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const resonse = await request.json();

  if (request.status >= 400) {
    console.error(JSON.stringify(body));
    throw Error(JSON.stringify(resonse));
  }

  return request.status;
}

async function main() {
  const tableData = await readFile(TABLE_PATH, 'utf8');
  const result = await parseCsvTable(tableData);

  console.log(result);
  console.log(result.length, 'elements from table');

  for (const obj of result) {
    await makeRequset(obj);
  }
}

main();
