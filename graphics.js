let c = document.getElementById("canvas")
let ctx = c.getContext("2d")
let baw = document.getElementById("baw")
ctx.translate(c.width / 2, c.height / 2)
let wPressed = false
let sPressed = false
let aPressed = false
let dPressed = false
let spacePressed = false
let gravity = 0.05
document.onkeyup = function (e) {
    if (e.key == "w") {
        wPressed = false
        e.preventDefault()
    }

    if (e.key == "s") {
        sPressed = false
        e.preventDefault()
    }
    if (e.key == "a") {
        aPressed = false
        e.preventDefault()
    }

    if (e.key == "d") {
        dPressed = false
        e.preventDefault()
    }
    if (e.code == "Space") {
        spacePressed = false
        e.preventDefault()
    }
}

document.onkeydown = function (e) {
    if (e.key == "w") {
        wPressed = true
        e.preventDefault()
    }

    if (e.key == "s") {
        sPressed = true
        e.preventDefault()
    }
    if (e.key == "a") {
        aPressed = true
        e.preventDefault()
    }

    if (e.key == "d") {
        dPressed = true
        e.preventDefault()
    }
    if (e.code == "Space") {
        spacePressed = true
        e.preventDefault()
    }
}






//moving everything

let xPrime = 0
let yPrime = 0
let zPrime = 0
let xRot = 1000 // |
let yRot = 0 // __    

let camera = {
    z: 0,
    y: 0,
    x: 0,
    speed: 0.2,
    yVel: 0
}


let POV = 400

//easier to make a line
function line(x1, y1, z1, x2, y2, z2) {

    if (z1 > 0 && z2 > 0 && z1 < 100 && z2 < 100) {
        ctx.beginPath()
        ctx.moveTo((x1 / z1) * POV, (y1 / z1) * POV)
        ctx.lineTo((x2 / z2) * POV, (y2 / z2) * POV)
        ctx.stroke();
    }
}



function xRotate(angle) {
    yPrime = camera.y * Math.cos(angle) - camera.z * Math.sin(angle)
    zPrime = camera.y * Math.sin(angle) + camera.z * Math.cos(angle)
    //camera.y' = camera.y*cos q - camera.z*sin q
    //camera.z' = camera.y*sin q + camera.z*cos q

}

function yRotate(angle) {
    zPrime = camera.z * Math.cos(angle) - camera.x * Math.sin(angle)
    xPrime = camera.z * Math.sin(angle) + camera.x * Math.cos(angle)
    // camera.z' = camera.z*cos q - camera.x*sin q
    // camera.x' = camera.z*sin q + camera.x*cos q

}

// function point(x, y, z) {
//     if (z > 0 && z > 0) {
//         ctx.fillRect((x / z) * POV, (y / z) * POV, 2, 2)
//     }
// }

// function dotCube(x, y, z) {
//     let one = [1 + camera.x + x, -1 + camera.y + y, 1 - camera.z + z]
//     let two = [-1 + camera.x + x, -1 + camera.y + y, 1 - camera.z + z]
//     let three = [1 + camera.x + x, 1 + camera.y + y, 1 - camera.z + z]
//     let four = [-1 + camera.x + x, 1 + camera.y + y, 1 - camera.z + z]
//     let five = [1 + camera.x + x, -1 + camera.y + y, -1 - camera.z + z]
//     let six = [-1 + camera.x + x, -1 + camera.y + y, -1 - camera.z + z]
//     let seven = [1 + camera.x + x, 1 + camera.y + y, -1 - camera.z + z]
//     let eight = [-1 + camera.x + x, 1 + camera.y + y, -1 - camera.z + z]
//     let smallVertices = []
//     smallVertices.push({
//         one
//     })
//     smallVertices.push({
//         two
//     })
//     smallVertices.push({
//         three
//     })
//     smallVertices.push({
//         four
//     })
//     smallVertices.push({
//         five
//     })
//     smallVertices.push({
//         six
//     })
//     smallVertices.push({
//         seven
//     })
//     smallVertices.push({
//         eight
//     })
//     //1
//     point(1 + camera.x + x, -1 + camera.y + y, 1 - camera.z + z)

//     //2
//     point(-1 + camera.x + x, -1 + camera.y + y, 1 - camera.z + z)

//     //3
//     point(1 + camera.x + x, 1 + camera.y + y, 1 - camera.z + z)

//     //4

//     point(-1 + camera.x + x, 1 + camera.y + y, 1 - camera.z + z)
//     //5
//     point(1 + camera.x + x, -1 + camera.y + y, -1 - camera.z + z)

//     //6
//     point(-1 + camera.x + x, -1 + camera.y + y, -1 - camera.z + z)

//     //7
//     point(1 + camera.x + x, 1 + camera.y + y, -1 - camera.z + z)

//     //8

//     point(-1 + camera.x + x, 1 + camera.y + y, -1 - camera.z + z)
// }

function cube(x, y, z, sx, sy, sz, rx, ry, rz) {
    let left = x - (sx / 2),
        right = x + (sx / 2),
        front = z + (sz / 2),
        back = z - (sz / 2),
        top = y - (sy / 2),
        bottom = y + (sy / 2)

    //small square
    line(right + camera.x + x, top + camera.y + y, 1 - camera.z + z, left + camera.x + x, top + camera.y + y, 1 - camera.z + z)
    line(left + camera.x + x, top + camera.y + y, 1 - camera.z + z, left + camera.x + x, bottom + camera.y + y, 1 - camera.z + z)
    line(right + camera.x + x, bottom + camera.y + y, 1 - camera.z + z, right + camera.x + x, top + camera.y + y, 1 - camera.z + z)
    line(right + camera.x + x, bottom + camera.y + y, 1 - camera.z + z, left + camera.x + x, bottom + camera.y + y, 1 - camera.z + z)
    //connecting lines
    line(right + camera.x + x, top + camera.y + y, 1 - camera.z + z, right + camera.x + x, top + camera.y + y, -1 - camera.z + z)
    line(left + camera.x + x, top + camera.y + y, 1 - camera.z + z, left + camera.x + x, top + camera.y + y, -1 - camera.z + z)
    line(right + camera.x + x, bottom + camera.y + y, 1 - camera.z + z, right + camera.x + x, bottom + camera.y + y, -1 - camera.z + z)
    line(left + camera.x + x, bottom + camera.y + y, 1 - camera.z + z, left + camera.x + x, bottom + camera.y + y, -1 - camera.z + z)
    //bigger square
    line(right + camera.x + x, top + camera.y + y, -1 - camera.z + z, left + camera.x + x, top + camera.y + y, -1 - camera.z + z)
    line(left + camera.x + x, top + camera.y + y, -1 - camera.z + z, left + camera.x + x, bottom + camera.y + y, -1 - camera.z + z)
    line(right + camera.x + x, bottom + camera.y + y, -1 - camera.z + z, right + camera.x + x, top + camera.y + y, -1 - camera.z + z)
    line(right + camera.x + x, bottom + camera.y + y, -1 - camera.z + z, left + camera.x + x, bottom + camera.y + y, -1 - camera.z + z)

}


ctx.lineWidth = 1
//de loop
function loop() {
    if (baw.checked == true)
        ctx.fillStyle = "#000"
    else
        ctx.fillStyle = "#FFF"
    ctx.fillRect(0 - (c.width / 2), 0 - (c.height / 2), c.width, c.height)
    xRotate(xRot)
    yRotate(yRot)
    if (wPressed) {
        camera.z += camera.speed
    }
    if (sPressed) {
        camera.z -= camera.speed
    }
    if (aPressed) {
        camera.x += camera.speed
    }
    if (dPressed) {
        camera.x -= camera.speed
    }
    if (camera.y > 0) {
        camera.yVel -= gravity
    }
    if (camera.y <= 0) {
        if (camera.yVel < 0) {
            camera.yVel = 0
        }
        camera.y = 0
        if (spacePressed) {
            camera.yVel += 0.75
        }
    }

    for (let i = 0; i < 1000; i++) {
        cube(0, 0, i, 2, 2, 2)
        ctx.strokeStyle = "hsl(" + i + ", 100%, 50%)"
    }

    //dotCube(20, 0, 0)
    cube(10, 0, 10, 2, 2, 2)
    camera.y += camera.yVel
    requestAnimationFrame(loop)
    ctx.fillStyle = "black"

}
loop()
