/*
*   Details:
*       The function iterates through all the projects and run the function dataCapture for each.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function triggerFunctionDataExport() {
  try {
    for (let iterator = 0; iterator < Object.keys(projects).length; iterator++) {
      dataCapture(
        PROJECTS[Object.keys(PROJECTS)[iterator]]['source_url'],
        '',
        '',
        '',
        PROJECTS[Object.keys(PROJECTS)[iterator]]['objective_id'],
        PROJECTS[Object.keys(PROJECTS)[iterator]]['objective_sheet'],
        PROJECTS[Object.keys(PROJECTS)[iterator]]['objective_sheet'],
        PROJECTS[Object.keys(PROJECTS)[iterator]]['objective_mirror']
        )
    }
  } catch (err) {

    console.log(err)
    triggerFunctionDataExport()
  }
}
