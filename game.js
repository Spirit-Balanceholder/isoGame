(function setUpGlobals() {
    Globals.ctx = document.querySelector("canvas").getContext("2d")
    Globals.isoEngine = new IsoEngine(Globals.ctx, [100, 100, 100])
    Globals.loadedMap = new GameMap([
        new IsoEngine.vector3D(0,0,0),
        new IsoEngine.vector3D(1,0,0),
        new IsoEngine.vector3D(0,0,1),
        new IsoEngine.vector3D(1,0,1),
        new IsoEngine.vector3D(0,-1.5,0)
    ])
})()

setInterval(() => {
    Globals.ctx.clearRect(0, 0, Globals.ctx.canvas.width, Globals.ctx.canvas.height)
    Globals.loadedMap.draw();
}, 250);