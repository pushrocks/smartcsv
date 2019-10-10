import * as plugins from './smartcsv.plugins';

export interface ICsvConstructorOptions {
  headers: boolean;
  unquote: boolean;
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
    await csvInstance.exportAsObject();
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
  public data: any[];

  public options: ICsvConstructorOptions = {
    headers: true,
    unquote: true
  };

  constructor(csvStringArg: string, optionsArg: ICsvConstructorOptions) {
    this.options = {
      ...this.options,
      ...optionsArg
    };

    let csvStringToParse = csvStringArg;
    if (this.options.unquote) {
      csvStringToParse = csvStringToParse.replace(
        /"(.*?)"/gi,
        (match, p1, offset, originalString) => {
          return plugins.smartstring.base64.encode(match);
        }
      );
    }

    this.csvString = csvStringToParse;

    this.determineKeyframe();
  }

  /**
   * determines the keyframe of the csv string
   */
  private determineKeyframe() {
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
  private serializeCsvString() {
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

  /**
   * gets the rows of the csv
   */
  private getRows(): string[] {
    const rowsArray = this.csvString.split('\n');
    if (rowsArray[rowsArray.length - 1] === '') {
      rowsArray.pop();
    }
    return rowsArray;
  }

  private getHeaders() {
    const rowArray = this.getRows();
    if (this.options.headers) {
      let headerRow = rowArray[0];
      this.headers = headerRow.split(this.keyFrame);
      if (this.options.unquote) {
        const unquotedHeaders: string[] = [];
        for (const header of this.headers) {
          if (plugins.smartstring.type.isBase64(header)) {
            unquotedHeaders.push(plugins.smartstring.base64.decode(header).replace(/['"]+/g, ''));
          } else {
            unquotedHeaders.push(header);
          }
        }
        this.headers = unquotedHeaders;
      }
    }
    return this.headers;
  }

  private createDataObject(dataArray: string[]) {
    const neededIterations = dataArray.length;
    let resultJson: any = {};
    for (let i = 0; i < neededIterations; i++) {
      let value = dataArray[i];
      if (this.options.unquote && plugins.smartstring.type.isBase64(value)) {
        value = plugins.smartstring.base64.decode(value).replace(/['"]+/g, '').replace(/['"]+/g, '');
      }
      resultJson[this.headers[i]] = value;
    }
    return resultJson;
  }

  public async exportAsObject(): Promise<any> {
    const serializedData = this.serializeCsvString();
    const dataObjects = [];
    for (const dataArray of serializedData) {
      dataObjects.push(this.createDataObject(dataArray));
    }
    this.data = dataObjects;
    return dataObjects;
  }
}
