"""
 Application of Programming Principles
 Assignment Template 2021-22 - Flask & Python
"""
from flask import Flask, render_template, jsonify, request, make_response
import sys, json

app = Flask(__name__)


#@app.route('/')
#def hello_world():
   # return 'Hello World!'

@app.route('/')
def home():
    return render_template('index.html')


@app.route("/api/add", methods = ['GET'])
def add():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """

    # add your code here
    # use request.args.get('variablename') to get sent vars

    #return response


@app.route("/api/subtract", methods = ['GET'])
def subtract():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """


@app.route("/api/multiply", methods = ['GET'])
def multiply():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """


@app.route("/api/divide", methods = ['GET'])
def divide():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """


@app.route("/api/journal", methods = ['GET', 'PUT'])
def journal():
    """
    Write a function to
        read the entries in the file containing the journal entries in the data folder
        format the result into JSON response object
        return the JSON response object
    """



# run app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)