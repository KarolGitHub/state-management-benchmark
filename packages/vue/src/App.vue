<script>
import { generateData, saveUserTimings as saveTimings, dataJSON } from '../../../utils';

performance.mark('init');

export default {
  data() {
    return {
      operationType: 'init',
      selected: undefined,
      rows: [],
      stopTimer: null
    };
  },
  methods: {
    setRows(update = this.rows.slice()) {
      this.rows = update;
    },

    create(count) {
      this.operationType = `create ${count}`;
      performance.mark(this.operationType);
      this.setRows(generateData(count));
      this.selected = undefined;
    },

    add(count) {
      this.operationType = `add ${count}`;
      performance.mark(this.operationType);
      this.rows = this.rows.concat(generateData(count));
      this.setRows();
    },

    swap(count) {
      this.operationType = `swap ${count}`;
      performance.mark(this.operationType);
      if (this.rows.length >= 2 * count) {
        this.rows = [
          ...this.rows.slice(this.rows.length - count),
          ...this.rows.slice(count, this.rows.length - count),
          ...this.rows.slice(0, count)
        ];
        this.setRows();
      }
    },

    load(count) {
      this.operationType = `load ${count}`;
      performance.mark(this.operationType);
      this.rows = dataJSON.slice(0, count);
      this.selected = undefined;
      this.setRows();
    },

    remove(id) {
      this.operationType = `delete ${this.rows.length}`;
      performance.mark(this.operationType);
      this.rows.splice(
        this.rows.findIndex((d) => d.id === id),
        1
      );
      this.setRows();
    },

    select(id) {
      this.operationType = `select ${this.rows.length}`;
      performance.mark(this.operationType);
      this.selected = id;
    },

    update() {
      this.operationType = `update ${this.rows.length}`;
      performance.mark(this.operationType);
      const newRows = this.rows;
      for (let i = 0; i < newRows.length; i += 1) {
        newRows[i].name += '!';
        newRows[i].active = !newRows[i].active;
        newRows[i].birthday = new Date(+new Date() - Math.floor(Math.random() * 10000000000)).toLocaleDateString();
        newRows[i].email += '!';
        newRows[i].salary += 200;
      }
      this.setRows();
    },

    clear() {
      this.operationType = `clear ${this.rows.length}`;
      performance.mark(this.operationType);
      this.setRows([]);
      this.selected = undefined;
    },
    saveUserTimings() {
      saveTimings('vue');
    }
  },

  /* mounted() {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      saveToJSON(perf, 'vue.json');
    });

    performance.measure(this.operationType, this.operationType);
  }, */
  updated() {
    setTimeout(() => performance.measure(this.operationType, this.operationType));
  }
  /*  beforeUnmount() {
    window.removeEventListener('load', () => {});
  } */
};
</script>

<template>
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-2 p-1 me-2">
        <h1>
          Vue.js <br />
          v3.2.1
        </h1>
        <div class="card bg-light w-nav">
          <a class="nav-link" href="http://localhost:3000">
            <span class="fas fa-arrow-left" aria-hidden="true"></span> Go back
          </a>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="createFew" @click="create(100)">
              Create 100 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="create" @click="create(1000)">
              Create 1,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="createLots" @click="create(10000)">
              Create 10,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="addFew" @click="add(100)">
              Add 100 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="add" @click="add(1000)">
              Add 1,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="addLots" @click="add(10000)">
              Add 10,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="swapFew" @click="swap(50)">
              Swap 100 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="swap" @click="swap(500)">
              Swap 1,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="swapLots" @click="swap(5000)">
              Swap 10,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="loadFew" @click="load(100)">
              Load 100 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="load" @click="load(1000)">
              Load 1,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="loadLots" @click="load(10000)">
              Load 10,000 rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="update" @click="update()">
              Update All rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button type="button" class="btn btn-primary btn-block w-100" id="clear" @click="clear()">
              Clear rows
            </button>
          </div>
          <div class="col-sm-4 p-2">
            <button
              type="button"
              class="btn btn-primary btn-block w-100"
              id="saveUserTimings"
              @click="saveUserTimings()"
            >
              Get timings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-hover table-striped test-data">
    <thead>
      <tr>
        <th>Id</th>
        <th>Full Name</th>
        <th>Active</th>
        <th>Birthdate</th>
        <th>Email</th>
        <th>Salary</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="{ id, name, active, birthday, email, salary } of rows"
        :key="id"
        :class="{ danger: id === selected }"
        v-memo="[name, active, birthday, email, salary, id === selected]"
      >
        <td class="col-md-1">{{ id }}</td>
        <td class="col-md-3">{{ name }}</td>
        <td class="col-md-1">{{ +active }}</td>
        <td class="col-md-2">{{ birthday }}</td>
        <td class="col-md-4" @click="select(id)">{{ email }}</td>
        <td class="col-md-2">{{ salary }}</td>
        <td class="col-md-1">
          <a @click="remove(id)">
            <span class="fas fa-trash text-danger" aria-hidden="true"></span>
          </a>
        </td>
        <td class="col-md-6"></td>
      </tr>
    </tbody>
  </table>
  <span class="preloadicon fas fa-trash" aria-hidden="true"></span>
</template>
