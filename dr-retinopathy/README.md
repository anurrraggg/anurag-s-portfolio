## Diabetic Retinopathy Classification

Train an EfficientNetB0 model to classify diabetic retinopathy severity levels.

### Dataset structure
You can train on the base `dataset/` or the nested `dataset/DR/`. The script auto-detects `train/` and optional `test/`.

Place images into the following folders (each class is a subfolder with images):

```
dataset/
  train/
    0/
    1/
    2/
    3/
    4/
  test/              # optional; same subfolders as train
    0/
    1/
    2/
    3/
    4/
```

### Setup
```
pip install -r requirements.txt
```

### Train
Default (auto-detects `dataset/` or `dataset/DR/`):
```
python src/train.py
```

Specify a custom root explicitly:
```
python src/train.py --data_root dataset/DR
```

Artifacts will be saved to `model/`:
- `best_model.h5`: best checkpoint by validation accuracy
- `class_indices.json`: mapping of class name to index
- `training_curves.png`: accuracy/loss curves
- `classification_report.json` and `confusion_matrix.png` if `dataset/test` exists

### Notes
- Uses EfficientNet preprocessing and two-stage training (frozen then fine-tune top ~100 layers).
- Adjust `BATCH_SIZE`, `EPOCHS_FROZEN`, `EPOCHS_FINETUNE` in `src/train.py` if needed.

### Inference (single image or folder)
```
python src/predict.py path/to/image.jpg
# or a folder of images
python src/predict.py path/to/folder
```


