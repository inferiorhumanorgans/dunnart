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
let Raster = require('./raster');
let UPNG = require('upng-js');

module.exports = class extends Raster {
    renderFile(filename) {
        const tty = this.tty;
        const renderFrame = this.renderFrame.bind(this);
        
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
