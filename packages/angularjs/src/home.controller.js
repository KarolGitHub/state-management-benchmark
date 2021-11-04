import { generateData } from '../../../utils';
export default class HomeController {
  $onInit() {
    this.data = [];
    this.id = 1;
  }

  add() {
    this.data = this.data.concat(generateData(1000));
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
    this.data = generateData(1000);
  }

  runLots() {
    this.data = generateData(10000);
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
