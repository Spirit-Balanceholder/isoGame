class GameMap {

    /** @type {Object.<string, Object.<string, Object<string, Tile>>>} 3D array */
    tiles= {}

    /**
     * 
     * @param {[Tile]} mapData 
     */
    constructor (mapData) {
        mapData.forEach(tile => {
            this.addTile(tile)
        })
    }

    /**
     * 
     * @param {Tile} tile 
     */
    addTile (tile) {
        if (!this.tiles[tile.pos.x])
            this.tiles[tile.pos.x] = {}
        if (!this.tiles[tile.pos.x][tile.pos.y])
            this.tiles[tile.pos.x][tile.pos.y] = {}
        this.tiles[tile.pos.x][tile.pos.y][tile.pos.z] = tile
    }

    draw() {
        for (const x of Object.keys(this.tiles)) {
            for (const y of Object.keys(this.tiles[x]).sort((a, b) => b - a)) {
                for (const z of Object.keys(this.tiles[x][y])) {
                    this.tiles[x][y][z].draw();
                }
            }
        }
    }
}

class Tile {
    
    /**@type {vector3D} */
    pos
    /** @type {string} */
    name
    /** @type {Number} */
    typeId

    /** @type {{tile: Tile, up: Tile, down: Tile, left: Tile, right: Tile, front: Tile, back: Tile}} */
    neighbors = {
        tile: {},
        get up() {return Globals.loadedMap.tiles[this.tile.pos.x]?.[this.tile.pos.y-1]?.[this.tile.pos.z]},
        get down() {return Globals.loadedMap.tiles[this.tile.pos.x]?.[this.tile.pos.y+1]?.[this.tile.pos.z]},
        get left() {return Globals.loadedMap.tiles[this.tile.pos.x+1]?.[this.tile.pos.y]?.[this.tile.pos.z]},
        get right() {return Globals.loadedMap.tiles[this.tile.pos.x-1]?.[this.tile.pos.y]?.[this.tile.pos.z]},
        get front() {return Globals.loadedMap.tiles[this.tile.pos.x]?.[this.tile.pos.y]?.[this.tile.pos.z+1]},
        get back() {return Globals.loadedMap.tiles[this.tile.pos.x]?.[this.tile.pos.y]?.[this.tile.pos.z-1]}
    }

    constructor (position, typeId, map) {
        this.pos = position
        this.typeId = typeId
        this.map = map
        this.neighbors.tile = this;
    }

    draw(){}
}

class Cube extends Tile {

    /** @type {String} */
    frontFill
    /** @type {String} */
    leftFill
    /** @type {String} */
    upFill
    
    constructor (position, typeId, map) {
        super(position, typeId, map)
        this.frontFill = Globals.tileSet[typeId].frontFill
        this.leftFill = Globals.tileSet[typeId].leftFill
        this.upFill = Globals.tileSet[typeId].upFill
    }

    draw () {
        Globals.isoEngine.drawCube(this)
    }
}

class Sprite extends Tile {

    /** @type {Promise} */
    image
    
    constructor (position, typeId, map) {
        super(position, typeId, map)
        let img = new Image()
        img.src = Globals.tileSet[typeId].image
        this.image = new Promise((resolve) => {
            img.onload = () => {resolve(img)}
        })
    }

    draw () {
        Globals.isoEngine.drawSprite(this)
    }
}