#!/usr/bin/env python3
"""Download curated Commons photographs, verify image decoding, and save local WebP copies.
Sources and stated licenses are recorded in assets/data/career-images.json.
This does not publish editorial content or change production registries.
"""
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
from io import BytesIO
from PIL import Image, ImageOps

root=Path(__file__).resolve().parents[1]
entries=json.loads((root/'assets/data/career-images.json').read_text())
for entry in entries:
    filename=entry['file']
    dest=root/entry['src']
    dest.parent.mkdir(parents=True,exist_ok=True)
    # Wikimedia Commons serves a suitably sized file on its Special:Redirect/file route.
    url='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+quote(filename,safe='')+'?width=1200'
    req=Request(url,headers={'User-Agent':'HealthCareersLibraryBot/0.1 (educational editorial image preparation; Wikimedia Commons)','Accept':'image/*'})
    with urlopen(req,timeout=45) as response:
        data=response.read(20_000_001)
        ctype=response.headers.get('Content-Type','')
        if len(data)>20_000_000 or not ctype.startswith('image/'):
            raise RuntimeError(f"Unexpected Wikimedia image response for {entry['id']}: {ctype}, bytes={len(data)}")
    with Image.open(BytesIO(data)) as original:
        picture=ImageOps.exif_transpose(original).convert('RGB')
        if min(picture.size)<350:
            raise RuntimeError(f"Too small for {entry['id']}: {picture.size}")
        picture.thumbnail((1200,900),Image.Resampling.LANCZOS)
        picture.save(dest,'WEBP',quality=82,method=6)
    print(f"Saved {entry['id']} ({dest.stat().st_size:,} bytes)")
