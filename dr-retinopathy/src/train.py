import os
import json
import argparse
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix

IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS_FROZEN = 5
EPOCHS_FINETUNE = 20

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

parser = argparse.ArgumentParser(description='Train EfficientNet for DR classification')
parser.add_argument('--data_root', type=str, default=os.path.join(BASE_DIR, 'dataset'),
                    help='Root dataset directory containing train/ and optional test/ subfolders (default: dataset)')
args, _ = parser.parse_known_args()

# Support nested DR datasets, e.g. dataset/DR/train
candidate_roots = [args.data_root,
                   os.path.join(args.data_root, 'DR'),
                   os.path.join(BASE_DIR, 'dataset', 'DR'),
                   os.path.join(BASE_DIR, 'dataset')]
selected_root = None
for root in candidate_roots:
    train_dir = os.path.join(root, 'train')
    if os.path.isdir(train_dir):
        selected_root = root
        break
if selected_root is None:
    raise FileNotFoundError('Could not find a train/ directory inside the provided data_root or known fallbacks.')

TRAIN_DIR = os.path.join(selected_root, 'train')
TEST_DIR = os.path.join(selected_root, 'test')

MODEL_DIR = os.path.join(BASE_DIR, 'model')
MODEL_PATH = os.path.join(MODEL_DIR, 'best_model.h5')

# Ensure output directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Data Augmentation
train_datagen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    rotation_range=20,
    zoom_range=0.15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.15,
    horizontal_flip=True,
    validation_split=0.2
)

train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# Model
num_classes = train_generator.num_classes
base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
predictions = Dense(num_classes, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=predictions)

# Freeze base layers
for layer in base_model.layers:
    layer.trainable = False

# Compile (stage 1: frozen base)
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Callbacks
callbacks = [
    EarlyStopping(patience=5, restore_best_weights=True),
    ReduceLROnPlateau(factor=0.2, patience=3, min_lr=1e-6),
    ModelCheckpoint(MODEL_PATH, monitor='val_accuracy', save_best_only=True)
]

# Train - stage 1
history_1 = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS_FROZEN,
    callbacks=callbacks
)

# Unfreeze top of base_model for fine-tuning
for layer in base_model.layers[-100:]:
    layer.trainable = True

# Re-compile with lower LR for fine-tuning
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

history_2 = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=EPOCHS_FINETUNE,
    callbacks=callbacks
)

# Merge histories
def _merge_histories(h1, h2):
    merged = {}
    for key in set(h1.history.keys()).union(h2.history.keys()):
        merged[key] = h1.history.get(key, []) + h2.history.get(key, [])
    return merged

history = type('History', (), {'history': _merge_histories(history_1, history_2)})

# Save class indices
class_indices_path = os.path.join(MODEL_DIR, 'class_indices.json')
with open(class_indices_path, 'w') as f:
    json.dump(train_generator.class_indices, f, indent=2)

# Plot training curves
def _plot_and_save_curves(hist, out_path):
    acc = hist['accuracy']
    val_acc = hist.get('val_accuracy', [])
    loss = hist['loss']
    val_loss = hist.get('val_loss', [])
    epochs_range = range(1, len(acc) + 1)

    plt.figure(figsize=(10,4))
    plt.subplot(1,2,1)
    plt.plot(epochs_range, acc, label='Train Acc')
    if val_acc:
        plt.plot(epochs_range, val_acc, label='Val Acc')
    plt.legend()
    plt.title('Accuracy')

    plt.subplot(1,2,2)
    plt.plot(epochs_range, loss, label='Train Loss')
    if val_loss:
        plt.plot(epochs_range, val_loss, label='Val Loss')
    plt.legend()
    plt.title('Loss')

    plt.tight_layout()
    plt.savefig(out_path)
    plt.close()

_plot_and_save_curves(history.history, os.path.join(MODEL_DIR, 'training_curves.png'))

# Optional: Evaluate on test set if present
def _has_subdirs(path):
    if not os.path.isdir(path):
        return False
    for name in os.listdir(path):
        if os.path.isdir(os.path.join(path, name)):
            return True
    return False

if _has_subdirs(TEST_DIR):
    test_datagen = ImageDataGenerator(preprocessing_function=preprocess_input)
    test_generator = test_datagen.flow_from_directory(
        TEST_DIR,
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )

    test_loss, test_acc = model.evaluate(test_generator, verbose=1)

    # Predictions and metrics
    preds = model.predict(test_generator, verbose=1)
    y_true = test_generator.classes
    y_pred = np.argmax(preds, axis=1)

    # Save classification report
    inv_class_indices = {v: k for k, v in test_generator.class_indices.items()}
    target_names = [inv_class_indices[i] for i in sorted(inv_class_indices.keys())]
    report = classification_report(y_true, y_pred, target_names=target_names, output_dict=True)
    with open(os.path.join(MODEL_DIR, 'classification_report.json'), 'w') as f:
        json.dump({'test_loss': float(test_loss), 'test_accuracy': float(test_acc), 'report': report}, f, indent=2)

    # Confusion matrix plot
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(6,6))
    plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    plt.title('Confusion Matrix')
    plt.colorbar()
    tick_marks = np.arange(len(target_names))
    plt.xticks(tick_marks, target_names, rotation=45, ha='right')
    plt.yticks(tick_marks, target_names)
    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')
    plt.savefig(os.path.join(MODEL_DIR, 'confusion_matrix.png'))
    plt.close()

