"""
Application of Programming Principles Assignment
"""
from flask import Flask, render_template, jsonify, request
import json, os

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
  """Get the 'todo' JSON file from the 'data' folder, then return its contents as a String"""
  
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
Run Flask
"""
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
