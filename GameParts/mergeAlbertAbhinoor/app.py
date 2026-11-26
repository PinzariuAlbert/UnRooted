from flask import Flask, send_from_directory

# Serve all files in the current folder directly from the root URL
app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'merge.html')

if __name__ == '__main__':
    app.run(debug=True)