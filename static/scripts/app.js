/**
 * Application of Principles of Programming
 * Assignment Template 2021 - Javascript
 * @author Tim Orman
 */
console.log("hello from external app.js");
/**
 * event handlers can go here
 */
//calculator event handlers - one for each button
document.getElementById("btnAdd").addEventListener("click", addNumbers);
document.getElementById("btnAddAPI").addEventListener("click", addNumbersAPI);

document.getElementById("btnSubtract").addEventListener("click", subtractNumbers);
document.getElementById("btnSubtractAPI").addEventListener("click", subtractNumbersAPI);

document.getElementById("btnMultiply").addEventListener("click", multiplyNumbers);
document.getElementById("btnMultiplyAPI").addEventListener("click", multiplyNumbersAPI);

document.getElementById("btnDivide").addEventListener("click", divideNumbers);
document.getElementById("btnDivideAPI").addEventListener("click", divideNumbersAPI);

document.getElementById("listEntries").addEventListener('click', populateEntry);

document.getElementById("btnDeleteEntry").addEventListener('click', deleteEntry);
document.getElementById("btnAddEntry").addEventListener('click', addEntry);

// initialise journal list
document.addEventListener("DOMContentLoaded", function(){
    console.log("calling getJournal")
    getJournalEntries();
});

//utility functions - DO NOT EDIT OR DELETE
function getUniqueKey(){
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

//journal event handlers

/**
 * callAPI_calc()
 *
 * This function uses the built-in (to the browser) XMLHttpRequest object to request data from a server
 * The responseText property returns the response from the server as a string.
 *
 * You can use this function to complete calls to the api from the calculator functions.
 * Examine the url and elResponse parameters.
 * What types of values should they contain when passing them as arguments and calling this function?
 * @param url
 * @param elResponse
 */
function callAPI_calc(url, elResponse) {
    //use the code from the lab task to complete the function
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      let strResponse = "Error: no response";
      if (this.readyState == 4 && this.status == 200) {
        strResponse = JSON.parse(this.responseText);
      }
      document.getElementById(elResponse).setAttribute("value",  strResponse.result);
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

/**
 * Calculator Stuff
 */
/**
 * addNumbers()
 * This function does not use the app.py file to complete the task.
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 */
function addNumbers(){
    console.log("adding ");
    let num1 = Number(document.getElementById("add1").value);
    let num2 = Number(document.getElementById("add2").value);
    document.getElementById("inputAdd").setAttribute("value",  num1 + num2);
}

/**
 * addNumbersAPI()
 * This function should perform the calculation in the app.py file
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function addNumbersAPI(){
    //use the code from the lab task to complete the function
    console.log("adding on API");
    let num1 = Number(document.getElementById("add1").value);
    let num2 = Number(document.getElementById("add2").value);
    let url = "/api/add?num1=" + num1 + "&num2=" + num2;
    callAPI_calc(url, "inputAdd");
}

/**
 * subtractNumbers()
 * This function does not use the app.py file to complete the task.
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 */
function subtractNumbers(){
    console.log("subtracting ");
    let num1 = Number(document.getElementById("sub1").value);
    let num2 = Number(document.getElementById("sub2").value);
    document.getElementById("inputSubtract").setAttribute("value",  num1 - num2);
}

/**
 * subtractNumbersAPI()
 * This function should perform the calculation in the app.py file
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function subtractNumbersAPI(){
    console.log("subtracting on API");
    let num1 = Number(document.getElementById("sub1").value);
    let num2 = Number(document.getElementById("sub2").value);
    let url = "/api/subtract?num1=" + num1 + "&num2=" + num2;
    callAPI_calc(url, "inputSubtract");
}

/**
 * multiplyNumbers()
 * This function should perform the calculation in the app.py file
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 */
function multiplyNumbers(){
  console.log("multiplying");
  let num1 = Number(document.getElementById("multi1").value);
  let num2 = Number(document.getElementById("multi2").value);
  document.getElementById("inputMultiply").setAttribute("value",  num1 * num2);
}

/**
 * multiplyNumbersAPI()
  * This function should perform the calculation in the app.py file
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function multiplyNumbersAPI(){
  console.log("multiplying on API");
  let num1 = Number(document.getElementById("multi1").value);
  let num2 = Number(document.getElementById("multi2").value);
  let url = "/api/multiply?num1=" + num1 + "&num2=" + num2;
  callAPI_calc(url, "inputMultiply");
}

/**
 * divideNumbers()
 * This function does not use the app.py file to complete the task.
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 * NOTE: once you have this function operational you need to validate the divisor
 * and ensure you do not have divide by zero errors.
 */
function divideNumbers(){
  console.log("dividing");
  let num1 = Number(document.getElementById("divi1").value);
  let num2 = Number(document.getElementById("divi2").value);
  document.getElementById("inputDivide").setAttribute("value",  num1 / num2);
}

/**
 * divideNumbersAPI()
 * This function should perform the calculation in the app.py file
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function divideNumbersAPI(){
  console.log("dividing on API");
  let num1 = Number(document.getElementById("divi1").value);
  let num2 = Number(document.getElementById("divi2").value);
  let url = "/api/divide?num1=" + num1 + "&num2=" + num2;
  callAPI_calc(url, "inputDivide");
}

/**
 * Journal Stuff
 */




/**
 * getJournalEntries() - Get list of journal entries
 *
 * Write a function that will
 * * retrieve the JSON file of journal entries
 * * format the entries into a single string with appropriate html tags
 * * set the content of the "listEntries" element to the formatted string
 */
function getJournalEntries(){
  console.log("getting journal entries");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log("xhttp ready state recieved")
    if (this.readyState == 4 && this.status == 200) { 
      console.log("ready and OK");
      let journalResult = JSON.parse(this.responseText);
      console.log(journalResult);
      
      let journalList = "";
      for (let item of journalResult.journals) {
        journalList = journalList + "<li dat='" + String(item.date) +  "' name='" + String(item.name) + "' note='" + String(item.note) + "' id='itemEntry" + journalResult.journals.indexOf(item) + "'>" + String(item.date) + "</li>";}
     
    document.getElementById("listEntries").innerHTML = journalList;
    
    }
    else{
      console.log("xhttp request problem occurred")
    }
  }
  xhttp.open("GET", "api/journal", true);
  xhttp.send();
}
/**
 * Dont forget to call the function that will retrieve the list entries when the page loads
 */

/**
 * clearEntry()
 *
 * Write a function that will
 * * clear the selected entry inputs
 *
 */
function clearEntry(){
    document.getElementById("idEntry").value = "";
    document.getElementById("dateEntry").value = "";
    document.getElementById("namEntry").value = "";
    document.getElementById("txtNote").value = "";
}

/**
 * populateEntry(item)
 *
 * Write a function that will
 * * get the data for a single journal entry from item parameter
 * * extract the individual pieces of data from the entry
 * * and put each piece of information into the text fields on the html page
 * @param item
 */
function populateEntry(e){
    //clear old entry
    clearEntry()
    console.log("item: " + e.target);
    let itemIndex = e.target.id
    let itemDate = e.target.getAttribute("dat");
    let itemName = e.target.getAttribute("name");
    let itemNote = e.target.getAttribute("note");
    document.getElementById("idEntry").value = itemIndex;
    document.getElementById("dateEntry").value = itemDate;
    document.getElementById("namEntry").value = itemName;
    document.getElementById("txtNote").value = itemNote;
}

/**
 * addEntry() - add a journal entry
 *
 * Write a function that will
 * * create a new node list item element
 * * create a new text node element for the new list item and attach it to the new list item
 * * set other values of the list item - date, class, id, notes, student
 * * append the new node to the list of entries
 */
function addEntry(){
  let uid = getUniqueKey();
  console.log("uid: " + uid)
  const dat = new Date();
  let newDate = dat.getDate() + "/" + dat.getMonth() + "/" + dat.getFullYear();
  console.log("date: " + newDate);
  let newName = document.getElementById("nameAdd").value;
  let newNote = document.getElementById("txtAdd").value;
  if(newName == "" || newNote == ""){
    alert("Please enter values in the name and the notes inputs.")
  }
}

/**
 * deleteEntry()
 *
 * Write a function that will
 * * delete a journal entry (list item) from the html page
 */
function deleteEntry(){
  let idToDelete = document.getElementById("idEntry").value; 
  if(idToDelete != ""){
    document.getElementById(idToDelete).remove();
    //remove deleted details from selected entry boxes
    clearEntry()
  } else {
    alert("Please select an entry to delete.")
  }
 

}

/**
 * uploadJournal()
 *
 * Write a function that will
 * * get the data from the list entries on the html page
 * * put the entries from the list into a collection
 * * convert the collection into a JSON object
 * * send JSON object to the url in the flask api
 * * and handle the response
 */
function uploadJournal(){

}


