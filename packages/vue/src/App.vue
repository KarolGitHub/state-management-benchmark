<script>
import { performanceAPI, SaveToJSON, generateData, saveUserTimings as userTimings } from '../../../utils';

performance.mark('load');

export default {
  data() {
    return {
      operationType: 'load',
      selected: undefined,
      rows: [],
      stopTimer: null
    };
  },
  methods: {
    setRows(update = this.rows.slice()) {
      this.rows = update;
    },

    saveUserTimings() {
      userTimings();
    },

    add() {
      this.operationType = 'add';
      performance.mark(this.operationType);
      this.rows = this.rows.concat(generateData(1000));
    },

    remove(id) {
      this.operationType = 'delete';
      performance.mark(this.operationType);
      this.rows.splice(
        this.rows.findIndex((d) => d.id === id),
        1
      );
      this.setRows();
    },

    select(id) {
      this.operationType = 'select';
      this.selected = id;
      performance.measure(this.operationType, this.operationType);
    },

    run() {
      this.operationType = 'create';
      performance.mark(this.operationType);
      this.setRows(generateData(1000));
      this.selected = undefined;
    },

    update() {
      this.operationType = 'update';
      performance.mark(this.operationType);
      const _rows = this.rows;
      for (let i = 0; i < _rows.length; i += 10) {
        _rows[i].firstName += '_updated';
        _rows[i].lastName += '_updated';
        _rows[i].email += '_updated';
        _rows[i].birthday += '_updated';
      }
      this.setRows();
    },

    runLots() {
      this.operationType = 'create lots';
      performance.mark(this.operationType);
      this.setRows(generateData(10000));
      this.selected = undefined;
    },

    clear() {
      this.operationType = 'clear';
      performance.mark(this.operationType);
      this.setRows([]);
      this.selected = undefined;
    },

    swapRows() {
      this.operationType = 'swap';
      performance.mark(this.operationType);
      const _rows = this.rows;
      if (_rows.length > 998) {
        const d1 = _rows[1];
        const d998 = _rows[998];
        _rows[1] = d998;
        _rows[998] = d1;
        this.setRows();
      }
    }
  },

  mounted() {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      new SaveToJSON(perf, 'vue.json').download();
    });

    performance.measure(this.operationType, this.operationType);
  },
  updated() {
    performance.measure(this.operationType, this.operationType);
  },
  beforeUnmount() {
    window.removeEventListener('load', () => {});
  }
};
</script>

<template>
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-6">
        <h1>Vue.js 3</h1>
        <div className="col-md-6">
          <button type="button" className="btn btn-primary btn-block" id="getUserTimings" @click="saveUserTimings()">
            Get Timings
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block w-100" id="run" @click="run()">
              Create 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block w-100" id="runlots" @click="runLots()">
              Create 10,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block w-100" id="add" @click="add()">
              Append 1,000 rows
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block w-100" id="update" @click="update()">
              Update every 10th row
            </button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block w-100" id="clear" @click="clear()">Clear</button>
          </div>
          <div class="col-sm-6 smallpad">
            <button type="button" class="btn btn-primary btn-block w-100" id="swaprows" @click="swapRows()">
              Swap Rows
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-hover table-striped test-data">
    <tbody>
      <tr
        v-for="{ id, firstName, lastName, email, birthday } of rows"
        :key="id"
        :class="{ danger: id === selected }"
        v-memo="[firstName, lastName, email, birthday, id === selected]"
        @click="select(id)"
      >
        <td class="col-md-1">{{ id }}</td>
        <td class="col-md-4">{{ firstName }}</td>
        <td class="col-md-4">{{ lastName }}</td>
        <td class="col-md-4">{{ email }}</td>
        <td class="col-md-4">{{ birthday }}</td>
        <td class="col-md-1">
          <a @click="remove(id)">
            <span class="fas fa-trash" aria-hidden="true"></span>
          </a>
        </td>
        <td class="col-md-6"></td>
      </tr>
    </tbody>
  </table>
  <span class="preloadicon fas fa-trash" aria-hidden="true"></span>
</template>
