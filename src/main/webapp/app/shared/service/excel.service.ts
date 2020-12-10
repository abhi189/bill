/**
 * Created by dmaure on 18/01/19.
 */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xls';
@Injectable()
export class ExcelService {
    constructor() {}
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        XLSX.writeFile(workbook, excelFileName + EXCEL_EXTENSION, { bookType: 'xls', type: 'buffer' });
    }
}
