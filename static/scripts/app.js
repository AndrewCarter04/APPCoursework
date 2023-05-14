/*
 * Application of Principles of Programming
 * Assignment Submission
 *
 * UTILITY FUNCTIONS ARE STORED IN 'utils.js'
 */

/*
 * Event Handlers - had to call them after DOM loaded, otherwise the 
 * console was giving a null error for each element
 */

function addEventHandlers() {
  
  document.getElementById("btnUploadList").addEventListener("click", uploadEntries);

  document.getElementById("btnAddEntry").addEventListener("click", addEntry);
  
}

/**
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

// Get entries via API and insert them into the DOM
function getToDoEntries() {
  
  var xhttp = new XMLHttpRequest();
  var url = "api/todo";
  
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      
      let response = JSON.parse(this.responseText);
      serverJSON = response;

      for (let entry of response.entries) {

        let tableRecord = document.createElement("tr");

        tableRecord.id = "tableRecord" + entry.id;
        
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
        
      }
      
    }
    
  }

  xhttp.open("GET", url, true);
  xhttp.send();
  
}

// extract entries from the DOM and upload them via the API
function uploadEntries() {

  //console.log(isEditing());

  if (!isEditing()) {
  
    var jsonData = {entries:[]};
    var strData = "";

    var tableBody = document.getElementById("listTableBody");
    var tableRecords = tableBody.getElementsByTagName("tr");

    for (let i = 0; i < tableRecords.length; i++) {
    
      let tableRecord = tableRecords[i];
      let tableData = tableRecord.getElementsByTagName("td");

      let jsonEntry = {};
    
      jsonEntry.id = tableData[0].innerText;
      jsonEntry.summary = tableData[1].innerText;
      jsonEntry.description = tableData[2].innerText;
      jsonEntry.priority = tableData[3].innerText.charAt(0);
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

        if (this.status == 200) updateLocalChanges(false);
      
      }
    
    }
  
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

// change the table record to input boxes rather than text, so it can be edited
function editEntry(entry) {
  console.log("edit entry id " + entry);
  var tableRecord = document.getElementById("tableRecord" + entry);
  var trChildren = tableRecord.querySelectorAll("td");

  trChildren[0].innerHTML = "<input type='text' id='txtIdEntry" + entry + "' class='w3-input w3-border w3-round' value='" + trChildren[0].innerText + "' disabled>";
  trChildren[1].innerHTML = "<input type='text' id='txtSummaryEntry" + entry + "' class='w3-input w3-border w3-round' value='" + trChildren[1].innerText + "'>";
  trChildren[2].innerHTML = "<input type='text' id='txtDescEntry" + entry + "' class='w3-input w3-border w3-round' value='" + trChildren[2].innerText + "'>";

  var priorityStr = trChildren[3].innerText.charAt(0);
  var priorityHTML = "<select id='selectPriorityEntry" + entry + "'>";
  
  // for loop, 1-5, selected to the current one

  for (var i = 1; i < 6; i++) {
    fullPriorityStr = i.toString();
    if (i.toString() == priorityStr) {
      priorityHTML += "<option value='" + i.toString() + "' selected>";
    } else {
      priorityHTML += "<option value='" + i.toString() + "'>";
    }
    priorityHTML += getStringPriority(i.toString()) + "</option>";
  }
  
  priorityHTML += "</select>";

  trChildren[3].innerHTML = priorityHTML;
  
  var creationDateArr = trChildren[4].innerText.split("/");
  var dueDateArr = trChildren[5].innerText.split("/");

  var creationDate = creationDateArr[2] + "-" + creationDateArr[1] + "-" + creationDateArr[0];
  var dueDate = dueDateArr[2] + "-" + dueDateArr[1] + "-" + dueDateArr[0];
  
  trChildren[4].innerHTML = "<input type='date' id='dateCreatedEntry" + entry + "' class='w3-input w3-border w3-round' value='" + creationDate + "' disabled>";
  trChildren[5].innerHTML = "<input type='date' id='dateDueEntry" + entry + "' class='w3-input w3-border w3-round' value='" + dueDate + "'>"; 

  trChildren[6].innerHTML = "<button id='saveEntry" + entry + "' class='w3-button w3-theme-d5 w3-margin-top'>Save</button>";

  document.getElementById("saveEntry" + entry).addEventListener("click", function() {updateEntry(entry);});
  
}

// save the local changes to the DOM
function updateEntry(entry) {
  console.log("update entry id " + entry);
  var tableRecord = document.getElementById("tableRecord" + entry);
  var trChildren = tableRecord.querySelectorAll("td");

  var id = trChildren[0].querySelector("input").getAttribute("value");
  var summary = trChildren[1].querySelector("input").getAttribute("value");
  var description = trChildren[2].querySelector("input").getAttribute("value");
  var priority = getStringPriority(trChildren[3].querySelector("select").value);
  var creationDate = new Date(trChildren[4].querySelector("input").value).toLocaleDateString('en-GB');
  var dueDate = new Date(trChildren[5].querySelector("input").value).toLocaleDateString('en-GB');
  
  trChildren[0].innerHTML = id;
  trChildren[1].innerHTML = summary;
  trChildren[2].innerHTML = description;
  trChildren[3].innerHTML = priority;
  trChildren[4].innerHTML = creationDate;
  trChildren[5].innerHTML = dueDate;

  trChildren[6].innerHTML = "<button id='editEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>" + "<button id='deleteEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button>";
  
  document.getElementById("editEntry" + id).addEventListener("click", function() {editEntry(id);});

  document.getElementById("deleteEntry" + id).addEventListener("click", function() {deleteEntry(id);});
  
  updateLocalChanges(true);
  
}

// delete an entry from the DOM
function deleteEntry(entry) {
  console.log("delete entry " + entry);

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

function addEntry() {

  // input validation goes here
  
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

  tableData += "<td><button id='editEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Edit</button>";
        tableData += "<button id='deleteEntry" + id + "' class='w3-button w3-theme-d5 w3-margin-top'>Delete</button></td>";
  
  tableRecord.innerHTML = tableData;

  document.getElementById("listTableBody").appendChild(tableRecord);

  document.getElementById("editEntry" + id).addEventListener("click", function() {editEntry(id);});

  document.getElementById("deleteEntry" + id).addEventListener("click", function() {deleteEntry(id);});
  
  updateLocalChanges(true);
  
}