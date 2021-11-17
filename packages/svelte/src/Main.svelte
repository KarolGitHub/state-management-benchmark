<script>
  import { performanceAPI, SaveToJSON, generateData, saveUserTimings as saveTimings } from '../../../utils';
  import { onMount, afterUpdate } from 'svelte';

  let data = [],
    selected = undefined,
    operationType = 'load';

  onMount(async () => {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      new SaveToJSON(perf, 'svelte.json').download();
    });

    performance.mark(operationType);

    return () => {
      window.removeEventListener('load', () => {});
    };
  });

  afterUpdate(() => {
    performance.measure(operationType, operationType);
  });

  const saveUserTimings = () => {
      saveTimings();
    },
    add = () => {
      operationType = 'add';
      performance.mark(operationType);
      data = data.concat(generateData(1000));
    },
    clear = () => {
      operationType = 'clear';
      performance.mark(operationType);
      data = [];
      selected = undefined;
    },
    partialUpdate = () => {
      operationType = 'update';
      performance.mark(operationType);
      for (let i = 0; i < data.length; i += 10) {
        data[i].firstName += '_updated';
        data[i].lastName += '_updated';
        data[i].email += '_updated';
        data[i].birthday += '_updated';
      }
    },
    remove = (num) => {
      operationType = 'delete';
      performance.mark(operationType);
      const idx = data.findIndex((d) => d.id === num);
      data = [...data.slice(0, idx), ...data.slice(idx + 1)];
    },
    run = () => {
      operationType = 'create';
      performance.mark(operationType);
      data = generateData(1000);
      selected = undefined;
    },
    runLots = () => {
      operationType = 'create lots';
      performance.mark(operationType);
      data = generateData(10000);
      selected = undefined;
    },
    select = (id) => {
      operationType = 'select';
      performance.mark(operationType);
      selected = id;
    },
    swapRows = () => {
      operationType = 'swap';
      performance.mark(operationType);
      if (data.length > 998) {
        data = [data[0], data[998], ...data.slice(2, 998), data[1], data[999]];
      }
    };
</script>

<div class="jumbotron">
  <div class="row">
    <div class="col-md-6">
      <h1>Svelte</h1>
      <div class="col-md-6">
        <button type="button" class="btn btn-primary btn-block" id="getUserTimings" on:click={saveUserTimings}>
          Get Timings
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-6 smallpad">
          <button type="button" class="btn btn-primary btn-block w-100" id="run" on:click={run}
            >Create 1,000 rows</button
          >
        </div>
        <div class="col-sm-6 smallpad">
          <button type="button" class="btn btn-primary btn-block w-100" id="runlots" on:click={runLots}
            >Create 10,000 rows</button
          >
        </div>
        <div class="col-sm-6 smallpad">
          <button type="button" class="btn btn-primary btn-block w-100" id="add" on:click={add}
            >Append 1,000 rows</button
          >
        </div>
        <div class="col-sm-6 smallpad">
          <button type="button" class="btn btn-primary btn-block w-100" id="update" on:click={partialUpdate}
            >Update every 10th row</button
          >
        </div>
        <div class="col-sm-6 smallpad">
          <button type="button" class="btn btn-primary btn-block w-100" id="clear" on:click={clear}>Clear</button>
        </div>
        <div class="col-sm-6 smallpad">
          <button type="button" class="btn btn-primary btn-block w-100" id="swaprows" on:click={swapRows}
            >Swap Rows</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
<table class="table table-hover table-striped test-data">
  <tbody>
    {#each data as row (row.id)}
      <tr class={selected === row.id ? 'danger' : ''} on:click={() => select(row.id)}
        ><td class="col-md-1">{row.id}</td>
        <td class="col-md-4">{row.firstName}</td>
        <td class="col-md-4">{row.lastName}</td>
        <td class="col-md-4">{row.birthday}</td>
        <td class="col-md-4">{row.email}</td>
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
