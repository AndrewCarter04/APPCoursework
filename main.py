"""
Application of Programming Principles Assignment
"""
from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os

app = Flask(__name__)

"""
Render Index Page
"""
@app.route('/')
def home():
  """Render and return the 'index' HTML template file"""
  return render_template('index.html')


"""
Get all To-Do List entries
"""
@app.route('/api/todo', methods=['GET'])
def get_todo():
  """Get the 'todo' JSON file from the 'data' folder, then return it"""
  
  folder_path = os.path.realpath(os.path.dirname(__file__))
  file_path = os.path.join(folder_path, "data", "todo.json")

  error_msg = jsonify(message="Error loading to-do list entries.")

  with open(file_path, 'r') as file:
      return json.load(file)

  return error_msg


"""
Save all To-Do List entries
"""
@app.route('/api/todo', methods=['PUT'])
def set_todo():
  """Dump the uploaded JSON string into the 'todo' JSON file in the 'data' folder"""

  folder_path = os.path.realpath(os.path.dirname(__file__))
  file_path = os.path.join(folder_path, "data", "todo.json")
  
  success_msg = jsonify(message="Upload successful!")
  fail_msg = jsonify(message="Upload failed.")

  if request.is_json:

    data = request.get_json()

    with open(file_path, 'w') as file:
      json.dump(data, file)

    return success_msg, 200

  else:

    return fail_msg, 400


"""
Docs routes
"""
@app.route('/docs')
def docs():
  """Return the simple page with 2 links, one to python docs, and one to JS docs"""
  return render_template("docs/docs.html")

@app.route('/docs/py')
def docs_python():
  """Render pydoc HTML files"""
  return render_template("docs/python/main.html")

@app.route('/docs/js')
def docs_javascript():
  return "JS goes here"

"""
Run Flask
"""
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
