/*
*   Details:
*       The function iterates through all the project triggers and delete those which share the name with the function
*       doing the call. After cleaning the present trigger, it returns current time in miliseconds.
*   Date:
*       07-25-2022
*   Author:
*       Joaquin Armesto
*/

function timeoutHandler (functionCaller) {

    let triggers = ScriptApp
        .getProjectTriggers();

    for (let iterator = 0; iterator < triggers.length; iterator++) {
        if (triggers[iterator].getHandlerFunction() === functionCaller) {
            ScriptApp
                .deleteTrigger(triggers[iterator]);
        }
    }

    let startHour = new Date()
        .getHours() * 60;

    let startMins = new Date()
        .getMinutes();

    let startTime = startHour + startMins + 20;

    return startTime;
}
