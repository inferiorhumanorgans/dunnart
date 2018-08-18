/*
    This file is part of dunnart.

    dunnart is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    dunnart is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with dunnart.  If not, see <https://www.gnu.org/licenses/>.
*/

const OpenType = require('opentype.js');
const fs = require('fs');

module.exports = class {
    constructor(input, options) {
        console.log("Loading font: " + options.font);
        this.font = OpenType.loadSync(options.font);
        this.fontScale = this.font.tables.head.unitsPerEm / options.fontSize;
        this.charSpacing = options.charSpacing;
        this.fontSize = options.fontSize;

        console.log(`Loading ttystudio data: ${input}`);

        this.frames = JSON.parse(fs.readFileSync(input, 'utf8'));//.slice(110, 130);
        let range_start = options.start
        let range_end = options.end
        if (range_end == -1) {
            range_end = this.frames.length;
        }
        this.frames = this.frames.slice(range_start, range_end);

        console.log(`Found ${this.frames.length} frame(s)`);
        this.setBoundingFromFont();
        this.setCanvasDimensions();
    }

    setBoundingFromFont() {
        let {frames, font, fontScale, charSpacing} = this;

        let charWidth = ( font.tables.hhea.xMaxExtent - ((font.tables.hhea.advanceWidthMax + font.tables.hhea.minLeftSideBearing + charSpacing) / 2.0) );

        this.charWidth = charWidth / fontScale;
        this.charHeight = (font.tables.head.yMax - font.tables.head.yMin) / fontScale;
    }

    setCanvasDimensions() {
        const {frames, font, fontSize} = this;

        let frame = frames[0];
        let frame_width = frame[0].length;
        let frame_height = frame.length;
        let descent = font.descender / (font.tables.head.unitsPerEm / fontSize);
    
        let width = this.charWidth * frame_width;
        let height = (this.charHeight + descent)  * frame_height;

        this.canvasWidth = width;
        this.canvasHeight = height - descent;
    }    
}
