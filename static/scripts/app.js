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

//journal event handlers

document.getElementById("listEntries").addEventListener('click', populateEntry);

document.getElementById("btnDeleteEntry").addEventListener('click', deleteEntry);
document.getElementById("btnAddEntry").addEventListener('click', addEntry);

document.getElementById("btnUploadJournal").addEventListener('click', uploadJournal);

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
   
}

/**
 * Calculator Stuff
 */
/**
 * addNumbers()
 * This function does not use the main.py file to complete the task.
 *
 * Write a function that will
 * * retrieve the values from the text box elements on the page (see index.html page for ids of these elements)
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 */
function addNumbers(){
    console.log("adding ");
    
}

/**
 * addNumbersAPI()
 * This function should perform the calculation in the main.py file
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function addNumbersAPI(){
    //use the code from the lab task to complete the function
    console.log("adding on API");
    
}

/**
 * subtractNumbers()
 * This function does not use the app.py file to complete the task.
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 */
function subtractNumbers(){
    console.log("subtracting ");
    
}

/**
 * subtractNumbersAPI()
 * This function should perform the calculation in the main.py file
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function subtractNumbersAPI(){
    console.log("subtracting on API");
    
}

/**
 * multiplyNumbers()
 * This function should perform the calculation in the main.py file
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 */
function multiplyNumbers(){
  
}

/**
 * multiplyNumbersAPI()
  * This function should perform the calculation in the main.py file
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function multiplyNumbersAPI(){
  console.log("multiplying on API");
  
}

/**
 * divideNumbers()
 * This function does not use the app.py file to complete the task.
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * perform the calculation
 * * set the result element in the html page to display the result of the calculation
 * NOTE: once you have this function operational you need to validate the divisor
 * and ensure you do not have divide by zero errors.
 */
function divideNumbers(){
  console.log("dividing");
  
}

/**
 * divideNumbersAPI()
 * This function should perform the calculation in the main.py file
 *
 * Write a function that will
 * * retrieve the values from the appropriate text box elements on the page
 * * form a url string with the values as arguments
 * * Use callAPI() function to form and send a request object
 */
function divideNumbersAPI(){
  console.log("dividing on API");
  
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
  console.log("Add entry")
  let uid = getUniqueKey();

}

/**
 * deleteEntry()
 *
 * Write a function that will
 * * delete a journal entry (list item) from the html page
 */
function deleteEntry(){
  console.log("Delete entry")
  

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
  console.log("Upload journal");
  
}


