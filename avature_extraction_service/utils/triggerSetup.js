/*
*   Details:
*       The function is used to setup the main trigger of the project.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function triggerSetup() {

  projectTriggers = ScriptApp.getProjectTriggers();

  for (let iterator = 0; iterator < projectTriggers.length; iterator++) {
    ScriptApp.deleteTrigger(projectTriggers[iterator]);
  }

  ScriptApp.newTrigger('triggerFunctionDataExport')
    .timeBased()
    .everyHours(1)
    .create();
}
