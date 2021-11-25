import { memo, useEffect, useReducer } from 'react';
import { render } from 'react-dom';

import { performanceAPI, saveToJSON, generateData, saveUserTimings, dataJSON } from '../../../utils';
import './../../../css/styles.css';

const initialState = { data: [], selected: 0 };
let operationType = 'init';
performance.mark(operationType);

const listReducer = (state, action) => {
  const { data, selected } = state;

  switch (action.type) {
    case 'RUN':
      return { data: generateData(1000), selected: 0 };
    case 'RUN_LOTS':
      return { data: generateData(10000), selected: 0 };
    case 'ADD':
      return { data: data.concat(generateData(1000)), selected };
    case 'UPDATE': {
      const newData = data.slice(0);

      for (let i = 0; i < newData.length; i += 1) {
        const r = newData[i];
        newData[i] = {
          id: r.id,
          firstName: r.firstName + '_updated',
          lastName: r.lastName + '_updated',
          email: 'updated_' + r.email,
          birthday: r.birthday + '_updated'
        };
      }

      return { data: newData, selected };
    }
    case 'CLEAR':
      return { data: [], selected: 0 };
    case 'SWAP_ROWS':
      return data.length > 998
        ? { data: [data[0], data[998], ...data.slice(2, 998), data[1], data[999]], selected }
        : state;
    case 'DELETE': {
      const idx = data.findIndex((d) => d.id === action.id);

      return { data: [...data.slice(0, idx), ...data.slice(idx + 1)], selected };
    }
    case 'SELECT':
      return { data, selected: action.id };
    case 'LOAD':
      return { data: dataJSON, selected: 0 };
    default:
      return state;
  }
};

const Row = memo(
  ({ selected, item, dispatch }) => (
    <tr
      className={selected ? 'success' : ''}
      onClick={() => {
        operationType = 'select';
        performance.mark(operationType);
        return dispatch({ type: 'SELECT', id: item.id });
      }}>
      <td className="col-md-1">{item.id}</td>
      <td className="col-md-4">{item.firstName}</td>
      <td className="col-md-4">{item.lastName}</td>
      <td className="col-md-4">{item.birthday}</td>
      <td className="col-md-4">{item.email}</td>
      <td className="col-md-1">
        <a
          onClick={() => {
            operationType = 'delete';
            performance.mark(operationType);
            return dispatch({ type: 'DELETE', id: item.id });
          }}>
          <span className="fas fa-trash text-danger" aria-hidden="true" />
        </a>
      </td>
      <td className="col-md-6" />
    </tr>
  ),
  (prevProps, nextProps) => prevProps.selected === nextProps.selected && prevProps.item === nextProps.item
);

const Button = ({ id, clicked, title }) => (
  <div className="col-sm-6 smallpad">
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
          <div className="card bg-light" style={{ width: '120px' }}>
            <a className="nav-link" href="http://localhost:3000">
              <span className="fas fa-arrow-left" aria-hidden="true"></span> Go back
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <Button
              id="create"
              title="Create 1,000 rows"
              clicked={() => {
                operationType = 'create';
                performance.mark(operationType);
                dispatch({ type: 'RUN' });
              }}
            />
            <Button
              id="createLots"
              title="Create 10,000 rows"
              clicked={() => {
                operationType = 'create lots';
                performance.mark(operationType);
                dispatch({ type: 'RUN_LOTS' });
              }}
            />
            <Button
              id="add"
              title="Add 1,000 rows"
              clicked={() => {
                operationType = 'add';
                performance.mark(operationType);
                dispatch({ type: 'ADD' });
              }}
            />
            <Button
              id="update"
              title="Update every 10th row"
              clicked={() => {
                operationType = 'update';
                performance.mark(operationType);
                dispatch({ type: 'UPDATE' });
              }}
            />
            <Button
              id="swapRows"
              title="Swap rows"
              clicked={() => {
                operationType = 'swap';
                performance.mark(operationType);
                dispatch({ type: 'SWAP_ROWS' });
              }}
            />
            <Button
              id="clear"
              title="Clear rows"
              clicked={() => {
                operationType = 'clear';
                performance.mark(operationType);
                dispatch({ type: 'CLEAR' });
              }}
            />
            <Button
              id="load"
              title="Load 1,000 rows"
              clicked={() => {
                operationType = 'load';
                performance.mark(operationType);
                dispatch({ type: 'LOAD' });
              }}
            />
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
