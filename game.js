(async function setUpGlobals() {
    Globals.ctx = document.querySelector("canvas").getContext("2d")
    Globals.isoEngine = new IsoEngine(Globals.ctx, [100, 100, 100])
    Globals.tileSet = await (await fetch("./tileset.json")).json()
    Globals.loadedMap = new GameMap([
        {pos: new IsoEngine.vector3D(0,0,0), typeId: 3},
        {pos: new IsoEngine.vector3D(1,0,0), typeId: 3},
        {pos: new IsoEngine.vector3D(0,0,1), typeId: 3},
        {pos: new IsoEngine.vector3D(1,0,1), typeId: 3},
        {pos: new IsoEngine.vector3D(1,0,3), typeId: 3},
        {pos: new IsoEngine.vector3D(1,0,4), typeId: 3},
        {pos: new IsoEngine.vector3D(0,-1,0), typeId: 3},
        {pos: new IsoEngine.vector3D(1,-1,1), typeId: 3},
        {pos: new IsoEngine.vector3D(1,1,2), typeId: 3},
        {pos: new IsoEngine.vector3D(1,0,2), typeId: 3},
    ])
})().then(() => {
    setInterval(() => {
        Globals.ctx.clearRect(0, 0, Globals.ctx.canvas.width, Globals.ctx.canvas.height)
        Globals.loadedMap.draw();
    }, 250);
})