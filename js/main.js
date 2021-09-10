/* global data */
/* exported data */
var $noEntry = document.querySelector('#noentry');
var $displayEntriesLi = document.querySelector('#displayEntries');
var $imgurl = document.querySelector('#photoUrl');
var $imageDisplay = document.querySelector('#imageDisplay');
var $formJournal = document.querySelector('#form-journal');
var $editFormJournal = document.querySelector('#edit-form-journal');
var $view = document.querySelectorAll('.view');
var $navBar = document.querySelector('.navBar');
var $entriesBar = document.querySelector('.entriesBar');

var $editImageDisplay = document.querySelector('#editImageDisplay');
var $editTitle = document.querySelector('#editTitle');
var $editPhotoUrl = document.querySelector('#editPhotoUrl');
var $editNotes = document.querySelector('#editNotes');
var $liElements = document.getElementsByTagName('li');

$navBar.addEventListener('click', handleViewNavigation);
$entriesBar.addEventListener('click', handleViewNavigation);
$displayEntriesLi.addEventListener('click', handleLiClick);

$editFormJournal.addEventListener('submit', editformJournalSubmit);

function handleLiClick(event) {
  if (!event.target.matches('I')) {
    return;
  }
  editLiElement(event.target.getAttribute('data-entry-id'));
  switchView('edit-entry-form');
}

function editLiElement(editId) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(editId)) {
      $editImageDisplay.setAttribute('src', data.entries[i].imgsrc);
      $editTitle.value = data.entries[i].title;
      $editPhotoUrl.value = data.entries[i].imgsrc;
      $editNotes.value = data.entries[i].notes;
      data.editing = editId;
    }
  }
}

function handleViewNavigation(event) {
  if (!event.target.matches('A')) {
    return;
  }
  switchView(event.target.getAttribute('data-view'));
}

function imgUrlInput(event) {
  var imgsrc = event.target.value;
  $imageDisplay.setAttribute('src', imgsrc);
}

function editImgUrlInput(event) {
  var imgsrc = event.target.value;
  $editImageDisplay.setAttribute('src', imgsrc);
}
$editPhotoUrl.addEventListener('input', editImgUrlInput);

function editformJournalSubmit(event) {
  event.preventDefault();
  var editObj = {};
  editObj.title = $editFormJournal.elements.editTitle.value;
  editObj.imgsrc = $editFormJournal.elements.editPhotoUrl.value;
  editObj.notes = $editFormJournal.elements.editNotes.value;
  editObj.entryId = data.editing;
  for (var i = 0; i < $liElements.length; i++) {
    if (parseInt($liElements[i].getAttribute('data-entry-id')) === parseInt(data.editing)) {
      $liElements[i].replaceWith(domTree(editObj));
    }
  }
  for (var j = 0; j < data.entries.length; j++) {
    if (parseInt(data.entries[j].entryId) === parseInt(data.editing)) {
      data.entries[j].title = editObj.title;
      data.entries[j].notes = editObj.notes;
      data.entries[j].imgsrc = editObj.imgsrc;
    }
  }
  switchView('entries');
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
  var $entriesFetch = domTree(newObj);
  $displayEntriesLi.prepend($entriesFetch);
  switchView('entries');
  $noEntry.className = 'hidden';
}
$imgurl.addEventListener('input', imgUrlInput);
$formJournal.addEventListener('submit', formJournalSubmit);

function domTree(entriesData) {
  var $li = document.createElement('li');
  var $row = document.createElement('div');
  var $columnHalfImg = document.createElement('div');
  var $columnHalfText = document.createElement('div');
  var $columnHalfTitle = document.createElement('div');
  var $columnHalfPara = document.createElement('div');
  var $imgElement = document.createElement('img');
  var $titleH2 = document.createElement('h2');
  var $para = document.createElement('p');
  var $pencilEdit = document.createElement('i');

  $row.setAttribute('class', 'row');
  $columnHalfImg.setAttribute('class', 'column-half img-block');
  $columnHalfText.setAttribute('class', 'column-half text-block');
  $columnHalfTitle.setAttribute('class', 'column-half title-block width-100 font-family-proza align-content-space-between');
  $columnHalfPara.setAttribute('class', 'column-half para-block width-100 font-family-proza');
  $pencilEdit.setAttribute('class', 'fas fa-pencil-alt');
  $pencilEdit.setAttribute('data-entry-id', entriesData.entryId);
  $li.setAttribute('data-entry-id', entriesData.entryId);
  $imgElement.setAttribute('src', entriesData.imgsrc);

  // $ul.appendChild($li);
  $li.appendChild($row);
  $row.appendChild($columnHalfImg);
  $columnHalfImg.appendChild($imgElement);
  $row.appendChild($columnHalfText);
  $columnHalfText.appendChild($columnHalfTitle);
  $columnHalfTitle.appendChild($titleH2);
  $columnHalfTitle.appendChild($pencilEdit);
  $columnHalfText.appendChild($columnHalfPara);
  $columnHalfPara.appendChild($para);

  $titleH2.textContent = entriesData.title;
  $para.textContent = entriesData.notes;
  return $li;
}

function switchView(viewSwitch) {
  data.view = viewSwitch;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === viewSwitch) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

function DOMContentLoadedCall(event) {
  if (data.entries.length !== 0) {
    $noEntry.className = 'hidden';
    for (var i = 0; i < data.entries.length; i++) {
      var $entriesFetch = domTree(data.entries[i]);
      $displayEntriesLi.appendChild($entriesFetch);
    }
  } else {
    $noEntry.className = 'shows';
  }

}

window.addEventListener('DOMContentLoaded', DOMContentLoadedCall);

switchView(data.view);
