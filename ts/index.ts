import * as plugins from './smartcsv.plugins';

export interface ICsvConstructorOptions {
  headers: boolean;
}

export class Csv {
  // STATIC

  /**
   * creates a Csv Object from string
   * @param csvStringArg
   * @param optionsArg
   */
  public static async createCsvFromString(
    csvStringArg: string,
    optionsArg: ICsvConstructorOptions
  ): Promise<Csv> {
    const csvInstance = new Csv(csvStringArg, optionsArg);
    return csvInstance;
  }

  public static async createCsvStringFromArray(arrayArg: any[]): Promise<string> {
    const foundKeys: string[] = [];

    // lets deal with the keys
    for (const objectArg of arrayArg) {
      for (const key of Object.keys(objectArg)) {
        foundKeys.includes(key) ? null : foundKeys.push(key);
      }
    }

    // lets deal with the data
    const dataRows: string[] = [];
    for (const objectArg of arrayArg) {
      const dataRowArray: string[] = [];
      for (const key of foundKeys) {
        dataRowArray.push(objectArg[key]);
      }
      dataRows.push(dataRowArray.join(','));
    }

    // lets put togehter the csv string and return it
    const headerString = foundKeys.join(',');
    const dataString = dataRows.join('\n');
    const csvString = `${headerString}\n${dataString}\n`;
    return csvString;
  }

  // INSTANCE
  public csvString: string;
  public headers: string[];
  public keyFrame: string = null;

  public options: ICsvConstructorOptions = {
    headers: true
  };

  constructor(csvStringArg: string, optionsArg: ICsvConstructorOptions) {
    this.csvString = csvStringArg;
    this.options = optionsArg;
    this.determineKeyframe();
  }

  /**
   * determines the keyframe of the csv string
   */
  public determineKeyframe() {
    let commaLength = 0;
    let semicolonLength = 0;
    const commaRegexResult = this.csvString.match(/,/g);
    const semicolonRegexResult = this.csvString.match(/;/g);
    if (commaRegexResult) {
      commaLength = commaRegexResult.length;
    }
    if (semicolonRegexResult) {
      semicolonLength = semicolonRegexResult.length;
    }
    // tslint:disable-next-line:prefer-conditional-expression
    if (commaLength < semicolonLength) {
      this.keyFrame = ';';
    } else {
      this.keyFrame = ',';
    }
  }

  /**
   * serializes the csv string
   */
  public serializeCsvString() {
    const rowArray = this.getRows();
    const resultArray = [];
    if (this.options.headers) {
      this.getHeaders();
      rowArray.shift();
    }
    for (const row of rowArray) {
      resultArray.push(row.split(this.keyFrame));
    }
    return resultArray;
  }

  public getRows(): string[] {
    const rowsArray = this.csvString.split('\n');
    if (rowsArray[rowsArray.length - 1] === '') {
      rowsArray.pop();
    }
    return rowsArray;
  }

  public getHeaders() {
    const rowArray = this.getRows();
    if (this.options.headers) {
      let headerRow = rowArray[0];
      this.headers = headerRow.split(this.keyFrame);
    }
    return this.headers;
  }

  public createDataObject(dataArray: string[]) {
    const neededIterations = dataArray.length;
    let resultJson: any = {};
    for (let i = 0; i < neededIterations; i++) {
      resultJson[this.headers[i]] = dataArray[i];
    }
    return resultJson;
  }

  public async exportAsObject(): Promise<any> {
    const serializedData = this.serializeCsvString();
    const dataObjects = [];
    for (const dataArray of serializedData) {
      dataObjects.push(this.createDataObject(dataArray));
    }
    return dataObjects;
  }
}
