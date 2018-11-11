class Snake {
  constructor(length) {
    this.length = length;

    this.build = this.build.bind(this);
    this.move = this.move.bind(this);
    this.grow = this.grow.bind(this);
    this.reset = this.reset.bind(this, length);
  }

  build(x, y, grid) {
    let i = 0;
    function* body(length) {
      while (i < length) {
        yield [x , y + (i * grid)];
        i++;
      }
    }

    return [...body(this.length)];
  }

  move(body, dx = 0, dy = 0) {
    const [x, y] = body[0];
    const head = [x + dx, y + dy];

    return [
      head,
      ...body.slice(0, this.length - 1),
    ];
  }

  grow() {
    this.length++;
  }

  reset(length) {
    this.length = length;
  }
}
