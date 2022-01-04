class IsoEngine {

    /**
     * @typedef {object} vector3D
     * @property {Number} x
     * @property {Number} y
     * @property {Number} z
     */

    /**
     * @typedef {object} vector2D
     * @property {Number} x
     * @property {Number} y
     */

    static vector2D = class {
        /** @type {Number} */
        x
        /** @type {Number} */
        y
        constructor (x, y) {
            if (x !== undefined || y !== undefined) {
                this.x = x;
                this.y = y;
            }
        }
    }

    static vector3D = class {
        /** @type {Number} */
        x
        /** @type {Number} */
        y
        /** @type {Number} */
        z
        /**
         * 
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} z 
         */
        constructor (x, y, z) {
            if (x !== undefined || y !== undefined || z !== undefined) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
        }
    }

    /** @type {CanvasRenderingContext2D} */
    ctx
    /** @type {vector3D} */
    gridSize
    
    /**
     * Make a new map
     * @param {CanvasRenderingContext2D} ctx
     * @param {vector3D|[Number, Number, Number]} gridSize 
     */
    constructor (ctx, gridSize) {
        this.ctx = ctx
        this.gridSize = Array.isArray(gridSize) ? new IsoEngine.vector3D(gridSize[0],gridSize[1],gridSize[2]) : gridSize
    }

    /**
     * draw a complete cube
     * @param {Cube} cube 
     */
    drawCube (cube) {
        if (!(cube.neighbors.front && cube.neighbors.up && cube.neighbors.left))
        {
            let x = cube.pos.x
            let y = cube.pos.y
            let z = cube.pos.z

            let startCoords = new IsoEngine.vector2D (
                this.ctx.canvas.width/2 + (x * this.gridSize.x/2) + -(z * this.gridSize.z/2),
                this.ctx.canvas.height/2 + (x * this.gridSize.x/4) + (z * this.gridSize.z/4) + (y * this.gridSize.y/2)
            )

            if (!cube.neighbors.front)
            {
                this.ctx.beginPath()
                this.ctx.moveTo(startCoords.x, startCoords.y)
                this.ctx.lineTo(startCoords.x, startCoords.y + this.gridSize.y/2)
                this.ctx.lineTo(startCoords.x - this.gridSize.x/2, startCoords.y + this.gridSize.y/4)
                this.ctx.lineTo(startCoords.x - this.gridSize.x/2, startCoords.y - this.gridSize.y/4)
                this.ctx.lineTo(startCoords.x, startCoords.y)
                this.ctx.closePath()
                this.ctx.fillStyle = cube.frontFill
                this.ctx.fill()
                this.ctx.stroke()
            }

            if (!cube.neighbors.left)
            {
                this.ctx.beginPath()
                this.ctx.moveTo(startCoords.x, startCoords.y)
                this.ctx.lineTo(startCoords.x, startCoords.y + this.gridSize.y/2)
                this.ctx.lineTo(startCoords.x + this.gridSize.z/2, startCoords.y + this.gridSize.y/4)
                this.ctx.lineTo(startCoords.x + this.gridSize.z/2, startCoords.y - this.gridSize.y/4)
                this.ctx.lineTo(startCoords.x, startCoords.y)
                this.ctx.closePath()
                this.ctx.fillStyle = cube.leftFill
                this.ctx.fill()
                this.ctx.stroke()
            }
            
            if (!cube.neighbors.up)
            {
                this.ctx.beginPath()
                this.ctx.moveTo(startCoords.x, startCoords.y)
                this.ctx.lineTo(startCoords.x - this.gridSize.x/2, startCoords.y - this.gridSize.y/4)
                this.ctx.lineTo(startCoords.x, startCoords.y - this.gridSize.y/2)
                this.ctx.lineTo(startCoords.x + this.gridSize.x/2, startCoords.y - this.gridSize.y/4)
                this.ctx.lineTo(startCoords.x, startCoords.y)
                this.ctx.closePath()
                this.ctx.fillStyle = cube.upFill
                this.ctx.fill()
                this.ctx.stroke()
            }
        }
    }

    /**
     * draw a complete cube
     * @param {Sprite} sprite 
     */
    drawSprite (sprite) {
        sprite.image.then((img) => {
            if (!(sprite.neighbors.front && sprite.neighbors.up && sprite.neighbors.left))
            {
                let x = sprite.pos.x
                let y = sprite.pos.y
                let z = sprite.pos.z

                let startCoords = new IsoEngine.vector2D (
                    this.ctx.canvas.width/2 + (x * this.gridSize.x/2) + -(z * this.gridSize.z/2),
                    this.ctx.canvas.height/2 + (x * this.gridSize.x/4) + (z * this.gridSize.z/4) + (y * this.gridSize.y/2)
                )

                this.ctx.drawImage(img, startCoords.x, startCoords.y, this.gridSize.x, this.gridSize.y)

                if (!sprite.neighbors.front)
                {
                    this.ctx.beginPath()
                    this.ctx.moveTo(startCoords.x, startCoords.y)
                    this.ctx.lineTo(startCoords.x, startCoords.y + this.gridSize.y/2)
                    this.ctx.lineTo(startCoords.x - this.gridSize.x/2, startCoords.y + this.gridSize.y/4)
                    this.ctx.lineTo(startCoords.x - this.gridSize.x/2, startCoords.y - this.gridSize.y/4)
                    this.ctx.lineTo(startCoords.x, startCoords.y)
                    this.ctx.closePath()
                    this.ctx.stroke()
                }

                if (!sprite.neighbors.left)
                {
                    this.ctx.beginPath()
                    this.ctx.moveTo(startCoords.x, startCoords.y)
                    this.ctx.lineTo(startCoords.x, startCoords.y + this.gridSize.y/2)
                    this.ctx.lineTo(startCoords.x + this.gridSize.z/2, startCoords.y + this.gridSize.y/4)
                    this.ctx.lineTo(startCoords.x + this.gridSize.z/2, startCoords.y - this.gridSize.y/4)
                    this.ctx.lineTo(startCoords.x, startCoords.y)
                    this.ctx.closePath()
                    this.ctx.stroke()
                }
                
                if (!sprite.neighbors.up)
                {
                    this.ctx.beginPath()
                    this.ctx.moveTo(startCoords.x, startCoords.y)
                    this.ctx.lineTo(startCoords.x - this.gridSize.x/2, startCoords.y - this.gridSize.y/4)
                    this.ctx.lineTo(startCoords.x, startCoords.y - this.gridSize.y/2)
                    this.ctx.lineTo(startCoords.x + this.gridSize.x/2, startCoords.y - this.gridSize.y/4)
                    this.ctx.lineTo(startCoords.x, startCoords.y)
                    this.ctx.closePath()
                    this.ctx.stroke()
                }
            }
        })
    }

}