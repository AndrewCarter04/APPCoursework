/**
 * Application of Principles of Programming
 * Assignment Submission
 */

//utility functions - DO NOT EDIT OR DELETE
function getUniqueKey() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

// add the description to priorty number, eg: "1 - Highest"
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
 * Event Handlers - had to call them after DOM loaded, otherwise the console was giving a null error for each element
 */

function addEventHandlers() {
  
  document.getElementById("btnUploadList").addEventListener("click", uploadEntries);

  //document.getElementById("btnUpdateItem").addEventListener("click", updateEntry);
  //document.getElementById("btnDeleteItem").addEventListener("click", deleteEntry);

  document.getElementById("btnAddEntry").addEventListener("click", addEntry);

  document.getElementById("btnSaveEdit").addEventListener("click", saveEditEntry);
  
}

/**
 * Initialisation
 */

document.addEventListener("DOMContentLoaded", function() {
  addEventHandlers(); // only works after DOM loaded, otherwise null error
  getToDoEntries();
});

/**
 * To-Do List
 */

function getToDoEntries() {

  //console.log("get todo entries");
  
  var xhttp = new XMLHttpRequest();
  var url = "api/todo";
  
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      
      //console.log("ready and OK");
      
      let response = JSON.parse(this.responseText);
      serverJSON = response;

      for (let entry of response.entries) {

        let tableRecord = document.createElement("tr");

        tableRecord.id = entry.id;
        
        let tableData = "";

        tableData += "<td>" + entry.id + "</td>";
        tableData += "<td>" + entry.summary + "</td>";
        tableData += "<td>" + entry.description + "</td>";
        tableData += "<td>" + getStringPriority(entry.priority) + "</td>";
        tableData += "<td>" + entry['creation-date'] + "</td>";
        tableData += "<td>" + entry['due-date'] + "</td>";

        tableData += "<td><button id='editEntry" + entry.id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>";
        tableData += "<button id='deleteEntry" + entry.id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button></td>";

        tableRecord.innerHTML = tableData;

        document.getElementById("listTableBody").appendChild(tableRecord);

        document.getElementById("editEntry" + entry.id).addEventListener("click", function() {editEntry(entry.id);});

        document.getElementById("deleteEntry" + entry.id).addEventListener("click", function() {deleteEntry(entry.id);});
        
        // old code - using the list. Replaced by code to use the table
        /*let element = document.createElement("li");
        
        element.setAttribute("entryId", entry.id); // changed from "id", conflict
        element.setAttribute("summary", entry.summary);
        element.setAttribute("description", entry.description);
        element.setAttribute("priority", entry.priority);
        element.setAttribute("creation-date", entry["creation-date"]); // used square brackets so it is not interpreted as subtraction
        element.setAttribute("due-date", entry["due-date"]); // used square brackets so it is not interpreted as subtraction
        element.textContent = entry.summary; // future - include due date
        
        document.getElementById("listItems").appendChild(element);*/
        
      }
      
    }
    
  }

  xhttp.open("GET", url, true);
  xhttp.send();
  
}

function editEntry(entry) {
  console.log("edit entry " + entry);
}

function saveEditEntry() {
  // hide div after saving
}

function deleteEntry(entry) {
  console.log("delete entry " + entry);
}

function uploadEntries() {

  var jsonData = {entries:[]};
  var strData = "";

  var tableBody = document.getElementById("listTableBody");
  var tableRecords = tableBody.getElementsByTagName("tr");

  // for loop - each list item

  for (let i = 0; i < tableRecords.length; i++) {
    
    let tableRecord = tableRecords[i];
    let tableData = tableRecord.getElementsByTagName("td");

    let jsonEntry = {};
    
    jsonEntry.id = tableData[0].innerText;
    jsonEntry.summary = tableData[1].innerText;
    jsonEntry.description = tableData[2].innerText;
    jsonEntry.priority = tableData[3].innerText;
    // had to use the square bracket method for these two, as they have a "-" in the key
    jsonEntry['creation-date'] = tableData[4].innerText;
    jsonEntry['due-date'] = tableData[5].innerText;

    jsonData.entries.push(jsonEntry);
    
  }
  
  strData = JSON.stringify(jsonData);
  
  var xhttp = new XMLHttpRequest();
  var url = "api/todo";
  
  xhttp.onreadystatechange = function() {

    response = {message:"No response from server."}
    
    if (this.readyState == 4 && (this.status == 200 || this.status == 400)) {

      response = JSON.parse(this.responseText);

      alert(response.message);

      if(this.status == 200) updateLocalChanges(false);
      
    }
    
  }
  
  xhttp.open("PUT", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(strData);
  
}

function addEntry() {

  // input validation goes here
  
  var tableRecord = document.createElement("tr");
  var tableData = "";

  var currentDate = new Date();
  
  var id = getUniqueKey();
  var summary = document.getElementById("txtSummaryEntry").value;
  var description = document.getElementById("txtDescEntry").value;
  var priority = getStringPriority(document.getElementById("selectPriorityEntry").value);
  var creationDate = currentDate.toLocaleDateString('en-GB');
  var dueDate = new Date(document.getElementById("dateDueEntry").value).toLocaleDateString();

  tableData += "<td>" + id + "</td>";
  tableData += "<td>" + summary + "</td>";
  tableData += "<td>" + description + "</td>";
  tableData += "<td>" + priority + "</td>";
  tableData += "<td>" + creationDate + "</td>";
  tableData += "<td>" + dueDate + "</td>";

  tableData += "<td><button id='editEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>";
        tableData += "<button id='deleteEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button></td>";
  
  tableRecord.innerHTML = tableData;

  document.getElementById("listTableBody").appendChild(tableRecord);

  document.getElementById("editEntry" + id).addEventListener("click", function() {editEntry(id);});

  document.getElementById("deleteEntry" + id).addEventListener("click", function() {deleteEntry(id);});
  
  updateLocalChanges(true);
  
}

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