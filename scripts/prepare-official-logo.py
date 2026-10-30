"""Deterministic extraction of user-supplied rasters; no drawing or palette replacement.

Run with Pillow, numpy and scipy. Originals are immutable. A local edge matte is
estimated against the known white/black background, preserving opaque interiors.
"""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib
import json
import numpy as np
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist/assets/brand'
REPORT = ROOT / 'research/logo-20261021'
OUT.mkdir(parents=True, exist_ok=True)
REPORT.mkdir(parents=True, exist_ok=True)
stats = []
logos = {}

for tone, filename, background in [('light', 'light.jpeg', 255), ('dark', 'dark.png', 0)]:
    original = ROOT / 'design/official-logo/originals' / filename
    im = Image.open(original).convert('RGB')
    rgb = np.array(im).astype(float)
    deviation = np.max(np.abs(rgb-background), axis=2)
    # Reject isolated compression speckles, retaining every substantial logo part.
    labels, _ = ndi.label(deviation > 32)
    areas = np.bincount(labels.ravel())
    mask = (areas[labels] >= 12) & (labels != 0)
    core = ndi.binary_erosion(mask, iterations=2)
    support = ndi.binary_dilation(mask, iterations=2)
    _, nearest = ndi.distance_transform_edt(~core, return_indices=True)
    foreground = rgb[nearest[0], nearest[1]]
    direction = foreground-background
    alpha = np.clip(np.sum((rgb-background)*direction, axis=2) /
                    np.maximum(1, np.sum(direction*direction, axis=2)), 0, 1)
    alpha[core] = 1
    alpha[~support] = 0
    alpha[alpha < .025] = 0
    clean = np.clip((rgb-background*(1-alpha[..., None])) /
                    np.maximum(alpha[..., None], 1e-6), 0, 255)
    clean[core] = rgb[core]  # Every opaque source pixel stays unchanged.
    rgba = np.dstack([np.rint(clean).astype('uint8'), np.rint(alpha*255).astype('uint8')])
    rgba[rgba[..., 3] == 0, :3] = 0
    raw = Image.fromarray(rgba)
    bbox = raw.getbbox()
    crop = raw.crop(bbox)
    # Same output canvas and content height, uniform scaling only.
    factor = min(1380/crop.width, 320/crop.height)
    size = (round(crop.width*factor), round(crop.height*factor))
    scaled = crop.resize(size, Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (1440, 360))
    canvas.alpha_composite(scaled, ((1440-size[0])//2, (360-size[1])//2))
    canvas.save(OUT / f'koi-maker-{tone}.png', optimize=True)
    logos[tone] = canvas
    # Quality measured at original resolution, prior to proportional normalization.
    back = Image.new('RGBA', im.size, (background,)*3+(255,))
    recomposed = np.array(Image.alpha_composite(back, raw).convert('RGB')).astype(float)
    delta = np.abs(recomposed-rgb)
    roi = delta[bbox[1]:bbox[3], bbox[0]:bbox[2]]
    stats.append({'tone': tone, 'original': str(original.relative_to(ROOT)),
                  'originalSha256': hashlib.sha256(original.read_bytes()).hexdigest(),
                  'originalSize': list(im.size), 'sourceAlpha': False,
                  'contentBounds': list(bbox), 'sourceContentRatio': crop.width/crop.height,
                  'normalizedCanvas': [1440, 360], 'normalizedContentSize': list(size),
                  'scaleUniform': factor,
                  'opaqueInteriorChangedPixels': int(np.any(clean[core] != rgb[core], axis=1).sum()),
                  'recompositeMeanAbsoluteError': float(roi.mean()),
                  'recomposite99thPercentileError': float(np.percentile(roi, 99)),
                  'backgroundCornersAlpha': [int(raw.getpixel(pt)[3]) for pt in [(0,0),(im.width-1,im.height-1)]],
                  'output': f'assets/brand/koi-maker-{tone}.png'})
    if tone == 'light':
        # Crop the supplied left symbol only, never synthesize a small wordmark.
        symbol = raw.crop((bbox[0], bbox[1], 670, bbox[3]))
        symbol = symbol.crop(symbol.getbbox())
        for edge in [16, 32, 180]:
            icon = Image.new('RGBA', (edge, edge))
            symbol_copy = symbol.copy()
            symbol_copy.thumbnail((round(edge*.88), round(edge*.88)), Image.Resampling.LANCZOS)
            icon.alpha_composite(symbol_copy, ((edge-symbol_copy.width)//2, (edge-symbol_copy.height)//2))
            icon.save(OUT / f'icon-{edge}.png', optimize=True)

proof = Image.new('RGB', (1500, 640), 'white')
draw = ImageDraw.Draw(proof)
for i, (tone, bg) in enumerate([('light','#f3eef2'),('dark','#292d35'),('light','#ffffff'),('dark','#000000')]):
    y = i*160
    draw.rectangle((0,y,1500,y+160), fill=bg)
    logo = logos[tone].resize((576,144), Image.Resampling.LANCZOS)
    proof.paste(logo,(32,y+8),logo)
    small = logos[tone].resize((146,36), Image.Resampling.LANCZOS)
    proof.paste(small,(1000,y+60),small)
proof.save(REPORT/'composite-proof.png')
(REPORT/'ASSET-INSPECTION.json').write_text(json.dumps({'method':'local known-background unmatting; 2px edge support; opaque source RGB preserved; no AI redraw or CSS filter', 'assets':stats,'icons':[16,32,180],'pwa':'No manifest or existing PWA; 192/512 not created'}, indent=2)+'\n')
print(json.dumps(stats, indent=2))
