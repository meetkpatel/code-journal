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

function domTree(entriesData) {
  var $ul = document.createElement('ul');
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  var $columnHalfImg = document.createElement('div');
  var $columnHalfText = document.createElement('div');
  var $columnHalfTitle = document.createElement('div');
  var $columnHalfPara = document.createElement('div');
  var $imgElement = document.createElement('img');
  var $titleH3 = document.createElement('h3');
  var $para = document.createElement('p');

  $row.setAttribute('class', 'row');
  $columnHalfImg.setAttribute('class', 'column-half img-block');
  $columnHalfText.setAttribute('class', 'column-half text-block');
  $columnHalfTitle.setAttribute('class', 'column-half title-block');
  $columnHalfPara.setAttribute('class', 'column-half para-block');
  $imgElement.setAttribute('src', entriesData.imgsrc);

  $ul.appendChild($li);
  $li.appendChild($row);
  $row.appendChild($columnHalfImg);
  $columnHalfImg.appendChild($imgElement);
  $row.appendChild($columnHalfText);
  $columnHalfText.appendChild($columnHalfTitle);
  $columnHalfTitle.appendChild($titleH3);
  $columnHalfText.appendChild($columnHalfPara);
  $columnHalfPara.appendChild($para);

  $titleH3.textContent = entriesData.title;
  $para.textContent = entriesData.notes;
  return $ul;
}
var $displayEntriesDiv = document.querySelector('#displayEntries');
var $newBtn = document.querySelector('.new-btn');
var $tabs = document.querySelectorAll('.tab');
var $entriesBtn = document.querySelector('.entriesBtn');

$entriesBtn.addEventListener('click', entriesBtnClick);
$newBtn.addEventListener('click', newBtnClick);

function newBtnClick(event) {
  for (var i = 0; i < $tabs.length; i++) {
    if ($tabs[i].getAttribute('data-view') !== 'entries') {
      $tabs[i].className = 'tab';
    } else {
      $tabs[i].className = 'tab hidden';
    }
  }
}

function entriesBtnClick(event) {
  for (var i = 0; i < $tabs.length; i++) {
    if ($tabs[i].getAttribute('data-view') !== 'entry-form') {
      $tabs[i].className = 'tab';
    } else {
      $tabs[i].className = 'tab hidden';
    }
  }
}

function DOMContentLoadedCall(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $entriesFetch = domTree(data.entries[i]);
    $displayEntriesDiv.appendChild($entriesFetch);
  }
}

window.addEventListener('DOMContentLoaded', DOMContentLoadedCall);
