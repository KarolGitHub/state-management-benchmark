export default class HomeController {
  $onInit() {
    this.data = [];
    this.id = 1;
  }

  generateData(count = 1000) {
    const adjectives = [
      'pretty',
      'large',
      'big',
      'small',
      'tall',
      'short',
      'long',
      'handsome',
      'plain',
      'quaint',
      'clean',
      'elegant',
      'easy',
      'angry',
      'crazy',
      'helpful',
      'mushy',
      'odd',
      'unsightly',
      'adorable',
      'important',
      'inexpensive',
      'cheap',
      'expensive',
      'fancy'
    ];
    const colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
    const nouns = [
      'table',
      'chair',
      'house',
      'bbq',
      'desk',
      'car',
      'pony',
      'cookie',
      'sandwich',
      'burger',
      'pizza',
      'mouse',
      'keyboard'
    ];

    const data = [];
    for (let i = 0, len = count; i < len; i++) {
      data.push({
        id: this.id++,
        label: `${adjectives[this._random(adjectives.length)]} ${colours[this._random(colours.length)]} ${
          nouns[this._random(nouns.length)]
        }`
      });
    }
    return data;
  }

  _random(max) {
    return Math.round(Math.random() * 1000) % max;
  }

  add() {
    this.data = this.data.concat(this.generateData(1000));
  }

  select(item) {
    this.selected = item.id;
  }

  delete(item) {
    const idx = this.data.findIndex((d) => d.id === item.id);
    this.data.splice(idx, 1);
  }

  update() {
    for (let i = 0; i < this.data.length; i += 10) {
      this.data[i].label += ' !!!';
    }
  }

  run() {
    this.data = this.generateData();
  }

  runLots() {
    this.data = this.generateData(10000);
    this.selected = null;
  }

  clear() {
    this.data = [];
    this.selected = null;
  }

  swapRows() {
    if (this.data.length > 998) {
      var temp = this.data[1];
      this.data[1] = this.data[998];
      this.data[998] = temp;
    }
  }
}
