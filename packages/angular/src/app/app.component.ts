import { Component, VERSION, AfterViewChecked, NgZone } from '@angular/core';
import { generateData, dataJSON, saveUserTimings as userTimings } from '../../../../utils';
interface Data {
  id: number;
  name: string;
  active: boolean;
  birthday: string;
  email: string;
  salary: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../../../../css/styles.css']
})
export class AppComponent implements AfterViewChecked {
  data: Array<Data> = [];
  id: number = 1;
  selected: number = undefined;
  version: string;
  operationType: string = 'init';

  constructor(private zone: NgZone) {
    this.version = VERSION.full;
    performance.mark(this.operationType);
  }

  /*   ngOnInit(): void {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      saveToJSON(perf, 'angular.json');
    });
  } */

  ngAfterViewChecked(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        performance.measure(this.operationType, this.operationType);
      });
    });
  }

  /* ngOnDestroy(): void {
    window.removeEventListener('load', () => {});
  } */

  itemById(index: number, item: Data) {
    return item.id;
  }

  create(count: number, event: Event) {
    this.operationType = `create ${count}`;
    performance.mark(this.operationType);
    event.preventDefault();
    this.data = generateData(count);
    this.selected = undefined;
  }

  add(count: number, event: Event) {
    this.operationType = `add ${count}`;
    performance.mark(this.operationType);
    event.preventDefault();
    this.data = this.data.concat(generateData(count));
  }

  load(count: number, event: Event) {
    this.operationType = `load ${count}`;
    performance.mark(this.operationType);
    event.preventDefault();
    this.data = dataJSON.slice(0, count);
    this.selected = undefined;
  }

  swap(count: number, event: Event) {
    this.operationType = `swap ${2 * count}`;
    performance.mark(this.operationType);
    event.preventDefault();
    if (this.data.length >= 2 * count) {
      this.data = [
        ...this.data.slice(this.data.length - count),
        ...this.data.slice(count, this.data.length - count),
        ...this.data.slice(0, count)
      ];
    }
  }

  select(item: Data, event: Event) {
    this.operationType = `select ${this.data.length}`;
    performance.mark(this.operationType);
    event.preventDefault();
    this.selected = item.id;
  }

  delete(item: Data, event: Event) {
    this.operationType = `delete ${this.data.length}`;
    performance.mark(this.operationType);
    event.preventDefault();
    for (let i = 0, l = this.data.length; i < l; i++) {
      if (this.data[i].id === item.id) {
        this.data.splice(i, 1);
        break;
      }
    }
  }

  update() {
    this.operationType = `update ${this.data.length}`;
    performance.mark(this.operationType);
    for (let i = 0; i < this.data.length; i += 1) {
      this.data[i].name += '!';
      this.data[i].active = !this.data[i].active;
      this.data[i].birthday = new Date(+new Date() - Math.floor(Math.random() * 10000000000)).toLocaleDateString();
      this.data[i].email += '!';
      this.data[i].salary += 200;
    }
  }

  clear() {
    this.operationType = `clear ${this.data.length}`;
    performance.mark(this.operationType);
    this.data = [];
    this.selected = undefined;
  }

  saveUserTimings() {
    userTimings('angular');
  }
}
