export function saveToJSON(data, filename) {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], {
      type: 'text/plain'
    })
  );
  downloadLink.setAttribute('download', filename);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
