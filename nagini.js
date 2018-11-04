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

    return [...body(this.length)];
  }

  move(dx, dy) {
    // function* body() {
    //   while (i < length) {
    //     yield [x + (i * size) , y + (i * size), size, size];
    //     i++;
    //   }
    // }

    // return [...body()];
  }
}