let ground
let bird
let engine
let columns = []
let points = 0
let canFly = true
let dotImg

const { Engine, Body, Events } = Matter

function preload() {
  dotImg = loadImage('bird.png')
}

function generateColumn() {
    box1Height = ceil(random(50, 300))
    gapHeight = ceil(random(150, 200))
    box2Height = height - (box1Height + gapHeight)
    let column = new Column(box1Height, gapHeight, box2Height)
    columns.push(column)
}

function generateAllColumns() {
    generateColumn()
    setInterval(function() {
        generateColumn()
    }, 3000)
}

function setup() {
    const canvas = createCanvas(displayWidth, displayHeight - 110)
    engine = Engine.create()
    world = engine.world
    ground = new Ground(width / 2, height - 10, width, 20)
    bird = new Bird(150, 300, 20)
    generateAllColumns()
}

function mousePressed() {
    if (canFly) {
        let pushVec = Matter.Vector.create(0, -0.1)
        let posVec = Matter.Vector.create(bird.body.position.x, bird.body.position.y)
        Body.applyForce(bird.body, posVec, pushVec)
    }
}

function draw() {
    background(51)

    if (!canFly) {
        setTimeout(function() {
            noLoop()
        }, 2000)
    }
    Matter.Engine.update(engine)
    ground.show()
    bird.show()

    let groundCollide = Matter.SAT.collides(bird.body, ground.body)
    if (groundCollide.collided) {
        canFly = false
    }

    columns.forEach(function (column, i) {
        if (column !== undefined) {
            let box1Collide = Matter.SAT.collides(bird.body, column.box1.body)
            let box2Collide = Matter.SAT.collides(bird.body, column.box2.body)
            let gapCollide = Matter.SAT.collides(bird.body, column.gap.body)

            if (box1Collide.collided || box2Collide.collided)
                canFly = false

            if ((column.box1.body.position.x + column.box1.w / 2) < 0 &&
                (column.box2.body.position.x + column.box2.w / 2) < 0 &&
                (column.gap.body.position.x + column.gap.w / 2) < 0) {
                console.log('removed column ' + i)
                Matter.World.remove(world, column.box1)
                Matter.World.remove(world, column.gap)
                Matter.World.remove(world, column.box2)
                columns[i] = undefined
                points++;
                console.log(columns)
            } else {
                if (canFly) {
                    column.move()
                }
                column.show()
            }
        }
    })

    function checkUndefined(x) {
        return x !== undefined
    }

    columns = columns.filter(checkUndefined);

    push()
    textSize(32)
    fill(255)
    textAlign(CENTER)
    text(points, width/2, 50)
    pop()

}
