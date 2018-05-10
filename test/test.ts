// tslint:disable-next-line:no-implicit-dependencies
import { expect, tap } from 'tapbundle';
import * as smartcsv from '../ts/index';

// tslint:disable-next-line:no-implicit-dependencies
import * as smartfile from 'smartfile';

let fileString: string;
let testCsv: smartcsv.Csv;

tap.test('should read a file', async tools => {
  fileString = smartfile.fs.toStringSync('./test/sample.csv');
});

tap.test('should create a valid csv', async () => {
  testCsv = await smartcsv.Csv.createCsvFromString(fileString, { headers: true });
  const result = await testCsv.exportAsObject();
  console.log(result);
});

tap.start();
