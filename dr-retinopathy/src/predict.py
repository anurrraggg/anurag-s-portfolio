import os
import json
import argparse
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

IMG_SIZE = 224

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'model')
MODEL_PATH = os.path.join(MODEL_DIR, 'best_model.h5')
CLASS_INDEX_PATH = os.path.join(MODEL_DIR, 'class_indices.json')

parser = argparse.ArgumentParser(description='Predict DR class for an image or folder')
parser.add_argument('path', type=str, help='Image file path or folder of images')
args = parser.parse_args()

# Load model and class indices
model = load_model(MODEL_PATH)
if os.path.exists(CLASS_INDEX_PATH):
    with open(CLASS_INDEX_PATH, 'r') as f:
        class_indices = json.load(f)
    inv_class_indices = {v: k for k, v in class_indices.items()}
    CLASS_NAMES = [inv_class_indices[i] for i in sorted(inv_class_indices.keys())]
else:
    CLASS_NAMES = [str(i) for i in range(model.output_shape[-1])]

# Load and preprocess image
def load_and_predict(img_path):
    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = image.img_to_array(img)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array, verbose=0)
    class_idx = int(np.argmax(preds))
    confidence = float(np.max(preds))

    print(f"{os.path.basename(img_path)} -> {CLASS_NAMES[class_idx]} ({confidence*100:.2f}% confidence)")

# Example usage
if __name__ == "__main__":
    if os.path.isdir(args.path):
        for name in os.listdir(args.path):
            p = os.path.join(args.path, name)
            if os.path.isfile(p):
                try:
                    load_and_predict(p)
                except Exception as e:
                    print(f"Skip {name}: {e}")
    else:
        load_and_predict(args.path)
