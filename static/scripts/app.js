/*
 * Application of Principles of Programming
 * Assignment Submission
 */

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

/*
 * Event Handlers - had to call them after DOM loaded, otherwise the 
 * console was giving a null error for each element
 */

/**
 * Adds all the on click event listeners for the buttons. Run when the DOM has loaded
 */
function addEventHandlers() {
  
  document.getElementById("btnUploadList").addEventListener("click", uploadEntries);

  document.getElementById("btnAddEntry").addEventListener("click", addEntry);
  
}

/*
 * Initialisation
 */
document.addEventListener("DOMContentLoaded", function() {
  addEventHandlers(); // only works after DOM loaded, otherwise null error
  getToDoEntries();
});

/*
 *
 *  API Functions
 *
 */

/**
 * Gets the to-do list entries via the Flask API, and create the relevant table records in the DOM to display the data, and allow it to be edited or deleted
 */
function getToDoEntries() {
  
  var xhttp = new XMLHttpRequest();
  var url = "api/todo";
  
  xhttp.onreadystatechange = function() {

    // ready and OK
    if (this.readyState == 4 && this.status == 200) {
      
      let response = JSON.parse(this.responseText);

      for (let entry of response.entries) {
        // create table record element
        let tableRecord = document.createElement("tr");

        tableRecord.id = "tableRecord" + entry.id;

        let tableData = "<td>" + entry.id + "</td>";
        tableData += "<td>" + entry.summary + "</td>";
        tableData += "<td>" + entry.description + "</td>";
        tableData += "<td>" + getStringPriority(entry.priority) + "</td>";
        // had to use the square bracket method, as there is a '-' in the key
        tableData += "<td>" + entry['creation-date'] + "</td>";
        tableData += "<td>" + entry['due-date'] + "</td>";

        // button inner HTML
        tableData += "<td><button id='editEntry" + entry.id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>";
        tableData += "<button id='deleteEntry" + entry.id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button></td>";

        tableRecord.innerHTML = tableData;

        document.getElementById("listTableBody").appendChild(tableRecord);

        // add event listeners for the 'edit' and 'delete' buttons in the table
        document.getElementById("editEntry" + entry.id).addEventListener("click", function() {editEntry(entry.id);});
        document.getElementById("deleteEntry" + entry.id).addEventListener("click", function() {deleteEntry(entry.id);});
        
      }
      
    }
    
  }

  // send the request
  xhttp.open("GET", url, true);
  xhttp.send();
  
}

/**
 * Extracts the to-do entries from the DOM, puts it into JSON format, and then uploads it to the Flask API
 */
function uploadEntries() {

  if (!isEditing()) {
  
    var jsonData = {entries:[]};
    var strData = "";

    var tableBody = document.getElementById("listTableBody");
    // get array of all table records
    var tableRecords = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < tableRecords.length; i++) {
    
      let tableRecord = tableRecords[i];
      // get array of all table data entries
      let tableData = tableRecord.getElementsByTagName("td");

      let jsonEntry = {};
    
      jsonEntry.id = tableData[0].innerText;
      jsonEntry.summary = tableData[1].innerText;
      jsonEntry.description = tableData[2].innerText;
      jsonEntry.priority = tableData[3].innerText.charAt(0);
      // had to use the square bracket method for these two, as they have a "-" in the key
      jsonEntry['creation-date'] = tableData[4].innerText;
      jsonEntry['due-date'] = tableData[5].innerText;

      // add the JSON entry to the 'entries' JSON Array
      jsonData.entries.push(jsonEntry);
    
    }
  
    // convert the JSON to a string, as it can only be sent as a string
    strData = JSON.stringify(jsonData);
  
    var xhttp = new XMLHttpRequest();
    var url = "api/todo";
  
    xhttp.onreadystatechange = function() {

      // default response
      response = {message:"No response from server."}
    
      // ready and (OK or Failed)
      if (this.readyState == 4 && (this.status == 200 || this.status == 400)) {

        response = JSON.parse(this.responseText);

        alert(response.message);

        // only change local changes boolean if status is OK
        if (this.status == 200) updateLocalChanges(false);
      
      }
    
    }
  
    // send the data
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(strData);
    
  } else {

    alert("You cannot upload changes while editing an entry! Please save the entry, and then try again.");
    
  }
  
}

/*
 *
 *  Table Buttons (Edit, Delete and Save)
 *
 */

/**
 * Change the table record to allow user input
 * @param {String} entry - the ID of the entry to be edited
 */
function editEntry(entry) {

  // get specific table record
  var tableRecord = document.getElementById("tableRecord" + entry);
  // get all table data entries
  var trChildren = tableRecord.querySelectorAll("td");

  // set first 3 input text boxes
  trChildren[0].innerHTML = "<input type='text' id='txtIdEntry" + entry + "' class='w3-input w3-border w3-round' value='" + trChildren[0].innerText + "' disabled>";
  trChildren[1].innerHTML = "<input type='text' id='txtSummaryEntry" + entry + "' class='w3-input w3-border w3-round' value='" + trChildren[1].innerText + "'>";
  trChildren[2].innerHTML = "<input type='text' id='txtDescEntry" + entry + "' class='w3-input w3-border w3-round' value='" + trChildren[2].innerText + "'>";

  var priorityStr = trChildren[3].innerText.charAt(0);
  // build a select HTML element string
  var priorityHTML = "<select id='selectPriorityEntry" + entry + "'>";

  // 1 to 5 inclusive
  for (var i = 1; i < 6; i++) {
    fullPriorityStr = i.toString();
    if (i.toString() == priorityStr) {
      // if equal to the current value, set it to selected
      priorityHTML += "<option value='" + i.toString() + "' selected>";
    } else {
      priorityHTML += "<option value='" + i.toString() + "'>";
    }
    priorityHTML += getStringPriority(i.toString()) + "</option>";
  }
  
  priorityHTML += "</select>";

  trChildren[3].innerHTML = priorityHTML;
  
  // create arrays which contain the day of month, month and year
  var creationDateArr = trChildren[4].innerText.split("/");
  var dueDateArr = trChildren[5].innerText.split("/");

  // create string dates in the correct format to be understood by the input type date
  var creationDate = creationDateArr[2] + "-" + creationDateArr[1] + "-" + creationDateArr[0];
  var dueDate = dueDateArr[2] + "-" + dueDateArr[1] + "-" + dueDateArr[0];
  
  trChildren[4].innerHTML = "<input type='date' id='dateCreatedEntry" + entry + "' class='w3-input w3-border w3-round' value='" + creationDate + "' disabled>";
  trChildren[5].innerHTML = "<input type='date' id='dateDueEntry" + entry + "' class='w3-input w3-border w3-round' value='" + dueDate + "'>"; 

  // create a save button
  trChildren[6].innerHTML = "<button id='saveEntry" + entry + "' class='w3-button w3-theme-d5 w3-margin-top'>Save</button>";

  // add an event listener for the save button
  document.getElementById("saveEntry" + entry).addEventListener("click", function() {updateEntry(entry);});
  
}

/**
 * Save the local edits to the DOM, removing the ability to edit the entry
 * @param {String} entry - the ID of the entry to be saved to the DOM
 */
function updateEntry(entry) {
  
  // get specific table record
  var tableRecord = document.getElementById("tableRecord" + entry);
  // get all table data entries
  var trChildren = tableRecord.querySelectorAll("td");

  // get all the entry data
  var id = trChildren[0].querySelector("input").getAttribute("value");
  var summary = trChildren[1].querySelector("input").getAttribute("value");
  var description = trChildren[2].querySelector("input").getAttribute("value");
  var priority = getStringPriority(trChildren[3].querySelector("select").value);
  var creationDate = new Date(trChildren[4].querySelector("input").value).toLocaleDateString('en-GB');
  var dueDate = new Date(trChildren[5].querySelector("input").value).toLocaleDateString('en-GB');
  
  // set all the entry data, with no HTML tag, as it is already in a '<td>' tag
  trChildren[0].innerHTML = id;
  trChildren[1].innerHTML = summary;
  trChildren[2].innerHTML = description;
  trChildren[3].innerHTML = priority;
  trChildren[4].innerHTML = creationDate;
  trChildren[5].innerHTML = dueDate;

  // add edit and delete buttons
  trChildren[6].innerHTML = "<button id='editEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>" + "<button id='deleteEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button>";
  
  // add event listeners for edit and delete buttons
  document.getElementById("editEntry" + id).addEventListener("click", function() {editEntry(id);});
  document.getElementById("deleteEntry" + id).addEventListener("click", function() {deleteEntry(id);});
  
  updateLocalChanges(true);
  
}

/**
 * Delete an entry from the DOM
 * @param {String} entry - the ID of the entry to be deleted
 */
function deleteEntry(entry) {

  // confirmation window, to prevent accidental clicks
  if (confirm("To confirm deletion of entry, press 'OK'.")) {

    var tableRecord = document.getElementById("tableRecord" + entry);

    tableRecord.remove();

    updateLocalChanges(true);
    
    alert("Entry deleted!");
    
  }
  
}

/*
 *
 *  Add entry
 *
 */

/**
 * Add a new entry to the DOM
 */
function addEntry() {

  // input validation
  var validInputs = true;

  if (document.getElementById("txtSummaryEntry").value == "") {
    validInputs = false;
    alert("Please enter a summary!");
  } else if (document.getElementById("txtDescEntry").value == "") {
    validInputs = false;
    alert("Please enter a description!");
  } else if (document.getElementById("dateDueEntry").value == "") {
    validInputs = false;
    alert("Please enter a due date!");
  }

  if (validInputs) {
  
    var tableRecord = document.createElement("tr");
    var tableData = "";

    var currentDate = new Date();
    var inputDueDate = new Date(document.getElementById("dateDueEntry").value);
  
    var id = getUniqueKey();
    var summary = document.getElementById("txtSummaryEntry").value;
    var description = document.getElementById("txtDescEntry").value;
    var priority = getStringPriority(document.getElementById("selectPriorityEntry").value);
    var creationDate = currentDate.toLocaleDateString('en-GB');
    var dueDate = inputDueDate.toLocaleDateString('en-GB');

    tableRecord.setAttribute("id", "tableRecord" + id);
  
    tableData += "<td>" + id + "</td>";
    tableData += "<td>" + summary + "</td>";
    tableData += "<td>" + description + "</td>";
    tableData += "<td>" + priority + "</td>";
    tableData += "<td>" + creationDate + "</td>";
    tableData += "<td>" + dueDate + "</td>";

    // create edit and delete buttons
    tableData += "<td><button id='editEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>";
    tableData += "<button id='deleteEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button></td>";
  
    tableRecord.innerHTML = tableData;

    document.getElementById("listTableBody").appendChild(tableRecord);

    // add event listeners for edit and delete buttons
    document.getElementById("editEntry" + id).addEventListener("click", function() {editEntry(id);});
    document.getElementById("deleteEntry" + id).addEventListener("click", function() {deleteEntry(id);});
  
    updateLocalChanges(true);

  }
  
}