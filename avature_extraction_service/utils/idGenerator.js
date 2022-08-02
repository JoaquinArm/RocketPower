/*
*   Details:
*       Function used to generate unique ID's for a dataset.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function idGenerator (sourceSpreadsheetId, sourceSheetName) {

    let sourceSpreadsheet = SpreadsheetApp
        .openById(sourceSpreadsheetId);

    let sourceSheet = sourceSpreadsheet
        .getSheetByName(sourceSheetName);

    let rows = sourceSheet.getDataRange()
        .getNumRows();

    for (let iterator = 0; iterator < rows; iterator++) {

        if (iterator === 0) {

          let loopRange = source_sheet
              .getRange(iterator+1, 1, 1);
          let loopRange
              .setValue('entry_id');

        } else {

          let loopRange = sourceSheet
              .getRange(iterator+1, 1, 1);
          let loopRange
              .setValue('AVA-RP000' + String(iterator));

        }
    }
}
