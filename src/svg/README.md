# SVG authoring guidelines

- Anatomogram SVGs are edited with Inkscape and saved as *Inkscape SVG* in the `src/svg` directory.
- To ensure that the correct `height` and `width` are set remember to do the following before saving: go to *File* → *Document Properties...* → *Page* tab → *Custom size*, then set *Units* to `px` and click on *Resize page to drawing or selection*.
- The SVG must follow the naming scheme `<species>[.view].svg` (e.g. `homo_sapiens.brain.svg`).
- The structure of the SVG must be as follows:
```
<svg ...>
  <defs .../>
  <sodipodi:namedview .../>
  <metadata>
    ...
  </metadata>
  <g
    id="LAYER_OUTLINE">
    [Organism outline shapes]
  </g>
  <g
    id="LAYER_EFO">
    [Tissue shapes]
  </g>
</svg>
```
- Both layers must be absolutely positioned, i.e. no `translate(x,y)` or `matrix(a,b,c,d,x,y)` in the `transform` attribute (e.g. `scale` is fine).
- Each tissue shape is either:
    - a group or basic shape (ellipse, path, etc.) with an ontology ID in its `id` attribute and `style="fill:none; stroke:none"`.
    - a `<use>` tag with an ontology ID in its `id` attribute and a value of one of the former tissue shapes in its `xlink:href` attribute. 
- If a tissue shape is a group, i.e. `<g ...></g>` each of the shapes inside must have no styles at all. The appearance is determined by the attributes of the enclosing group tag.
- A tissue shape cannot have another group inside. It must be formed by basic shapes only.
- A tissue shape should have a `<title>` attribute with the name of the tissue.
- The top `<svg ...>` tag must have the attributes `viewBox="0 0 [width] [height]"` and `preserveAspectRatio="none"`. These may be added with a text editor after saving the SVG to look up the `height` and `width` attributes.
- The attribution icon links to `https://www.ebi.ac.uk/gxa/licence.html` and its size is `[width] *  φ / 10`, where  [*φ*=1.618034](https://en.wikipedia.org/wiki/Golden_ratio). It will be located, in order of preference, to the bottom right, bottom centre or bottom left.
