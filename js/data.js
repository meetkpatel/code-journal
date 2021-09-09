/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previosData = localStorage.getItem('forms-journal-entries');
if (previosData !== null) {
  data = JSON.parse(previosData);
}

function beforeunloadFunction(event) {
  var jsonEntries = JSON.stringify(data);
  localStorage.setItem('forms-journal-entries', jsonEntries);
}

window.addEventListener('beforeunload', beforeunloadFunction);
