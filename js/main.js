/* global data */
/* exported data */
var $noEntry = document.querySelector('#noentry');
var $displayEntriesLi = document.querySelector('#displayEntries');
var $imgurl = document.querySelector('#photoUrl');
var $imageDisplay = document.querySelector('#imageDisplay');
var $formJournal = document.querySelector('#form-journal');
var $view = document.querySelectorAll('.view');
var $navBar = document.querySelector('.navBar');
var $entriesBar = document.querySelector('.entriesBar');
var $aDelete = document.querySelector('.aDelete');
var $cancelationPage = document.querySelector('.cancelationPage');
var $cancelBtn = document.querySelector('.cancelBtn');
var $deleteBtn = document.querySelector('.deleteBtn');

var $liElements = document.getElementsByTagName('li');
var $newEntryColumn = document.querySelector('.new-entry');
var $editEntryColumn = document.querySelector('.edit-entry');

$navBar.addEventListener('click', handleViewNavigation);
$entriesBar.addEventListener('click', handleViewNavigation);
$displayEntriesLi.addEventListener('click', handleLiClick);
$aDelete.addEventListener('click', deleteClick);
$cancelBtn.addEventListener('click', cancelBtnClick);
$deleteBtn.addEventListener('click', deleteConfirmClick);

function cancelBtnClick(event) {
  $cancelationPage.setAttribute('class', 'cancelationPage hidden');
}
function deleteClick(event) {
  $cancelationPage.setAttribute('class', 'cancelationPage');
}

function deleteConfirmClick(event) {
  for (var i = 0; i < $liElements.length; i++) {
    if ($liElements[i].getAttribute('data-entry-id') === data.editing) {
      $liElements[i].remove();
      break;
    }
  }
  for (var j = 0; j < data.entries.length; j++) {
    if (parseInt(data.entries[j].entryId) === parseInt(data.editing)) {
      data.entries.splice(j, 1);
    }
  }
  $cancelationPage.setAttribute('class', 'cancelationPage hidden');
  data.editing = null;
  switchView('entries');
}

function handleLiClick(event) {
  if (!event.target.matches('I')) {
    return;
  }
  data.editing = event.target.getAttribute('data-entry-id');
  switchView('entry-form');
}

function editLiElement() {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === parseInt(data.editing)) {
      $imageDisplay.setAttribute('src', data.entries[i].imgsrc);
      $formJournal.elements.title.value = data.entries[i].title;
      $formJournal.elements.photoUrl.value = data.entries[i].imgsrc;
      $formJournal.elements.notes.value = data.entries[i].notes;
    }
  }
}

function handleViewNavigation(event) {
  if (!event.target.matches('A')) {
    return;
  }
  data.editing = null;
  switchView(event.target.getAttribute('data-view'));
  $formJournal.reset();
  $imageDisplay.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function imgUrlInput(event) {
  var imgsrc = event.target.value;
  $imageDisplay.setAttribute('src', imgsrc);
}

function formJournalSubmit(event) {
  event.preventDefault();
  if (data.editing !== null) {
    for (var j = 0; j < data.entries.length; j++) {
      if (parseInt(data.entries[j].entryId) === parseInt(data.editing)) {
        data.entries[j].title = $formJournal.elements.title.value;
        data.entries[j].notes = $formJournal.elements.notes.value;
        data.entries[j].imgsrc = $formJournal.elements.photoUrl.value;
        for (var i = 0; i < $liElements.length; i++) {
          if ($liElements[i].getAttribute('data-entry-id') === data.editing) {
            $liElements[i].replaceWith(domTree(data.entries[j]));
          }
        }
      }
    }
    data.editing = null;
    switchView('entries');
  } else {
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
  if (data.editing !== null) {
    editLiElement();
    $editEntryColumn.setAttribute('class', 'edit-entry column-full');
    $newEntryColumn.setAttribute('class', 'edit-entry hidden column-full');
    $aDelete.setAttribute('class', 'aDelete');
  } else {
    $editEntryColumn.setAttribute('class', 'edit-entry hidden column-full');
    $newEntryColumn.setAttribute('class', 'edit-entry  column-full');
    $aDelete.setAttribute('class', 'aDelete hidden');
  }
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
