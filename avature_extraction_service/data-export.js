/*
*   Details:
*       The function exports, in one step, formatted data from source spreadsheet into objective spreadsheet.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function dataExport (sourceSpreadsheetId, sourceSheetName, sourceRangeIdentifier, objectiveSpreadsheetId, objectiveSheetName, objectiveMirrorSheetName, dataExportValues) {

    if ((sourceSpreadsheetId || sourceSheetName || sourceRangeIdentifier) === undefined && dataExportValues === undefined) {
      console.log('Missing source data credentials, dataframe or both.');
      return;
    } else if (objectiveSpreadsheetId === undefined || objectiveSheetName == undefined) {
      console.log('Missing objective spreadsheet id and/or objective sheet name.');
      return;
    } else if (objectiveMirrorSheetName === undefined || objectiveMirrorSheetName === objectiveSheetName){
      console.log('The objetive mirror sheets is not defined or shares name with the objective sheet.');
      return;
    }

    let objectiveSpreadsheet = SpreadsheetApp
        .openById(objectiveSpreadsheetId);

    let objectiveSheet = objectiveSpreadsheet
        .getSheetByName(objectiveSheetName);

    let objectiveMirrorSheet = objectiveSpreadsheet
        .getSheetByName(objectiveMirrorSheetName);

    if (objectiveSheet === null) {
        objectiveSpreadsheet.insertSheet(objectiveSheetName);
        objectiveSheet = objectiveSpreadsheet
          .getSheetByName(objectiveSheetName);
    }

    if (objectiveMirrorSheet === null) {
        objectiveSpreadsheet.insertSheet(objectiveMirrorSheet);
        objectiveMirrorSheet = objectiveSpreadsheet
          .getSheetByName(objectiveMirrorSheet);
    }

    if (dataExportValues === undefined || dataExportValues === '') {
      let sourceSpreadsheet = SpreadsheetApp
        .openById(sourceSpreadsheetId);

      let sourceSheet = sourceSpreadsheet
        .getSheetByName(sourceSheetName);

      let sourceRange = sourceSheet
        .getRange(sourceRangeIdentifier);

      dataExportValues = sourceRange
        .getValues();

      dataExportRows = sourceRange
        .getNumRows();
    } else {
      dataExportRows = dataExportValues
        .length;
    }

    let dataExportCols = dataExportValues[0]
        .length;

    let destinyRange = objectiveSheet
        .getRange(1, 2, dataExportRows, dataExportCols);

    objectiveMirrorSheet
      .clear();

    objectiveSheet
      .clear();

    SpreadsheetApp
        .flush();

    Utilities
        .sleep(30000);

    objectiveSheet
        .getRange(1,1,1)
        .setValue('index');

    objectiveSheet
        .getRange(2,1,1)
        .setValue('=ARRAYFORMULA(IF(B2:B="",,TEXT(ROW(A2:A), 0)))');

    destinyRange
        .setValues(dataExportValues);

    objectiveMirrorSheet
        .getRange(1,1,1)
        .setValue('=QUERY(' + objectiveSheetName + '!B1:AF,"SELECT * WHERE B is not null",1)');

    SpreadsheetApp.flush();
}