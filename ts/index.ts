import * as plugins from './smartcsv.plugins';

export interface ICsvConstructorOptions {
  headers: boolean;
}

export class Csv {
  public static async createCsvFromString(
    csvStringArg: string,
    options: ICsvConstructorOptions
  ): Promise<Csv> {
    const csvInstance = new Csv();
    csvInstance.csvString = csvStringArg;
    csvInstance.determineKeyframe();
    return csvInstance;
  }
  public csvString: string;
  public headers: string[];
  public keyFrame: string = null;

  public options: ICsvConstructorOptions = {
    headers: true
  };

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

  public getRows() {
    return this.csvString.split('\n');
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
