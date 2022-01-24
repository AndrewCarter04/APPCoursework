"""
 Application of Programming Principles
 Assignment Template 2021-22 - Flask & Python
 
"""
from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os

app = Flask(__name__)


@app.route('/')
def home():
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

    # add your code here
    total = 0
    # use request.args.get('variablename') to get sent vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 + num2
    # end
    response = make_response(
        jsonify({"result": str(total)}),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    return response


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
    # add your code start line
    # use request.args.get('variablename') to get vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 - num2
    # end
    print("total = " + str(total))
    response = make_response(
        jsonify({"result": str(total)}),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    print("after response made: " + str(response))
    return response


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
    # add your code start line
    # use request.args.get('variablename') to get vars
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))
    total = num1 * num2
    # end
    print("total = " + str(total))
    response = make_response(
        jsonify({"result": str(total)}),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    print("after response made: " + str(response))
    return response


@app.route("/api/divide", methods=['GET'])
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
        jsonify({"result": str(total)}),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    # print("after response made: " + str(response))
    return response


# Journal functions


@app.route("/api/journal", methods=['GET'])
def journal():
    """
    Write a function to
        read the entries in the file containing the journal entries in the data folder
        format the result into JSON response object
        return the JSON response object
    """
    # file_name = "data/journal_test.json"
    site_root = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_root, "data", "journal.json")

    # with keyword deels with closing file etc.
    with open(json_url, 'r') as openfile:
        # Reading from json file
        json_object = json.load(openfile)
    return json_object


@app.route("/api/journal", methods=['PUT'])
def upload():
    print('saving Journal')
    messageOK = jsonify(message="Journals uploaded!")
    messageFail = jsonify(message="Uploading Journals failed as dats not in JSON format!")
    if request.is_json:
        # Parse the JSON into a Python dictionary
        req = request.get_json()
        # Print the dictionary
        print(req)
        #save json to file
        # file_name = "data/journal_test.json"
        site_root = os.path.realpath(os.path.dirname(__file__))
        json_url = os.path.join(site_root, "data", "journal.json")

        # with keyword deels with closing file etc.
        with open(json_url, 'w') as openfile:
          json.dump(req, openfile)
           # Reading from json file
          #json_object = json.load(openfile)
        #return json_object

        # Return a string along with an HTTP status code
        return messageOK, 200

    else:

        # The request body wasn't JSON so return a 400 HTTP status code
        return messageFail, 200


# run app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
