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

module.exports = class {
    constructor(tty) {
        this.tty = tty;
        this.width = Math.floor(tty.canvasWidth);
        this.height = Math.floor(tty.canvasHeight);
    }
}
