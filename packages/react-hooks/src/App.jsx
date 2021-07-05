import { memo, useReducer } from 'react';
import { render } from 'react-dom';
import './../../../css/styles.css';

const random = (max) => Math.round(Math.random() * 1000) % max;

const A = [
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
const C = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
const N = [
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

let nextId = 1;

const generateData = (count) => {
  const data = new Array(count);

  for (let i = 0; i < count; i++) {
    data[i] = {
      id: nextId++,
      label: `${A[random(A.length)]} ${C[random(C.length)]} ${N[random(N.length)]}`
    };
  }

  return data;
};

const initialState = { data: [], selected: 0 };

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

      for (let i = 0; i < newData.length; i += 10) {
        const r = newData[i];

        newData[i] = { id: r.id, label: r.label + ' !!!' };
      }

      return { data: newData, selected };
    }
    case 'CLEAR':
      return { data: [], selected: 0 };
    case 'SWAP_ROWS':
      return data.length > 998
        ? { data: [data[0], data[998], ...data.slice(2, 998), data[1], data[999]], selected }
        : state;
    case 'REMOVE': {
      const idx = data.findIndex((d) => d.id === action.id);

      return { data: [...data.slice(0, idx), ...data.slice(idx + 1)], selected };
    }
    case 'SELECT':
      return { data, selected: action.id };
    default:
      return state;
  }
};

const Row = memo(
  ({ selected, item, dispatch }) => (
    <tr className={selected ? 'success' : ''}>
      <td className="col-md-1">{item.id}</td>
      <td className="col-md-4">
        <a onClick={() => dispatch({ type: 'SELECT', id: item.id })}>{item.label}</a>
      </td>
      <td className="col-md-1">
        <a onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>
          <span className="glyphicon glyphicon-remove text-danger" aria-hidden="true" />
        </a>
      </td>
      <td className="col-md-6" />
    </tr>
  ),
  (prevProps, nextProps) => prevProps.selected === nextProps.selected && prevProps.item === nextProps.item
);

const Button = ({ id, clicked, title }) => (
  <div className="col-sm-6 smallpad">
    <button type="button" className="btn btn-primary btn-block" id={id} onClick={clicked}>
      {title}
    </button>
  </div>
);

const TestPanel = memo(
  ({ dispatch }) => (
    <div className="jumbotron">
      <div className="row">
        <div className="col-md-6">
          <h1>React Hooks</h1>
        </div>
        <div className="col-md-6">
          <div className="row">
            <Button id="run" title="Create 1,000 rows" clicked={() => dispatch({ type: 'RUN' })} />
            <Button id="runlots" title="Create 10,000 rows" clicked={() => dispatch({ type: 'RUN_LOTS' })} />
            <Button id="add" title="Add 1,000 rows" clicked={() => dispatch({ type: 'ADD' })} />
            <Button id="update" title="Update every 10th row" clicked={() => dispatch({ type: 'UPDATE' })} />
            <Button id="clear" title="Clear" clicked={() => dispatch({ type: 'CLEAR' })} />
            <Button id="swaprows" title="Swap Rows" clicked={() => dispatch({ type: 'SWAP_ROWS' })} />
          </div>
        </div>
      </div>
    </div>
  ),
  () => true
);

const App = () => {
  const [{ data, selected }, dispatch] = useReducer(listReducer, initialState);

  return (
    <div className="container">
      <TestPanel dispatch={dispatch} />
      <table className="table table-hover table-striped test-data">
        <tbody>
          {data.map((item) => (
            <Row key={item.id} item={item} selected={selected === item.id} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
      <span className="preloadicon glyphicon glyphicon-remove hover" aria-hidden="true" />
    </div>
  );
};

render(<App />, document.getElementById('App'));
