/*
*   Details:
*       The function import data from sourceUrl using importTableHtml and then calls dataexport to write the resulting
*       data object into the objective spreadsheet.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function dataCapture (sourceUrl, sourceSpreadsheetId, sourceSheetName, sourceRangeIdentifier, objectiveSpreadsheetId, objectiveSheetName, objectiveMirrorSheetName) {

  if (sourceUrl === undefined || sourceUrl === '') {
      console.log('Missing url for data.');
      return;
    } else if (objectiveSpreadsheetId === undefined || objectiveSheetName == undefined) {
      console.log('Missing objective spreadsheet id and/or objective sheet name.');
      return;
    } else if (objectiveMirrorSheetName === undefined || objectiveMirrorSheetName === objectiveSheetName){
      console.log('The objetive mirror sheets is not defined or shares name with the objective sheet.');
      return;
    }
  
  dataExportValues = importTableHtml(sourceUrl);

  dataExport('', '', '', objectiveSpreadsheetId, objectiveSheetName, objectiveMirrorSheetName, dataExportValues);

}
