"""
 Application of Programming Principles
 Assignment Template 2021-22 - Flask & Python
 
"""
from flask import Flask, render_template, jsonify, request, make_response
import sys, json

app = Flask(__name__)

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
    total = 0
    # use request.args.get('variablename') to get sent vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 + num2
    # end
    response = make_response(
                jsonify(
                    {"result": str(total)}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    return response


@app.route("/api/subtract", methods = ['GET'])
def subtract():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    print("subtracting on api")
    # add your code start line
    # use request.args.get('variablename') to get vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 - num2
    # end
    print("total = " + str(total))
    response = make_response(
                jsonify(
                    {"result": str(total)}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    print("after response made: " + str(response))
    return response

@app.route("/api/multiply", methods = ['GET'])
def multiply():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    print("multiplying on api")
    # add your code start line
    # use request.args.get('variablename') to get vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 * num2
    # end
    print("total = " + str(total))
    response = make_response(
                jsonify(
                    {"result": str(total)}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    print("after response made: " + str(response))
    return response

@app.route("/api/divide", methods = ['GET'])
def divide():
    """
    Write a function to
        receive values from the request object
        complete the calculation
        format the result into JSON
        return the JSON response object
    """
    # print("dividing on api")
    # add your code start line
    # use request.args.get('variablename') to get vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 / num2
    # end
    # print("total = " + str(total))
    response = make_response(
                jsonify(
                    {"result": str(total)}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    # print("after response made: " + str(response))
    return response

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