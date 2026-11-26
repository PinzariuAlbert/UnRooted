from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('.', 'merge.html')

@app.route('/GameParts/mergeAlbertAbhinoor/<path:filename>')
@app.route('/mergeAlbertAbhinoor/<path:filename>')
def fix_old_paths(filename):
    return send_from_directory('.', filename)

if __name__ == '__main__':
    app.run(debug=True)