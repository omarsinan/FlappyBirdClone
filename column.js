class Column {

  constructor(box1Height, gapHeight, box2Height) {
      this.box1 = new Box(width + 100, box1Height / 2, 100, box1Height)
      this.box2 = new Box(width + 100, height - (box2Height / 2), 100, box2Height)
      this.gap = new Box(width + 100, box1Height + (gapHeight / 2), 100, gapHeight, true)
  }

  show() {
    this.box1.show()
    this.box2.show()
    this.gap.show()
  }

  move() {
      this.box1.move()
      this.box2.move()
      this.gap.move()
  }
}
