# Project images

Save images here with the exact filenames below — `src/data/portfolio.ts` already
points at them. Until a file exists, the site shows a labelled placeholder frame
instead of a broken image, so nothing looks wrong while you work through them.

## Canine Pelvic Brace with Hip Socket — wired up, files needed

| Filename | Which screenshot |
| --- | --- |
| `canine-brace-assembly.png` | The finished brace render — black exterior, purple interior, three labelled axes |
| `canine-ct-mesh-splines.png` | The CT mesh with orange/blue splines traced over it |
| `canine-reference-frame.png` | The pelvis mesh with all the reference planes shown |
| `canine-brace-surface.png` | The plain grey brace surface with the three axis labels |
| `canine-socket-assembly.png` | The coloured socket assembly — grey cup, blue liner, purple ball, copper stem |
| `canine-socket-in-brace.png` | The socket seated in the brace shell, close-up |

### Before you save them

**Crop out the SolidWorks UI.** One of these is a full-screen capture including the
feature tree, taskbar, clock and weather widget. Crop to the model. A full desktop
screenshot reads as a screenshot; a cropped viewport reads as a deliverable.

**Check the axis label spelling.** Your feature tree names the axis `Ilium Crest Axis`,
but the planes are named `Coronal Iliac Crest` and `Transverse Plane Iliac Crest Height`.
The conventional anatomical term is **iliac crest**, so the axis name is the odd one out.
A biomechanics reviewer will notice. Worth renaming in SolidWorks and re-exporting.

**Resize to about 1600 px wide** and keep each file under ~500 KB. These are line-art
renders, so PNG is the right format.

## Still needed elsewhere

- `hansen-colab.png`, `hansen-red-plot.png` — sanitise before publishing
- `aileron-skin-render.png`, `aileron-assembly.png`, `aileron-iteration.png` — team approval first
- `chair-render.png`, `chair-positions.png`, `chair-mechanism.png`
- `grip-photo.png` — approved image only, no identifying information
- `dbf-photo.png` — team approval first

Update the matching `images` entry in `src/data/portfolio.ts` when you add one:
set `src` to `/images/your-file.png` and write real `alt` text.
