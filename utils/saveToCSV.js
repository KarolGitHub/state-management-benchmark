export function saveToCSV(columns, filename) {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(new Blob(columns, { type: 'text/csv' }));
  downloadLink.setAttribute('download', `${filename}UserTimings`);

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
