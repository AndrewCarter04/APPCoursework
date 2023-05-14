/*
 *
 *  Utility Functions
 *
 */
function getUniqueKey() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

/** 
 * Adds the description to priorty number
 * @example
 * // returns "1 - Highest" 
 * getStringPriority(1);
 * @param {String} number - The priority number
 * @returns {String} - The priority with the relevant description concatenated
*/
function getStringPriority(number) {
  let priority = number;
  switch (number) {
    case "1":
      priority += " - Highest";
      break;
    case "2":
      priority += " - High";
      break;
    case "3":
      priority += " - Medium";
      break;
    case "4":
      priority += " - Low";
      break;
    case "5":
      priority += " - Lowest";
      break;
  } 
  return priority;
}

/**
 * Check to see if any of the entries are currently being edited by the user
 * @returns {Boolean} - If any of the entries are currently being edited
 */
function isEditing() {

  var editing = false;
  
  var tableBody = document.getElementById("listTableBody");
  var tableRecords = tableBody.querySelectorAll("tr");

  for (var tableRecord of tableRecords) {
    var idEntry = tableRecord.querySelector("td");
    if (idEntry.innerHTML.startsWith("<input")) {
      editing = true;
    }
  }

  return editing;
  
}

/**
 * Sets the 'Changed saved' text to display the relevant information
 * @param {Boolean} localChanges - If there are local changes or not
 */
function updateLocalChanges(localChanges) {
  
  var uploadStatus = document.getElementById("uploadChangesStatus");
  
  if (!localChanges) {
    uploadStatus.className = "uploadChangesSaved";
    uploadStatus.textContent = "All changes saved.";
  } else {
    uploadStatus.className = "uploadChangesNotSaved";
    uploadStatus.textContent = "Changes not saved!";
  }
  
}