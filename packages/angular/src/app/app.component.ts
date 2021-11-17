import { Component, VERSION, OnInit, AfterViewChecked, DoCheck, OnChanges, OnDestroy } from '@angular/core';
import { performanceAPI, SaveToJSON, generateData, saveUserTimings as saveTimings } from '../../../../utils';

class Timer {
  constructor(private readonly operationType: string) {
    this.operationType = operationType;
    performance.mark(operationType);
  }

  stop() {
    performance.measure(this.operationType, this.operationType);
  }
}

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../../../../css/styles.css']
})
export class AppComponent implements AfterViewChecked, OnInit, DoCheck, OnDestroy {
  data: Array<Data> = [];
  selected: number = undefined;
  id: number = 1;
  backup: Array<Data> = undefined;
  version: string;
  operationType: string = 'load';
  private t: Timer;

  constructor() {
    this.version = VERSION.full;
    performance.mark(this.operationType);
  }

  ngOnInit(): void {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      new SaveToJSON(perf, 'angular.json').download();
    });

    performance.measure(this.operationType, this.operationType);
  }

  ngDoCheck() {
    this.t = new Timer(this.operationType);
  }

  ngAfterViewChecked(): void {
    // performance.measure(this.operationType, this.operationType);
    this.t.stop();
  }

  ngOnDestroy(): void {
    window.removeEventListener('load', () => {});
  }

  saveUserTimings() {
    saveTimings();
  }

  itemById(index: number, item: Data) {
    return item.id;
  }

  select(item: Data, event: Event) {
    this.operationType = 'select';
    performance.mark(this.operationType);
    event.preventDefault();
    this.selected = item.id;
  }

  delete(item: Data, event: Event) {
    this.operationType = 'delete';
    performance.mark(this.operationType);
    event.preventDefault();
    for (let i = 0, l = this.data.length; i < l; i++) {
      if (this.data[i].id === item.id) {
        this.data.splice(i, 1);
        break;
      }
    }
  }

  run() {
    this.operationType = 'create';
    performance.mark(this.operationType);
    this.data = generateData(1000);
  }

  add() {
    this.operationType = 'add';
    performance.mark(this.operationType);
    this.data = this.data.concat(generateData(1000));
  }

  update() {
    this.operationType = 'update';
    performance.mark(this.operationType);
    for (let i = 0; i < this.data.length; i += 10) {
      this.data[i].firstName += '_updated';
      this.data[i].lastName += '_updated';
      this.data[i].email += '_updated';
      this.data[i].birthday += '_updated';
    }
  }
  runLots() {
    this.operationType = 'create lots';
    performance.mark(this.operationType);
    this.data = generateData(10000);
    this.selected = undefined;
  }
  clear() {
    this.operationType = 'clear';
    performance.mark(this.operationType);
    this.data = [];
    this.selected = undefined;
  }
  swapRows() {
    this.operationType = 'swap';
    performance.mark(this.operationType);
    if (this.data.length > 998) {
      var a = this.data[1];
      this.data[1] = this.data[998];
      this.data[998] = a;
    }
  }
}
