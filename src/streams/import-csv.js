import { parse } from 'csv-parse';
import fs from 'node:fs';
import {PORT} from './../server.js'
const csvPath = new URL('./tasks.csv', import.meta.url);
const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 // skip the header line
});

export async function run() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch(`http://localhost:${PORT}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

    await wait(1000)
  }

}



function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}