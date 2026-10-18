import sys, os
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
import uharfbuzz as hb

fontdir, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
ORANGE = "#C2410C"; ORANGE_DARK = "#F08A4B"; INK = "#1C1712"; PARCH = "#F5EFE3"

fr = instantiateVariableFont(TTFont(f"{fontdir}/Fraunces.ttf"), {"wght":600,"SOFT":100,"WONK":0,"opsz":144})
fr_path = f"{fontdir}/Fraunces-600.ttf"; fr.save(fr_path)
dm_path = f"{fontdir}/DMSerifDisplay.ttf"

def shape(path, text):
    blob = hb.Blob.from_file_path(path); face = hb.Face(blob); font = hb.Font(face)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties(); hb.shape(font, buf, {"kern":True,"liga":True})
    tt = TTFont(path); order = tt.getGlyphOrder(); gs = tt.getGlyphSet(); upm = tt["head"].unitsPerEm
    glyphs = []; x = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        glyphs.append((order[info.codepoint], x + pos.x_offset, pos.y_offset)); x += pos.x_advance
    return gs, glyphs, x, upm, tt

def render(path, text, scale, ox, oy):
    """return svg path d and bbox (in output coords) for text with baseline at oy"""
    gs, glyphs, adv, upm, tt = shape(path, text)
    s = scale/upm; d = []; bb = [1e9,1e9,-1e9,-1e9]
    for name, gx, gy in glyphs:
        pen = SVGPathPen(gs)
        t = (s, 0, 0, -s, ox + gx*s, oy - gy*s)
        gs[name].draw(TransformPen(pen, t)); d.append(pen.getCommands())
        bp = BoundsPen(gs); gs[name].draw(TransformPen(bp, t))
        if bp.bounds:
            b = bp.bounds; bb = [min(bb[0],b[0]),min(bb[1],b[1]),max(bb[2],b[2]),max(bb[3],b[3])]
    return " ".join(d), bb, adv*s

def bounds(path, text, scale):
    return render(path, text, scale, 0, 0)[1]

# ---------- icon: orange square, parchment quotes, nothing cut ----------
def icon(size=512, fg=PARCH, bg=ORANGE, radius=0.22, padf=0.12, qf=1.05):
    pad = size*padf
    q = size*qf  # font size for quotes
    b1 = bounds(dm_path, "“", q); b2 = bounds(dm_path, "”", q)
    # place opening quote top-left at pad, closing bottom-right at pad
    o_dx, o_dy = pad - b1[0], pad - b1[1]
    c_dx, c_dy = size - pad - b2[2], size - pad - b2[3]
    d1,_,_ = render(dm_path, "“", q, o_dx, o_dy)
    d2,_,_ = render(dm_path, "”", q, c_dx, c_dy)
    r = size*radius
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">'
            f'<title>Citata</title><rect width="{size}" height="{size}" rx="{r:.1f}" fill="{bg}"/>'
            f'<path fill="{fg}" d="{d1} {d2}"/></svg>')

# ---------- wordmark: Fraunces word, DM Serif quotes ----------
def wordmark(ink=INK, accent=ORANGE):
    fs = 200
    wd, wb, wadv = render(fr_path, "Citata", fs, 0, 0)
    cap_top = wb[1]  # top of C (negative y)
    q = fs*1.05
    b1 = bounds(dm_path, "“", q); b2 = bounds(dm_path, "”", q)
    gap = fs*0.04
    # opening: right edge just before C, top a bit above cap top
    o_dx = wb[0] - gap - b1[2]; o_dy = (cap_top - fs*0.08) - b1[1]
    # closing: left edge just after last a, top slightly below baseline-ish (low)
    c_dx = wb[2] + gap - b2[0]; c_dy = (fs*0.02) - b2[1]
    d1, bb1, _ = render(dm_path, "“", q, o_dx, o_dy)
    d2, bb2, _ = render(dm_path, "”", q, c_dx, c_dy)
    minx = min(bb1[0], wb[0]); miny = min(bb1[1], wb[1]); maxx = max(bb2[2], wb[2]); maxy = max(bb2[3], wb[3])
    m = fs*0.06
    vb = f"{minx-m:.1f} {miny-m:.1f} {maxx-minx+2*m:.1f} {maxy-miny+2*m:.1f}"
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'
            f'<title>Citata</title><path fill="{accent}" d="{d1} {d2}"/><path fill="{ink}" d="{wd}"/></svg>')

files = {
  "icon.svg": icon(),
  "favicon.svg": icon(padf=0.07, qf=1.42, radius=0.2),
  "icon-dark.svg": icon(fg="#14110E", bg=ORANGE_DARK),
  "wordmark.svg": wordmark(),
  "wordmark-dark.svg": wordmark(ink="#EDE4D3", accent=ORANGE_DARK),
}
for n, s in files.items():
    open(f"{out}/{n}", "w").write(s)
b1=bounds(dm_path,"\u201C",512*1.42); print("fav quote bbox w,h", b1[2]-b1[0], b1[3]-b1[1])
print("ok", list(files))
