export declare class Csv {
    static createCsvFromString(csvStringArg: string): Promise<Csv>;
    csvString: string;
    getHeaders(): void;
    exportAsJson(): void;
}
