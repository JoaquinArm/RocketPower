/*
*   Details:
*       Similar in functionality to dataExport but using a more comprehensive and precise method. The main downside of
*       this approach is the amount of time required to process a big amount of data. A solution could be to use first
*       dataExport as the main source of new data and the periodically run dataExportAlternative if necessary.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function dataExportAlternative (sourceSpreadsheetId, sourceSheetName, objectiveSpreadsheetId, objectiveSheetName, objectiveMirrorSheet, functionCaller) {

    let sourceSpreadsheet = SpreadsheetApp
        .openById(sourceSpreadsheetId);

    let sourceSheet = sourceSpreadsheet
        .getSheetByName(sourceSheetName);

    let objectiveSpreadsheet = SpreadsheetApp
        .openById(objectiveSpreadsheetId);

    let objectiveSheet = objectiveSpreadsheet
        .getSheetByName(objectiveSheetName);

    let avatureDataSheet = objectiveSpreadsheet
        .getSheetByName(objectiveMirrorSheet);

    if (objectiveSheet == null) {
        objectiveSpreadsheet
            .insertSheet(objectiveSheet);

        objectiveSheet = objectiveSpreadsheet
            .getSheetByName(objectiveSheetName);
    }

    if (avatureDataSheet == null) {
        objectiveSpreadsheet.insertSheet(objectiveMirrorSheet);
        avatureDataSheet = objectiveSpreadsheet
          .getSheetByName(objectiveMirrorSheet);
    } else {
        avatureDataSheet = objectiveSpreadsheet
          .getSheetByName(objectiveMirrorSheet);
        avatureDataSheet.clear()
    }

    let startTime = timeoutHandler(functionCaller);

    let sourceRange = sourceSheet
        .getRange('A:AF');

    let dataExportValues = sourceRange
        .getValues();

    let objectiveRange = objectiveSheet
        .getRange('A:AF');

    let dataImportValues = objectiveRange
        .getValues();


    for (let main_iterator = 0; main_iterator <=dataExportValues.length; main_iterator++) {
        let deltaHour = new Date()
          .getHours() * 60;
        let deltaMins = new Date()
          .getMinutes();
        let deltaTime = deltaHour + deltaMins;

        if (deltaTime === startTime) {
            ScriptApp.newTrigger(functionCaller)
                .timeBased()
                .after(5 * 60 * 1000)
                .create();
                break;
        }

        let dataExportSample = dataExportValues[main_iterator];
        let dataImportSample = dataImportValues[main_iterator];

        if (dataImportSample != undefined) {
            for (let secondary_iterator=0; secondary_iterator < dataExportSample.length; secondary_iterator++) {
                if (dataExportSample[secondary_iterator] != dataImportSample[secondary_iterator]) {
                    temp_range = objectiveSheet
                      .getRange(main_iterator+1, secondary_iterator+1)
                      .setValue(dataExportSample[secondary_iterator]);
                }
            }
        } else {
            objectiveSheet
              .appendRow(dataExportValues[main_iterator]);
        }
    }

    avatureDataSheet
      .getRange(1,1,1)
      .setValue('=QUERY(' + objectiveSheetName + '!B1:AF,"SELECT * WHERE B is not null",1)');

    SpreadsheetApp.flush();
}

