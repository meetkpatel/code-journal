/* global data */
/* exported data */
function imgUrlInput(event) {
  var imgsrc = event.target.value;
  $imageDisplay.setAttribute('src', imgsrc);
}
function formJournalSubmit(event) {
  var newObj = {};
  event.preventDefault();
  newObj.title = $formJournal.elements.title.value;
  newObj.imgsrc = $formJournal.elements.photoUrl.value;
  newObj.notes = $formJournal.elements.notes.value;
  newObj.nextEntryId = data.nextEntryId;
  data.nextEntryId = (data.nextEntryId) + 1;
  data.entries.push(newObj);
  var jsonEntries = JSON.stringify(data.entries);

  localStorage.setItem('forms-entries', jsonEntries);
  $imageDisplay.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formJournal.elements.title.value = '';
  $formJournal.elements.photoUrl.value = '';
  $formJournal.elements.notes.value = '';
}
var $imgurl = document.querySelector('#photoUrl');
var $imageDisplay = document.querySelector('#imageDisplay');
var $formJournal = document.querySelector('#form-journal');
// console.dir($imgurl);
$imgurl.addEventListener('input', imgUrlInput);
$formJournal.addEventListener('submit', formJournalSubmit);
