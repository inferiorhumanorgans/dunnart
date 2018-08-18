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

let fs = require('fs');
let Canvas = require('canvas');
let blessed = require('blessed');
let UPNG = require('upng-js');

module.exports = class {
    constructor(tty) {
        this.tty = tty;
        this.width = Math.floor(tty.canvasWidth);
        this.height = Math.floor(tty.canvasHeight);
    }

    renderFrame(frame) {
        const tty = this.tty;
        const font = tty.font;

        let canvas = new Canvas(tty.canvasWidth, tty.canvasHeight);
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, tty.canvasWidth, tty.canvasHeight)
        
        let fontScale = (font.tables.head.unitsPerEm / tty.fontSize);
        let ascent = font.ascender / fontScale;
        let descent = font.descender / fontScale;

        frame.forEach(function (row, y) {
            let y_pos = (tty.charHeight + descent) * y;
    
            row.forEach(function (cell, x) {
                let attrs = cell[0];
                let bg = attrs & 0x1ff;
                let fg = (attrs >> 9) & 0x1ff;
    
                if (bg === 0x1ff) {
                    bg = [0, 0, 0]
                } else {
                    bg = blessed.colors.vcolors[bg];
                }
    
                if (fg === 0x1ff) {
                    fg = [255, 255, 255]
                } else {
                    fg = blessed.colors.vcolors[fg];
                }
    
                let char = cell[1];
    
                let start_x = ( tty.charWidth ) * x;
    
                ctx.fillStyle = 'rgba(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ', 1)';
                ctx.fillRect(start_x, y_pos, tty.charWidth + 1, tty.charHeight + 1);
    
                let glyph = font.charToGlyph(char);
                let path = font.getPath(char, start_x, y_pos + ascent, tty.fontSize);
                path.fill = 'rgba(' + fg[0] + ',' + fg[1] + ',' + fg[2] + ', 1)';
                path.draw(ctx);
            });
        });
        
        return ctx;
    }

    renderFile(filename) {
        const tty = this.tty;
        const renderFrame = this.renderFrame.bind(this);
        
        let canvas = new Canvas(tty.canvasWidth, tty.canvasHeight);
        let ctx = canvas.getContext('2d');
        const {width, height} = this;

        console.log(width, height);
        let png_frames = tty.frames.map(function(frame, i) {
            let f = renderFrame(frame);
            return f.getImageData(0, 0, width, height).data.buffer;
        });
        
        let png = UPNG.encode(png_frames, width, height, 0, true);
        fs.writeFileSync(filename, new Buffer(png));
        
    }
}