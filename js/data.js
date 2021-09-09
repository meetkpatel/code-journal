/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('forms-journal-entries');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

function beforeunloadFunction(event) {
  var jsonEntries = JSON.stringify(data);
  localStorage.setItem('forms-journal-entries', jsonEntries);
}

window.addEventListener('beforeunload', beforeunloadFunction);
