"""The one-image vision app from the Day 2 scene: photo in, top-5 labels and a depth map out.
   Reference for the Day 2 lab notebook. Run: python app.py, then open the local URL it prints."""
import cv2, torch, gradio as gr
from PIL import Image
from torchvision.models import resnet18, ResNet18_Weights
from transformers import pipeline

wts = ResNet18_Weights.IMAGENET1K_V1
model = resnet18(weights=wts).eval()
depth = pipeline('depth-estimation', model='depth-anything/Depth-Anything-V2-Small-hf', device='cpu')
MEAN, STD = torch.tensor([0.485, 0.456, 0.406])[:, None, None], torch.tensor([0.229, 0.224, 0.225])[:, None, None]

def crop224(img):                                      # img: H x W x 3, RGB, uint8
    h, w = img.shape[:2]; s = min(h, w); y0, x0 = (h - s) // 2, (w - s) // 2
    return cv2.resize(img[y0:y0 + s, x0:x0 + s], (224, 224), interpolation=cv2.INTER_AREA)

def see(img):
    crop = crop224(img)
    x = ((torch.from_numpy(crop).permute(2, 0, 1).float() / 255 - MEAN) / STD).unsqueeze(0)
    with torch.no_grad(): p = model(x).softmax(1)[0]
    v, i = p.topk(5)
    labels = {wts.meta['categories'][k]: float(q) for q, k in zip(v, i)}
    return labels, depth(Image.fromarray(crop))['depth']

demo = gr.Interface(see, gr.Image(type='numpy', label='Your photo'),
                    [gr.Label(num_top_classes=5, label='Top-5 (ResNet-18)'), gr.Image(label='Depth (brighter = nearer)')],
                    title='One-image vision app')
if __name__ == '__main__':
    demo.launch()
