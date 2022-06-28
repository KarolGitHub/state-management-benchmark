<script>
  import { generateData, saveUserTimings, dataJSON, saveToJSON, performanceAPI } from '../../../utils';
  import { afterUpdate, onMount } from 'svelte';
  import './../../../css/styles.css';

  let data = [],
    selected = undefined,
    operationType = 'init';
  performance.mark(operationType);
  onMount(async () => {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      saveToJSON(perf, 'svelte.json');
    });

    performance.mark(operationType);

    return () => {
      window.removeEventListener('load', () => {});
    };
  });

  afterUpdate(() => {
    setTimeout(() => performance.measure(operationType, operationType));
  });

  const create = (count) => {
      operationType = `create ${count}`;
      performance.mark(operationType);
      data = generateData(count);
      selected = undefined;
    },
    add = (count) => {
      operationType = `add ${count}`;
      performance.mark(operationType);
      data = data.concat(generateData(count));
    },
    load = (count) => {
      operationType = `load ${count}`;
      performance.mark(operationType);
      data = dataJSON.slice(0, count);
      selected = undefined;
    },
    swap = (count) => {
      operationType = `swap ${2 * count}`;
      performance.mark(operationType);
      if (data.length >= 2 * count) {
        data = [
          ...data.slice(data.length - count, data.length),
          ...data.slice(count, data.length - count),
          ...data.slice(0, count)
        ];
      }
    },
    remove = (num) => {
      operationType = `delete ${data.length}`;
      performance.mark(operationType);
      const idx = data.findIndex((d) => d.id === num);
      data = [...data.slice(0, idx), ...data.slice(idx + 1)];
    },
    select = (id) => {
      operationType = `select ${data.length}`;
      performance.mark(operationType);
      selected = id;
    },
    update = () => {
      operationType = `update ${data.length}`;
      performance.mark(operationType);
      for (let i = 0; i < data.length; i += 1) {
        data[i].name += '!';
        data[i].active = !data[i].active;
        data[i].birthday = new Date(+new Date() - Math.floor(Math.random() * 10000000000)).toLocaleDateString();
        data[i].email += '!';
        data[i].salary += 200;
      }
    },
    clear = () => {
      operationType = `clear ${data.length}`;
      performance.mark(operationType);
      data = [];
      selected = undefined;
    };
</script>

<div class="jumbotron">
  <div class="row">
    <div class="col-md-2 p-1 me-2">
      <h1>
        Svelte <br />
        v3.42.1
      </h1>
      <div class="card bg-light w-nav">
        <a class="nav-link" href="http://localhost:3000">
          <span class="fas fa-arrow-left" aria-hidden="true" /> Go back
        </a>
      </div>
    </div>
    <div class="col-md-9">
      <div class="row">
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="createFew" on:click={() => create(100)}>
            Create 100 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="create" on:click={() => create(1000)}>
            Create 1,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="createLots" on:click={() => create(10000)}>
            Create 10,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="addFew" on:click={() => add(100)}>
            Add 100 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="add" on:click={() => add(1000)}>
            Add 1,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="addLots" on:click={() => add(10000)}>
            Add 10,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="swapFew" on:click={() => swap(50)}>
            Swap 100 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="swap" on:click={() => swap(500)}>
            Swap 1,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="swapLots" on:click={() => swap(5000)}>
            Swap 10,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="loadFew" on:click={() => load(100)}>
            Load 100 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="load" on:click={() => load(1000)}>
            Load 1,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="loadLots" on:click={() => load(10000)}>
            Load 10,000 rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="update" on:click={() => update()}>
            Update All rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button type="button" class="btn btn-primary btn-block w-100" id="clear" on:click={() => clear()}>
            Clear rows
          </button>
        </div>
        <div class="col-sm-4 p-2">
          <button
            type="button"
            class="btn btn-primary btn-block w-100"
            id="saveUserTimings"
            on:click={() => saveUserTimings('svelte')}
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
      <th />
    </tr>
  </thead>
  <tbody>
    {#each data as row (row.id)}
      <tr class={selected === row.id ? 'danger' : ''} on:click={() => select(row.id)}>
        <td class="col-md-1">{row.id}</td>
        <td class="col-md-3">{row.name}</td>
        <td class="col-md-1">{+row.active}</td>
        <td class="col-md-2">{row.birthday}</td>
        <td class="col-md-4">{row.email}</td>
        <td class="col-md-2">{row.salary}</td>
        <td class="col-md-1">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a href="#" on:click={() => remove(row.id)}><span class="fas fa-trash text-danger" aria-hidden="true" /></a
          ></td
        ><td class="col-md-6" /></tr
      >
    {/each}
  </tbody>
</table>
<span class="preloadicon fas fa-trash hover" aria-hidden="true" />
