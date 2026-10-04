# Romantic Gift Website ❤️ (v3)

Open `index.html` to view. Upload the WHOLE folder to Netlify / GitHub Pages to share a link.

## How to add your video clips (10–15 sec)
1. Copy your videos into the `clips/` folder (use .mp4).
2. Open `script.js` -> find `clips: [` near the top and add a line per clip:
   { src: "clips/clip2.mp4", title: "your laugh, on repeat" },
3. Tip: keep each clip small (under ~5 MB). Compress with ffmpeg:
   ffmpeg -i input.mp4 -vf "scale=720:-2" -c:v libx264 -crf 28 -movflags +faststart clips/clip2.mp4
   (or any free online video compressor). Phone videos are often 50+ MB — compress them first!
4. `clips/clip1.mp4` is just a sample (from the petal video). Replace it with yours.

While a clip plays, the background music pauses, then resumes when the clip ends.

## Quotes
Edit `quotes: [...]` in `script.js` (rotating card). The 3 static quotes between sections are in `index.html` (search `quote-break`).

## Colors
Top of the "v3 · NEW COLOR THEME" block in `style.css`: change --rose, --gold, --lav, --deep, --wine.

## Other settings (script.js CONFIG)
Her name, photo captions, love jar notes, typed lines, `startDate` for the together-counter.
