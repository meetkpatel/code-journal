/* global data */
/* exported data */

function imgUrlInput(event) {
  var imgsrc = event.target.value;
  $imageDisplay.setAttribute('src', imgsrc);
}
function formJournalSubmit(event) {
  event.preventDefault();
  var newObj = {};
  newObj.title = $formJournal.elements.title.value;
  newObj.imgsrc = $formJournal.elements.photoUrl.value;
  newObj.notes = $formJournal.elements.notes.value;
  newObj.entryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.unshift(newObj);
  $imageDisplay.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formJournal.reset();
}
var $imgurl = document.querySelector('#photoUrl');
var $imageDisplay = document.querySelector('#imageDisplay');
var $formJournal = document.querySelector('#form-journal');
// console.dir($imgurl);
$imgurl.addEventListener('input', imgUrlInput);
$formJournal.addEventListener('submit', formJournalSubmit);
