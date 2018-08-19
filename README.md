dunnart
=======

An OpenType-enabled renderer for [ttystudio](https://github.com/chjj/ttystudio).

Dunnart renders JSON output from ttystudio into GIFs or animated PNGs.  While ttystudio is almost entirely written in Javascript, its
rendering is limited to ugly BDF fonts.  Dunnart depends on having an HTML canvas implementation (by default this incurs a dependency on Cairo).  By using canvas, dunnart is able to parse OpenType fonts and render pretty GIF and PNG animations.

## Installation
![dunnart](https://raw.githubusercontent.com/inferiorhumanorgans/dunnart/master/img/dunnart-install.png)

## Usage

``` bash
$ dunnart --help
Options:
  --help, -h                                                           [boolean]
  --version           Show version number                              [boolean]
  --font, -f                                                 [string] [required]
  --start, -s                                              [number] [default: 0]
  --end, -e                                               [number] [default: -1]
  --font-size, -z                                         [number] [default: 20]
  --char-spacing, -k                                       [number] [default: 0]
  --input, -i                                                [string] [required]
  --output, -o                                               [string] [required]
```

``` bash
$ dunnart --font SourceCodePro-Light.otf --type=gif --input ttystudio.frames.json --output fancy.gif
```

## Notes
Kerning has proven to be a bit vexxing.  Some fonts, like [Adobe's Source Code Pro](https://github.com/adobe-fonts/source-code-pro) render just fine with no futzing.  Others, like [Fira Code](https://github.com/tonsky/FiraCode), need a bit of width taken in.  This negative kerning can be adjusted via the `char-spacing` option.  The units are font units, which are typically 1/1000th of an EM.

The `font` argument can be specified multiple times to allow for font substitution.  [Emoji One](https://github.com/eosrei/emojione-color-font)  and [Noto Symbol](https://en.wikipedia.org/wiki/Noto_fonts) provide good coverage and are freely available.  For example:

``` bash
$ dunnart -f fonts/SourceCodePro-Light.otf -f fonts/NotoSansSymbols-Light.ttf -f fonts/NotoSansSymbols2-Regular.ttf -f fonts/EmojiOneColor-SVGinOT-OSX.ttf -t png -i demo.json -o demo.png
```

The `end` argument indicates the last frame from the input to be rendered.  Use a value of -1 to render through to the end of the file.

Emoji are not fully supported for a couple reasons.
  * SVG color fonts are not supported by opentype.js ([#193](https://github.com/nodebox/opentype.js/issues/193), [#297](https://github.com/nodebox/opentype.js/pulls/297)).
  * Multi-byte characters (surrogates) are not supported by blessed [#353](https://github.com/chjj/blessed/issues/353).

## What is a dunnart?
dunnart, n., any number of furry narrow-footed marsupials the size of a mouse found in the genus Sminthopsis. They are mainly insectivorous. A male dunnart's Y chromosome is the smallest known mammalian Y chromosome.
