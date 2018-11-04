class Nagini {
  constructor() {
    this.length = 4;
    this.size = 20;
    this.x = 500 / 2 + (2 * 20);
    this.y = 500 / 2 - (2 * 20);

    this.draw = this.draw.bind(this);
  }

  grow() {
    this.length++;
  }

  draw() {
    let i = 0;
    let x = this.x;
    let y = this.y;
    let size = this.size;

    function* body(length) {
      while (i < length) {
        i++;
        yield [x - (i * size) , y, size, size];
      }
    }

    this.body = [...body(this.length)];
    return this.body;
  }

  move(dx, dy) {
    this.x = this.x + dx;
    this.y = this.y + dy
    const head = [this.x, this.y];
    const body = this.body.slice(0, this.length);
    this.body = [
      head,
      ...body,
    ];

    return this.body;
  }
}