"""
 Application of Programming Principles
 Assignment Template 2021-22 - Flask & Python
 
"""
from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os

app = Flask(__name__)


@app.route('/')
def home():
    """
        This code returns the index page to the browser. 
    """
    return render_template('index.html')


# calculator


@app.route("/api/add", methods=['GET'])
def add():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    print("adding on api")
    # add your code here
    
    # use request.args.get('variablename') to get sent vars
    
    # end
    


@app.route("/api/subtract", methods=['GET'])
def subtract():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    print("subtracting on api")

    


@app.route("/api/multiply", methods=['GET'])
def multiply():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    print("multiplying on api")
    # use request.args.get('variablename') to get vars



@app.route("/api/divide", methods=['GET'])
def divide():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    print("dividing on api")
   


# Journal functions


@app.route("/api/journal", methods=['GET'])
def journal():
    """
    Write a function to
        read the entries in the file containing the journal entries in the data folder
        format the result into JSON response object
        return the JSON response object
    """
    print("getting journal on api")
    


@app.route("/api/journal", methods=['PUT'])
def upload():
    """
    Write a function to
        receive json data from the request object
        and save it into the journal.json file
        return the JSON response object
    """
    print('saving Journal on api')
    


# run app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
