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
    static createCsvFromString(csvStringArg) {
        return __awaiter(this, void 0, void 0, function* () {
            const csvInstance = new Csv();
            csvInstance.csvString = csvStringArg;
            return csvInstance;
        });
    }
    getHeaders() {
    }
    exportAsJson() {
        let json = {
            [`key`]: 'hi'
        };
    }
}
exports.Csv = Csv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUE7SUFDUyxNQUFNLENBQU8sbUJBQW1CLENBQUUsWUFBb0I7O1lBQzNELE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFDOUIsV0FBVyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7WUFDckMsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQztLQUFBO0lBR00sVUFBVTtJQUVqQixDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLElBQUksR0FBRztZQUNULENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFDSixDQUFDO0NBRUY7QUFsQkQsa0JBa0JDIn0=