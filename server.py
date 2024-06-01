from flask import Flask, send_file
import os
import threading
import time
from model import generate_image

app = Flask(__name__)

# Define the path to the image
image_path = 'lifehackers69/public/images/graph.png'

@app.route('/fetch-image', methods=['GET'])
def fetch_image():
    if not os.path.exists(image_path):
        # Run your logic to load the image here, e.g., download or generate
        generate_image()
    return send_file(image_path)

def delete_image_periodically():
    while True:
        time.sleep(8640)  # Sleep for 24 hours
        if os.path.exists(image_path):
            generate_image()
            print(f"{image_path} has been replaced.")

if __name__ == '__main__':
    # Start the background thread before starting the Flask app
    threading.Thread(target=delete_image_periodically, daemon=True).start()
    app.run(debug=True)