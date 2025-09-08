import os
import csv
import shutil
import argparse
import random
from collections import defaultdict
from pathlib import Path

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def copy_file(src, dst):
    ensure_dir(os.path.dirname(dst))
    shutil.copy2(src, dst)

def from_folder_structure(source_root, out_root, split=0.2, seed=42):
    random.seed(seed)
    classes = [d for d in os.listdir(source_root) if os.path.isdir(os.path.join(source_root, d))]
    for cls in classes:
        cls_dir = os.path.join(source_root, cls)
        images = [f for f in os.listdir(cls_dir) if os.path.isfile(os.path.join(cls_dir, f))]
        random.shuffle(images)
        n_val = int(len(images) * split)
        val_set = set(images[:n_val])
        for img in images:
            split_name = 'test' if img in val_set else 'train'
            src = os.path.join(cls_dir, img)
            dst = os.path.join(out_root, split_name, cls, img)
            copy_file(src, dst)

def infer_folder_labels_and_prepare(raw_root, out_root, split=0.2, seed=42):
    # Expect raw_root to contain class subfolders
    from_folder_structure(raw_root, out_root, split=split, seed=seed)

def from_csv_labels(csv_path, images_root, out_root, filename_col='filename', label_col='label', split=0.2, seed=42):
    random.seed(seed)
    label_to_files = defaultdict(list)
    with open(csv_path, 'r', newline='') as f:
        reader = csv.DictReader(f)
        if filename_col not in reader.fieldnames or label_col not in reader.fieldnames:
            raise ValueError(f'CSV must contain columns: {filename_col}, {label_col}. Found: {reader.fieldnames}')
        for row in reader:
            fname = row[filename_col]
            label = str(row[label_col])
            src = os.path.join(images_root, fname)
            if os.path.isfile(src):
                label_to_files[label].append(src)

    for label, files in label_to_files.items():
        random.shuffle(files)
        n_val = int(len(files) * split)
        val_set = set(files[:n_val])
        for src in files:
            split_name = 'test' if src in val_set else 'train'
            dst = os.path.join(out_root, split_name, label, os.path.basename(src))
            copy_file(src, dst)

def main():
    parser = argparse.ArgumentParser(description='Prepare DR dataset into train/test class folders')
    parser.add_argument('--raw_root', type=str, required=True,
                        help='If using folder labels: root with class subfolders. If using CSV: folder with images referenced by CSV')
    parser.add_argument('--out_root', type=str, default='dataset/DR', help='Output root to create train/ and test/')
    parser.add_argument('--split', type=float, default=0.2, help='Validation/test split fraction (default 0.2)')
    parser.add_argument('--seed', type=int, default=42)
    parser.add_argument('--csv', type=str, default=None, help='Optional CSV path with columns filename,label')
    parser.add_argument('--filename_col', type=str, default='filename')
    parser.add_argument('--label_col', type=str, default='label')
    args = parser.parse_args()

    raw_root = os.path.abspath(args.raw_root)
    out_root = os.path.abspath(args.out_root)

    # Clean existing output structure if present (only inside out_root/train and out_root/test)
    for sub in ['train', 'test']:
        sub_dir = os.path.join(out_root, sub)
        if os.path.isdir(sub_dir):
            shutil.rmtree(sub_dir)

    # CSV-driven or folder-driven preparation
    if args.csv:
        csv_path = os.path.abspath(args.csv)
        if not os.path.isfile(csv_path):
            raise FileNotFoundError(f'CSV not found: {csv_path}')
        from_csv_labels(csv_path, raw_root, out_root,
                        filename_col=args.filename_col, label_col=args.label_col,
                        split=args.split, seed=args.seed)
    else:
        subdirs = [d for d in os.listdir(raw_root) if os.path.isdir(os.path.join(raw_root, d))]
        if subdirs:
            infer_folder_labels_and_prepare(raw_root, out_root, split=args.split, seed=args.seed)
        else:
            raise RuntimeError('No class subfolders found under raw_root and no CSV provided. Provide one of these.')

    print(f'Dataset prepared under {out_root} with train/ and test/ splits.')

if __name__ == '__main__':
    main()


