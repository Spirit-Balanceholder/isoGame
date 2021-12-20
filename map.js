class GameMap {

    /** @type {Object.<string, Object.<string, Object<string, Tile>>>} 3D array */
    tiles= {}

    /**
     * @param {vector3D[]} mapData 
     */
    constructor (mapData) {
        mapData.forEach(tile => {
            this.addTile(new Cube(tile.x, tile.y, tile.z, this))
        })
    }

    /**
     * 
     * @param {Tile} tile 
     */
    addTile (tile) {
        if (!this.tiles[tile.x])
            this.tiles[tile.x] = {}
        if (!this.tiles[tile.x][tile.y])
            this.tiles[tile.x][tile.y] = {}
        this.tiles[tile.x][tile.y][tile.z] = tile
    }

    draw() {
        for (const x of Object.keys(this.tiles)) {
            for (const y of Object.keys(this.tiles[x])) {
                for (const z of Object.keys(this.tiles[x][y])) {
                    this.tiles[x][y][z].draw();
                }
            }
        }
    }
}

class Tile {

    /** @type {Number} */
    x
    /** @type {Number} */
    y
    /** @type {Number} */
    z
    /** @type {string} */
    name
    /** @type {GameMap} */
    map

    /** @type {{up: Tile, down: Tile, left: Tile, right: Tile, front: Tile, back: Tile}} */
    neighbors = {
        get up() {return this.map.tiles[this.x][this.y-1][this.z]},
        get down() {return this.map.tiles[this.x][this.y+1][this.z]},
        get left() {return this.map.tiles[this.x-1][this.y][this.z]},
        get right() {return this.map.tiles[this.x+1][this.y][this.z]},
        get front() {return this.map.tiles[this.x][this.y][this.z-1]},
        get back() {return this.map.tiles[this.x][this.y][this.z+1]}
    }

    constructor (x, y, z, map) {
        this.x = x
        this.y = y
        this.z = z
    }

    draw(){}
}

class Cube extends Tile {
    constructor (x, y, z, map) {
        super(x, y, z, map)

    }

    draw () {
        Globals.isoEngine.drawTile(this.x, this.y, this.z)
    }
}