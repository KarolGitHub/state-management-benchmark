import { memo, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { generateData, saveUserTimings, dataJSON, saveToJSON, performanceAPI } from '../../../utils';
import './../../../css/styles.css';

const initialState = { data: [], selected: 0 };
let operationType = 'init';
performance.mark(operationType);

const listReducer = (state, action) => {
  const { data, selected } = state;

  switch (action.type) {
    case 'CREATE': {
      operationType = `create ${action.count}`;
      performance.mark(operationType);
      return { data: generateData(action.count), selected: 0 };
    }
    case 'ADD': {
      operationType = `add ${action.count}`;
      performance.mark(operationType);
      return { data: data.concat(generateData(action.count)), selected };
    }
    case 'LOAD': {
      operationType = `load ${action.count}`;
      performance.mark(operationType);
      return { data: dataJSON.slice(0, action.count), selected: 0 };
    }
    case 'SWAP': {
      operationType = `swap ${2 * action.count}`;
      performance.mark(operationType);
      return data.length >= 2 * action.count
        ? {
            data: [
              ...data.slice(data.length - action.count),
              ...data.slice(action.count, data.length - action.count),
              ...data.slice(0, action.count)
            ],
            selected
          }
        : state;
    }
    case 'DELETE': {
      operationType = `delete ${data.length}`;
      performance.mark(operationType);
      const idx = data.findIndex((d) => d.id === action.id);

      return { data: [...data.slice(0, idx), ...data.slice(idx + 1)], selected };
    }
    case 'SELECT': {
      operationType = `select ${data.length}`;
      performance.mark(operationType);
      return { data, selected: action.id };
    }
    case 'UPDATE': {
      operationType = `update ${data.length}`;
      performance.mark(operationType);
      const newData = data.slice(0);

      for (let i = 0; i < newData.length; i += 1) {
        const r = newData[i];
        newData[i] = {
          id: r.id,
          name: r.name + '!',
          active: !r.active,
          birthday: new Date(+new Date() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
          email: r.email + '!',
          salary: r.salary + 200
        };
      }

      return { data: newData, selected };
    }
    case 'CLEAR': {
      operationType = `clear ${data.length}`;
      performance.mark(operationType);
      return { data: [], selected: 0 };
    }
    default:
      return state;
  }
};

const Row = memo(
  ({ selected, item, dispatch }) => (
    <tr className={selected ? 'success' : ''}>
      <td className="col-md-1">{item.id}</td>
      <td className="col-md-3">{item.name}</td>
      <td className="col-md-1">{+item.active}</td>
      <td className="col-md-2">{item.birthday}</td>
      <td className="col-md-4" onClick={() => dispatch({ type: 'SELECT', id: item.id })}>
        {item.email}
      </td>
      <td className="col-md-2">{item.salary}</td>
      <td className="col-md-1">
        <a onClick={() => dispatch({ type: 'DELETE', id: item.id })}>
          <span className="fas fa-trash text-danger" aria-hidden="true" />
        </a>
      </td>
      <td className="col-md-6" />
    </tr>
  ),
  (prevProps, nextProps) => prevProps.selected === nextProps.selected && prevProps.item === nextProps.item
);

const Button = ({ id, clicked, title }) => (
  <div className="col-sm-4 p-2">
    <button type="button" className="btn btn-primary btn-block w-100" id={id} onClick={clicked}>
      {title}
    </button>
  </div>
);

const TestPanel = memo(
  ({ dispatch }) => (
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-2 p-1 me-2">
          <h1>
            React <br />
            v17.0.1
          </h1>
          <div className="card bg-light w-nav">
            <a className="nav-link" href="http://localhost:3000">
              <span className="fas fa-arrow-left" aria-hidden="true"></span> Go back
            </a>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <Button id="createFew" title="Create 100 rows" clicked={() => dispatch({ type: 'CREATE', count: 100 })} />
            <Button id="create" title="Create 1,000 rows" clicked={() => dispatch({ type: 'CREATE', count: 1000 })} />
            <Button
              id="createLots"
              title="Create 10,000 rows"
              clicked={() => dispatch({ type: 'CREATE', count: 10000 })}
            />
            <Button id="addFew" title="Add 100 rows" clicked={() => dispatch({ type: 'ADD', count: 100 })} />
            <Button id="add" title="Add 1,000 rows" clicked={() => dispatch({ type: 'ADD', count: 1000 })} />
            <Button id="addLots" title="Add 10,000 rows" clicked={() => dispatch({ type: 'ADD', count: 10000 })} />
            <Button id="swapFew" title="Swap 100 rows" clicked={() => dispatch({ type: 'SWAP', count: 50 })} />
            <Button id="swap" title="Swap 1,000 rows" clicked={() => dispatch({ type: 'SWAP', count: 500 })} />
            <Button id="swapLots" title="Swap 10,000 rows" clicked={() => dispatch({ type: 'SWAP', count: 5000 })} />
            <Button id="loadFew" title="Load 100 rows" clicked={() => dispatch({ type: 'LOAD', count: 100 })} />
            <Button id="load" title="Load 1,000 rows" clicked={() => dispatch({ type: 'LOAD', count: 1000 })} />
            <Button id="loadLots" title="Load 10,000 rows" clicked={() => dispatch({ type: 'LOAD', count: 10000 })} />
            <Button id="update" title="Update all rows" clicked={() => dispatch({ type: 'UPDATE' })} />
            <Button id="clear" title="Clear rows" clicked={() => dispatch({ type: 'CLEAR' })} />
            <Button title="Get timings" clicked={() => saveUserTimings('react')} />
          </div>
        </div>
      </div>
    </div>
  ),
  () => <true></true>
);

const App = () => {
  const [{ data, selected }, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    window.addEventListener('load', () => {
      const perf = performanceAPI();
      saveToJSON(perf, 'react.json');
    });
    return window.removeEventListener('load', () => {});
  }, []);

  useEffect(() => {
    setTimeout(() => {
      performance.measure(operationType, operationType);
    });
  });

  return (
    <div className="container" id="#contaiter">
      <TestPanel dispatch={dispatch} />
      <div className="d-flex align-items-center"></div>
      <table className="table table-hover table-striped test-data">
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
          {data.map((item) => (
            <Row key={item.id} item={item} selected={selected === item.id} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
      <span className="preloadicon fas fa-trash hover" aria-hidden="true" />
    </div>
  );
};

render(<App />, document.getElementById('App'));
