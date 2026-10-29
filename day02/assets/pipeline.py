"""One photo through the whole stack, exactly as the Day 2 scene shows it.
   1 OpenCV: load, BGR->RGB, center square crop, resize to 224
   2 torchvision ResNet-18 (IMAGENET1K_V1): top-5 on the crop
   3 Hugging Face depth-estimation pipeline (Depth Anything V2 Small): depth map of the crop
   Writes <out>/photo.jpg, crop.jpg, depth.png, result.json. Real outputs only."""
import sys, os, json, cv2, torch, numpy as np, transformers, torchvision
from PIL import Image
from torchvision.models import resnet18, ResNet18_Weights
from transformers import pipeline
src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)

img = cv2.imread(src)                                  # H x W x 3, uint8, BGR
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
h, w = img.shape[:2]; s = min(h, w); y0, x0 = (h - s) // 2, (w - s) // 2
crop = cv2.resize(img[y0:y0 + s, x0:x0 + s], (224, 224), interpolation=cv2.INTER_AREA)

wts = ResNet18_Weights.IMAGENET1K_V1
model = resnet18(weights=wts).eval()
x = torch.from_numpy(crop).permute(2, 0, 1).float().div(255)
x = ((x - torch.tensor([0.485, 0.456, 0.406])[:, None, None]) / torch.tensor([0.229, 0.224, 0.225])[:, None, None]).unsqueeze(0)
with torch.no_grad(): p = model(x).softmax(1)[0]
v, i = p.topk(5); top5 = [[wts.meta['categories'][k], round(float(q), 4)] for q, k in zip(v, i)]

DEPTH = 'depth-anything/Depth-Anything-V2-Small-hf'
depth = pipeline('depth-estimation', model=DEPTH, device='cpu')(Image.fromarray(crop))['depth']

cv2.imwrite(f'{out}/photo.jpg', cv2.cvtColor(img, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 88])
cv2.imwrite(f'{out}/crop.jpg', cv2.cvtColor(crop, cv2.COLOR_RGB2BGR), [cv2.IMWRITE_JPEG_QUALITY, 92])
depth.save(f'{out}/depth.png')
res = {'source_file': os.path.basename(src), 'photo_shape': list(img.shape), 'crop_box_xywh': [x0, y0, s, s],
       'crop_shape': list(crop.shape), 'top5': top5, 'classifier': 'torchvision resnet18, ResNet18_Weights.IMAGENET1K_V1',
       'depth_model': DEPTH, 'depth_size': list(depth.size),
       'versions': {'torch': torch.__version__, 'torchvision': torchvision.__version__, 'transformers': transformers.__version__, 'opencv': cv2.__version__}}
json.dump(res, open(f'{out}/result.json', 'w'), indent=1); print(json.dumps(res, indent=1))
