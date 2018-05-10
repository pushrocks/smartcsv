"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Csv {
    constructor() {
        this.keyFrame = null;
        this.options = {
            headers: true
        };
    }
    static createCsvFromString(csvStringArg, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const csvInstance = new Csv();
            csvInstance.csvString = csvStringArg;
            csvInstance.determineKeyframe();
            return csvInstance;
        });
    }
    determineKeyframe() {
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
        }
        else {
            this.keyFrame = ',';
        }
    }
    serializeCsvString() {
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
    getRows() {
        return this.csvString.split('\n');
    }
    getHeaders() {
        const rowArray = this.getRows();
        if (this.options.headers) {
            let headerRow = rowArray[0];
            this.headers = headerRow.split(this.keyFrame);
        }
        return this.headers;
    }
    createDataObject(dataArray) {
        const neededIterations = dataArray.length;
        let resultJson = {};
        for (let i = 0; i < neededIterations; i++) {
            resultJson[this.headers[i]] = dataArray[i];
        }
        return resultJson;
    }
    exportAsObject() {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedData = this.serializeCsvString();
            const dataObjects = [];
            for (const dataArray of serializedData) {
                dataObjects.push(this.createDataObject(dataArray));
            }
            return dataObjects;
        });
    }
}
exports.Csv = Csv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUE7SUFBQTtRQVlTLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsWUFBTyxHQUEyQjtZQUN2QyxPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFnRUosQ0FBQztJQS9FUSxNQUFNLENBQU8sbUJBQW1CLENBQ3JDLFlBQW9CLEVBQ3BCLE9BQStCOztZQUUvQixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzlCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1lBQ3JDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQVNNLGlCQUFpQjtRQUN0QixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7U0FDdkM7UUFDRCxJQUFJLG9CQUFvQixFQUFFO1lBQ3hCLGVBQWUsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7U0FDL0M7UUFDRCx5REFBeUQ7UUFDekQsSUFBSSxXQUFXLEdBQUcsZUFBZSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEI7UUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLFVBQVU7UUFDZixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsU0FBbUI7UUFDekMsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRVksY0FBYzs7WUFDekIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDakQsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssTUFBTSxTQUFTLElBQUksY0FBYyxFQUFFO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3BEO1lBQ0QsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQztLQUFBO0NBQ0Y7QUFoRkQsa0JBZ0ZDIn0=