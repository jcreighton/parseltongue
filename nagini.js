class Nagini {
  constructor() {
    this.length = 4;
    this.size = 20;
    this.x = 480 / 2;
    this.y = 480 / 2;

    this.build = this.build.bind(this);
    this.body = this.build(this.x, this.y, 20, this.length);
  }

  grow() {
    this.length++;
  }

  build(x, y, grid, length) {
    let i = 0;
    function* body(length) {
      while (i < length) {
        yield [x , y + (i * grid)];
        i++;
      }
    }

    return [...body(length)];
  }

  move(body, dx = 0, dy = 0) {
    const [x, y] = body[0];
    const head = [x + dx, y + dy];
    const c = [
      head,
      ...body.slice(0, this.length - 1),
    ];
    return c;
  }
}