/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function beforeunloadFunction(event) {
  var jsonEntries = JSON.stringify(data);
  localStorage.setItem('forms-journal-entries', jsonEntries);
}

window.addEventListener('beforeunload', beforeunloadFunction);
