export interface ICsvConstructorOptions {
    headers: boolean;
}
export declare class Csv {
    static createCsvFromString(csvStringArg: string, options: ICsvConstructorOptions): Promise<Csv>;
    csvString: string;
    headers: string[];
    keyFrame: string;
    options: ICsvConstructorOptions;
    determineKeyframe(): void;
    serializeCsvString(): any[];
    getRows(): string[];
    getHeaders(): string[];
    createDataObject(dataArray: string[]): any;
    exportAsObject(): Promise<any>;
}
