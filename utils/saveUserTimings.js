import { saveToCSV } from './';

export function saveUserTimings(filename) {
  const userTiming = performance.getEntriesByType('measure');
  const excludeZoneTimings = userTiming.filter((ent) => !ent.name.includes('Zone'));

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');

  table.appendChild(tbody);
  tbody.appendChild(tr);

  const heading = ['', '\n'];

  for (let col = 0; col < heading.length; col++) {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(heading[col]));
    tr.appendChild(th);
  }

  excludeZoneTimings.forEach((entry) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.appendChild(document.createTextNode(entry.name));
    td2.appendChild(document.createTextNode(entry.duration.toFixed()));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });

  const nameColumn = [];
  const durationColumn = [];
  const rows = table.querySelectorAll('tr');

  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].querySelectorAll('td, th');
    nameColumn.push(cols[0].innerText);
    durationColumn.push(cols[1].innerText);
  }
  const mergedColumns = [nameColumn.join('\n'), durationColumn.join('\n')];

  saveToCSV(mergedColumns, filename);
}
