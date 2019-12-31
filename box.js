class Box {

  constructor(x, y, w, h, gap=false) {
    var options = {
      restitution: 0.5,
    }
    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    this.body.inertia = Infinity
    this.body.isStatic = true

    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;
    this.gap = gap

    if (this.gap)
        this.body.isSensor = true
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    if (this.gap) {
        noFill()
        noStroke()
    } else {
        fill(134, 187, 72)
    }
    rectMode(CENTER);
    rect(0, 0, this.w, this.h)
    // imageMode(CENTER);
    // image(boxImg, 0, 0, this.w, this.h);
    pop();
  }

  move() {
      let pushVec = Matter.Vector.create(-2, 0)
      Matter.Body.translate(this.body, pushVec)
  }

}
